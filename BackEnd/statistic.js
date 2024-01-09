const months =  [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

function calculateMRR(data) {

    const currentDate = new Date();
    
    const assinaturasAtivas = data.filter(line =>
        line.status === 'Ativa' &&
        (!line['data cancelamento'] || new Date(line['data cancelamento']) > currentDate) &&
        new Date(line['data início']) <= currentDate
    );

    const recipesMonthly = assinaturasAtivas.map(line => {

        const valueNumeric = parseFloat(String(line.valor).replace(',', '.'));

        if (!isNaN(valueNumeric))
        {
            const monthlyValue = line.periodicidade === 'Anual' ? valueNumeric / 12 : valueNumeric;
            return monthlyValue;

        } else {  
            
            console.error('Valor inválido:', line.valor);
            return 0;    
        }
    });
    
    const mrr = recipesMonthly.reduce((total, receita) => total + receita, 0);
    return { mrr, recipesMonthly };
}

function calculateChurnRate(data) {

    const datesLatestBySubscriber = {};

    data.forEach(line => {
        const idSubscriber = line['ID assinante'];
        const dataStatus = line['data status'] ? new Date(line['data status']) : null;
        const dataCanceled = line['data cancelamento'] ? new Date(line['data cancelamento']) : null;

        const dateMostRecent = new Date(Math.max(dataStatus, dataCanceled));

        if (!datesLatestBySubscriber[idSubscriber] || datesLatestBySubscriber[idSubscriber] < dateMostRecent) {
        datesLatestBySubscriber[idSubscriber] = dateMostRecent;
        }
    });

    const subscriptionsCanceled = data.filter(line =>
        line.status === 'Cancelada' &&
        new Date(line['data cancelamento']) && new Date(line['data cancelamento']).getTime() === datesLatestBySubscriber[line['ID assinante']].getTime()
    );


    const activeSubscriptionsHome = data.filter(line =>
        line.status === 'Ativa' &&
        (!line['data cancelamento'] || new Date(line['data cancelamento']).getTime() > datesLatestBySubscriber[line['ID assinante']].getTime()) &&
        new Date(line['data início']).getTime() <= datesLatestBySubscriber[line['ID assinante']].getTime()
    );
    const numberTotalSubscribersHome = activeSubscriptionsHome.length;

    const churnRate = numberTotalSubscribersHome > 0
        ? (subscriptionsCanceled.length / numberTotalSubscribersHome) * 100
        : 0;

    return churnRate;
}

function calculateChurnAmonth(data) {
    const datesLatestBySubscriber = {};

    data.forEach(line => {
        const idSubscriber = line['ID assinante'];
        const dataStatus = line['data status'] ? new Date(line['data status']) : null;
        const dataCanceled = line['data cancelamento'] ? new Date(line['data cancelamento']) : null;

        const dateMostRecent = new Date(Math.max(dataStatus, dataCanceled));

        if (!datesLatestBySubscriber[idSubscriber] || datesLatestBySubscriber[idSubscriber] < dateMostRecent) {
        datesLatestBySubscriber[idSubscriber] = dateMostRecent;
        }
    });

    console.log('Datas Mais Recentes por Subscriber:', datesLatestBySubscriber);


    const churnRateAmonth = {};
    months.forEach(month => {
        churnRateAmonth[month] = 0;
    });

    data.forEach(line => {
        const dataCanceled = line['data cancelamento'] ? new Date(line['data cancelamento']) : null;

        if (line.status === 'Cancelada' && dataCanceled) {
        const monthCanceled = dataCanceled.getMonth();
        churnRateAmonth[months[monthCanceled]] += 1;
        }
    });

 
    months.forEach(month => {
        const totalSubscribersStartMonth = data.filter(line =>
        line.status === 'Ativa' &&
        (!line['data cancelamento'] || new Date(line['data cancelamento']).getTime() > datesLatestBySubscriber[line['ID assinante']].getTime()) &&
        new Date(line['data início']).getMonth() === months.indexOf(month)
        ).length;

        churnRateAmonth[month] = totalSubscribersStartMonth > 0
        ? (churnRateAmonth[month] / totalSubscribersStartMonth) * 100
        : 0;

    });

    return churnRateAmonth;
}

function excelDateToJSDate(serial) {
    if (serial == null || serial == '') {
        return ' '; 
    }
    const utcDays = Math.floor(serial - 25569);
    const utcValue = utcDays * 86400;
    const dateInfo = new Date(utcValue * 1000);
    
    dateInfo.setHours(dateInfo.getHours() - dateInfo.getTimezoneOffset() / 60);

    return dateInfo;
}

function formatDate(data) {
    if (!data || isNaN(data.getTime())) {
        return ' '; 
    }
    const day = String(data.getDate()).padStart(2, '0');
    const month = String(data.getMonth() + 1).padStart(2, '0');
    const year = data.getFullYear();
    const hours = String(data.getHours()).padStart(2, '0');
    const minutes = String(data.getMinutes()).padStart(2, '0');
    const seconds = String(data.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function groupsubscriptionsAmonth(data) {
    const result = {
        TotalUsers: data.length,
        UsersAmonth: {},
    };

    months.forEach(month => {
        result.UsersAmonth[month] = [];
    });

    data.forEach(line => {
        const monthInicio = new Date(line['data início']).getMonth();
        const monthStatus = line['data status'] ? new Date(line['data status']).getMonth() : null;
        const monthCanceled = line['data cancelamento'] ? new Date(line['data cancelamento']).getMonth() : null;
        const monthProximoCiclo = line['próximo ciclo'] ? new Date(line['próximo ciclo']).getMonth() : null;

        const dateHomeFormatted = formatDate(new Date(line['data início']));
        const dataStatusFormatted = line['data status'] ? formatDate(new Date(line['data status'])) : null;
        const dataCanceledFormatted = line['data cancelamento'] ? formatDate(new Date(line['data cancelamento'])) : null;
        const nextFormattedCycle = line['próximo ciclo'] ? formatDate(new Date(line['próximo ciclo'])) : null;

        if (result.UsersAmonth[months[monthInicio]]) {
        result.UsersAmonth[months[monthInicio]].push({
            ...line,
            'data início': dateHomeFormatted,
            'data status': dataStatusFormatted,
            'data cancelamento': dataCanceledFormatted,
            'próximo ciclo': nextFormattedCycle,
        });
        }
    });

    return result;
}

function getStatisticsUsersAmonth(data) {

    const statisticsAmonth = {};
    
    months.forEach(month => {
        statisticsAmonth[month] = {
        Ativa: 0,
        Atrasada: 0,
        Cancelada: 0,
        TrialCancelada: 0,
        Upgrade: 0,
        Total: 0,
        };
    });


    data.forEach(line => {
        const dataStart = new Date(line['data início']);
        const dataCanceled = line['data cancelamento'] ? new Date(line['data cancelamento']) : null;

        const monthStart = dataStart.getMonth();
        const monthCanceled = dataCanceled ? dataCanceled.getMonth() : null;

    
        if (line.status === 'Ativa' || line.status === 'Atrasada' || line.status === 'TrialCancelada' || line.status === 'Upgrade') {
        statisticsAmonth[months[monthStart]][line.status] += 1;
        statisticsAmonth[months[monthStart]].Total += 1;
        }

        if (line.status === 'Cancelada' && dataCanceled) {
        statisticsAmonth[months[monthCanceled]][line.status] += 1;
        statisticsAmonth[months[monthCanceled]].Total += 1;
        }
    });


    const totalGeneral = data.length;
    statisticsAmonth.TotalGeneral = totalGeneral;

    return statisticsAmonth;
}

module.exports = {
   calculateMRR,
   calculateChurnRate,
   calculateChurnAmonth,
   excelDateToJSDate,
   groupsubscriptionsAmonth,
   getStatisticsUsersAmonth

};