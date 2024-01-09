const express = require('express');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');

const app = express();

const port = 3000;

app.use(cors());

// Configuração do multer para upload de arquivos
const upload = multer({ dest: 'uploads/' });

// Função para converter o número de série Excel para objeto de data do JavaScript
function excelDateToJSDate(serial) {
    if (serial == null || serial == '') {
    return ' '; 
  }
  const utcDays = Math.floor(serial - 25569);
  const utcValue = utcDays * 86400;
  const dateInfo = new Date(utcValue * 1000);
  
  // Ajuste para corrigir o fuso horário
  dateInfo.setHours(dateInfo.getHours() - dateInfo.getTimezoneOffset() / 60);

  return dateInfo;
}

// receita recorrente mensal apenas dos clientes ativos
function calcularMRR(data) {
  const dataAtual = new Date();

  // Filtra apenas as assinaturas ativas com data de início menor ou igual à data atual
  const assinaturasAtivas = data.filter(linha =>
    linha.status === 'Ativa' &&
    (!linha['data cancelamento'] || new Date(linha['data cancelamento']) > dataAtual) &&
    new Date(linha['data início']) <= dataAtual
  );

  //console.log('Assinaturas Ativas:', assinaturasAtivas);

  // Calcula a Receita Mensal para cada assinante
  const receitasMensais = assinaturasAtivas.map(linha => {
    // Tenta converter o valor para número usando parseFloat
    const valorNumerico = parseFloat(String(linha.valor).replace(',', '.'));

    // Verifica se a conversão foi bem-sucedida e o valor é um número válido
    if (!isNaN(valorNumerico)) {
      // Calcula o valor mensal com base na periodicidade
      const valorMensal = linha.periodicidade === 'Anual' ? valorNumerico / 12 : valorNumerico;

      return valorMensal;
    } else {
      console.error('Valor inválido:', linha.valor);
      return 0; // Se o valor não for válido, consideramos como 0 para não afetar o cálculo total
    }
  });

  //console.log('Receitas Mensais:', receitasMensais);

  // Soma as Receitas Mensais para obter o MRR
  const mrr = receitasMensais.reduce((total, receita) => total + receita, 0);

  return { mrr, receitasMensais };
}

function calcularChurnRate(data) {
  // Encontrar a data mais recente entre 'data status' e 'data cancelamento' para cada assinante
  const datasMaisRecentesPorAssinante = {};

  data.forEach(linha => {
    const idAssinante = linha['ID assinante'];
    const dataStatus = linha['data status'] ? new Date(linha['data status']) : null;
    const dataCancelamento = linha['data cancelamento'] ? new Date(linha['data cancelamento']) : null;

    const dataMaisRecente = new Date(Math.max(dataStatus, dataCancelamento));

    if (!datasMaisRecentesPorAssinante[idAssinante] || datasMaisRecentesPorAssinante[idAssinante] < dataMaisRecente) {
      datasMaisRecentesPorAssinante[idAssinante] = dataMaisRecente;
    }
  });

  // Filtrar assinaturas canceladas com data de cancelamento igual à data mais recente
  const assinaturasCanceladas = data.filter(linha =>
    linha.status === 'Cancelada' &&
    new Date(linha['data cancelamento']) && new Date(linha['data cancelamento']).getTime() === datasMaisRecentesPorAssinante[linha['ID assinante']].getTime()
  );

  // Calcular o número total de assinantes ativos no início do período
  const assinaturasAtivasInicio = data.filter(linha =>
    linha.status === 'Ativa' &&
    (!linha['data cancelamento'] || new Date(linha['data cancelamento']).getTime() > datasMaisRecentesPorAssinante[linha['ID assinante']].getTime()) &&
    new Date(linha['data início']).getTime() <= datasMaisRecentesPorAssinante[linha['ID assinante']].getTime()
  );
  const numeroTotalAssinantesInicio = assinaturasAtivasInicio.length;

  // Calcular o Churn Rate
  const churnRate = numeroTotalAssinantesInicio > 0
    ? (assinaturasCanceladas.length / numeroTotalAssinantesInicio) * 100
    : 0;

  return churnRate;
}

