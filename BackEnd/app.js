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
    try {
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {

        dateNF: 'dd/mm/yyyy HH:mm', 
      });

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
      const mrr = statistic.calculateMRR(sheetData);
      const arr = statistic.calculateARR(sheetData);

      const ChurnRate = statistic.calculateChurnRate(sheetData);

      const ChurnRateAmonth = statistic.calculateChurnAmonth(sheetData);

      const statisticsAmonth = statistic.getStatisticsUsersAmonth(sheetData);

      const resultGroupedPermonth = statistic.groupsubscriptionsAmonth(sheetData);

      const { arpuMonthly, arpuAnnual, totalMonthlyRevenue, totalAnnualRevenue, totalUsers } = statistic.calculateARPU(sheetData);

      const { ltvMonthly, ltvAnnual } = statistic.calculateLTV(sheetData);

      res.json({
        arr, mrr, ChurnRate, ChurnRateAmonth, statisticsAmonth, resultGroupedPermonth,
        arpuMonthly, arpuAnnual, totalMonthlyRevenue, totalAnnualRevenue, totalUsers,
        ltvMonthly, ltvAnnual
      });
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


