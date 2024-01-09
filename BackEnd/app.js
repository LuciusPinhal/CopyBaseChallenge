const express = require('express');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
const statistic = require('./statistic');

const app = express();

const port = 3000;

app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.post('/api/stats', upload.single('file'), (req, res) => {
    console.log('Recebeu a planilha com sucesso!');
    
    try {
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
        dateNF: 'dd/mm/yyyy HH:mm', // Formato esperado de data
      });

      // Converter datas no formato Excel para objetos de data do JavaScript
      sheetData.forEach((line) => {
        if (line['data início']) {
          line['data início'] = statistic.excelDateToJSDate(line['data início']);
        }

        if (line['data status']) {
          line['data status'] = statistic.excelDateToJSDate(line['data status']);
        }

        if (line['data cancelamento']) {
          line['data cancelamento'] = statistic.excelDateToJSDate(line['data cancelamento']);
        }
        if (line['próximo ciclo']) {
          line['próximo ciclo'] = statistic.excelDateToJSDate(line['próximo ciclo']);
        }
      });

      // Calculos
      const { mrr, recipesMonthly } = statistic.calculateMRR(sheetData);
      const ChurnRate = statistic.calculateChurnRate(sheetData);
      const ChurnRateMes = statistic.calculateChurnAmonth(sheetData);
      const statisticsAmonth = statistic.getStatisticsUsersAmonth(sheetData);
      const resultGroupedPermonth = statistic.groupsubscriptionsAmonth(sheetData);

      // Object.keys(resultGroupedPermonth.UsersAmonth).forEach(month => {
      //   console.log(`Usuários em ${month}:`);
      //   resultGroupedPermonth.UsersAmonth[month].forEach(usur => {
      //     console.log(usur);
      //   });
      //   console.log('\n'); // Adiciona uma line em branco para separar os meses
      // });

      console.warn("🍷🗿 >> a:", ChurnRate);
      console.warn("🍷🗿 >> b:", ChurnRateMes);
      console.log('MRR Calculado:', mrr);

      // Retorne os resultados em JSON
      res.json({ success: true, mrr, recipesMonthly, ChurnRate, ChurnRateMes, statisticsAmonth, resultGroupedPermonth });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao processar a planilha' });
    }
});


app.get('/', (req, res) => {
 res.send('<html><head><title>BackEnd | API</title></head><body>Bem-vindo à sua aplicação!</body></html>');

});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