function calcularChurnPorMes(data) {
  const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

  // Encontrar a data mais recente entre 'data status' e 'data cancelamento' para cada assinante
  const datasMaisRecentesPorAssinante = {};

  data.forEach(linha => {
    const idAssinante = linha['ID assinante'];
    const dataStatus = linha['data status'] ? new Date(linha['data status']) : null;
    const dataCancelamento = linha['data cancelamento'] ? new Date(linha['data cancelamento']) : null;

    const dataMaisRecente = new Date(Math.max(dataStatus, dataCancelamento));

    if (!datasMaisRecentesPorAssinante[idAssinante] || datasMaisRecentesPorAssinante[idAssinante] < dataMaisRecente) {
      datasMaisRecentesPorAssinante[idAssinante] = dataMaisRecente;
    }
  });

  console.log('Datas Mais Recentes por Assinante:', datasMaisRecentesPorAssinante);

  // Inicializar um objeto para armazenar o Churn Rate por mês
  const churnRatePorMes = {};
  meses.forEach(mes => {
    churnRatePorMes[mes] = 0;
  });

  // Calcular o Churn Rate por mês
  data.forEach(linha => {
    const dataCancelamento = linha['data cancelamento'] ? new Date(linha['data cancelamento']) : null;

    if (linha.status === 'Cancelada' && dataCancelamento) {
      const mesCancelamento = dataCancelamento.getMonth();
      churnRatePorMes[meses[mesCancelamento]] += 1;
    }
  });

  // Calcular a média do Churn Rate por mês
  meses.forEach(mes => {
    const totalAssinantesInicioNoMes = data.filter(linha =>
      linha.status === 'Ativa' &&
      (!linha['data cancelamento'] || new Date(linha['data cancelamento']).getTime() > datasMaisRecentesPorAssinante[linha['ID assinante']].getTime()) &&
      new Date(linha['data início']).getMonth() === meses.indexOf(mes)
    ).length;

    churnRatePorMes[mes] = totalAssinantesInicioNoMes > 0
      ? (churnRatePorMes[mes] / totalAssinantesInicioNoMes) * 100
      : 0;

  });

  return churnRatePorMes;
}

function formatarData(data) {
   if (!data || isNaN(data.getTime())) {
    return ' '; 
  }
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');
  const segundos = String(data.getSeconds()).padStart(2, '0');

  return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
}

function agruparAssinaturasPorMes(data) {
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const resultado = {
    TotalUsuarios: data.length,
    UsuariosPorMes: {},
  };

  meses.forEach(mes => {
    resultado.UsuariosPorMes[mes] = [];
  });

  data.forEach(linha => {
    const mesInicio = new Date(linha['data início']).getMonth();
    const mesStatus = linha['data status'] ? new Date(linha['data status']).getMonth() : null;
    const mesCancelamento = linha['data cancelamento'] ? new Date(linha['data cancelamento']).getMonth() : null;
    const mesProximoCiclo = linha['próximo ciclo'] ? new Date(linha['próximo ciclo']).getMonth() : null;

    const dataInicioFormatada = formatarData(new Date(linha['data início']));
    const dataStatusFormatada = linha['data status'] ? formatarData(new Date(linha['data status'])) : null;
    const dataCancelamentoFormatada = linha['data cancelamento'] ? formatarData(new Date(linha['data cancelamento'])) : null;
    const proximoCicloFormatado = linha['próximo ciclo'] ? formatarData(new Date(linha['próximo ciclo'])) : null;

    if (resultado.UsuariosPorMes[meses[mesInicio]]) {
      resultado.UsuariosPorMes[meses[mesInicio]].push({
        ...linha,
        'data início': dataInicioFormatada,
        'data status': dataStatusFormatada,
        'data cancelamento': dataCancelamentoFormatada,
        'próximo ciclo': proximoCicloFormatado,
      });
    }
  });

  return resultado;
}

