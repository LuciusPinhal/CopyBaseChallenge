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

  console.log('Datas Mais Recentes por Assinante:', datasMaisRecentesPorAssinante);

  // Filtrar assinaturas canceladas com data de cancelamento igual à data mais recente
  const assinaturasCanceladas = data.filter(linha =>
    linha.status === 'Cancelada' &&
    new Date(linha['data cancelamento']) && new Date(linha['data cancelamento']).getTime() === datasMaisRecentesPorAssinante[linha['ID assinante']].getTime()
  );

  console.log('Assinaturas Canceladas:', assinaturasCanceladas);

  // Calcular o número total de assinantes ativos no início do período
  const assinaturasAtivasInicio = data.filter(linha =>
    linha.status === 'Ativa' &&
    (!linha['data cancelamento'] || new Date(linha['data cancelamento']).getTime() > datasMaisRecentesPorAssinante[linha['ID assinante']].getTime()) &&
    new Date(linha['data início']).getTime() <= datasMaisRecentesPorAssinante[linha['ID assinante']].getTime()
  );

  console.log('Assinaturas Ativas no Início:', assinaturasAtivasInicio);

  const numeroTotalAssinantesInicio = assinaturasAtivasInicio.length;

  console.log('Número Total de Assinantes Ativos no Início:', numeroTotalAssinantesInicio);

  // Calcular o Churn Rate
  const churnRate = numeroTotalAssinantesInicio > 0
    ? (assinaturasCanceladas.length / numeroTotalAssinantesInicio) * 100
    : 0;

  console.log('Churn Rate Calculado:', churnRate);

  return churnRate;
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
    });

    // Calcular o MRR
    const { mrr, receitasMensais } = calcularMRR(sheetData);

     const a = calcularChurnRate(sheetData);

     console.warn("🍷🗿 >> a:", a);

    console.log('MRR Calculado:', mrr);

    // Retorne os resultados em JSON
    res.json({ success: true, mrr, receitasMensais });
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