function obterEstatisticasUsuariosPorMes(data) {
  const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

  // Inicializar um objeto para armazenar as estatísticas por mês
  const estatisticasPorMes = {};
  meses.forEach(mes => {
    estatisticasPorMes[mes] = {
      Ativa: 0,
      Atrasada: 0,
      Cancelada: 0,
      TrialCancelada: 0,
      Upgrade: 0,
      Total: 0,
    };
  });

  // Preencher as estatísticas por mês
  data.forEach(linha => {
    const dataInicio = new Date(linha['data início']);
    const dataCancelamento = linha['data cancelamento'] ? new Date(linha['data cancelamento']) : null;

    const mesInicio = dataInicio.getMonth();
    const mesCancelamento = dataCancelamento ? dataCancelamento.getMonth() : null;

    // Atualizar o estado correspondente no mês de início
    if (linha.status === 'Ativa' || linha.status === 'Atrasada' || linha.status === 'TrialCancelada' || linha.status === 'Upgrade') {
      estatisticasPorMes[meses[mesInicio]][linha.status] += 1;
      estatisticasPorMes[meses[mesInicio]].Total += 1;
    }

    // Atualizar o estado correspondente no mês de cancelamento
    if (linha.status === 'Cancelada' && dataCancelamento) {
      estatisticasPorMes[meses[mesCancelamento]][linha.status] += 1;
      estatisticasPorMes[meses[mesCancelamento]].Total += 1;
    }
  });

  // Calcular a quantidade total geral
  const totalGeral = data.length;
  estatisticasPorMes.TotalGeral = totalGeral;

  return estatisticasPorMes;
}

// Rota de upload de planilha
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('Recebeu a planilha com sucesso!');
  
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
      dateNF: 'dd/mm/yyyy HH:mm', // Formato esperado de data
    });

    // Converter datas no formato Excel para objetos de data do JavaScript
    sheetData.forEach((linha) => {
      if (linha['data início']) {
        linha['data início'] = excelDateToJSDate(linha['data início']);
      }

      if (linha['data status']) {
        linha['data status'] = excelDateToJSDate(linha['data status']);
      }

      if (linha['data cancelamento']) {
        linha['data cancelamento'] = excelDateToJSDate(linha['data cancelamento']);
      }
       if (linha['próximo ciclo']) {
        linha['próximo ciclo'] = excelDateToJSDate(linha['próximo ciclo']);
      }
    });

    // Calcular o MRR
    const { mrr, receitasMensais } = calcularMRR(sheetData);

    const ChurnRate = calcularChurnRate(sheetData);
    const ChurnRateMes = calcularChurnPorMes(sheetData);

    const estatisticasPorMes = obterEstatisticasUsuariosPorMes(sheetData);

    const resultadoAgrupadoPorMes = agruparAssinaturasPorMes(sheetData);

    Object.keys(resultadoAgrupadoPorMes.UsuariosPorMes).forEach(mes => {
      console.log(`Usuários em ${mes}:`);
      resultadoAgrupadoPorMes.UsuariosPorMes[mes].forEach(usuario => {
        console.log(usuario);
      });
      console.log('\n'); // Adiciona uma linha em branco para separar os meses
    });

    console.warn("🍷🗿 >> a:", ChurnRate);
    console.warn("🍷🗿 >> b:", ChurnRateMes);
    console.log('MRR Calculado:', mrr);

    // Retorne os resultados em JSON
    res.json({ success: true, mrr, receitasMensais, ChurnRate, ChurnRateMes, estatisticasPorMes, resultadoAgrupadoPorMes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar a planilha' });
  }
});

// Rota padrão
app.get('/', (req, res) => {
  // Define o título da aba do navegador
 res.send('<html><head><title>BackEnd | API</title></head><body>Bem-vindo à sua aplicação!</body></html>');

});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


