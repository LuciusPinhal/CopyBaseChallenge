<template>
    <div class="">
        <div v-if="tableData" class="table-container">
            <div class="description">
                <hr />
            </div>
            <div class="container">
                    <div class="box">
                        <div class="IconCheckmark">
                            <Icon class="IconStyle" icon="material-symbols:done" />
                        </div>
                        <div class="checkmark">
                            <span>ARR Anual</span> 
                        </div>

                        <div class="textCenter">
                            <span>{{ this.Arr.toFixed(2) }}</span>
                        </div>
                        <div class="text colortext">
                            <span>Receita Recorrente (R$)</span>
                        </div>
                    </div>

                    <div class="box">
                        <div class="IconCheckmark">
                            <Icon class="IconStyle" icon="material-symbols:done" />
                        </div>
                        <div class="checkmark">
                            <span>YTA Anual</span> 
                        </div>

                        <div class="textCenter">
                            <span>{{ this.totalAnnualRevenue.toFixed(2) }}</span>
                        </div>
                        <div class="text colortext">
                            <span>Receita Total (R$)</span>
                        </div>
                    </div>

                    <div class="box">
                        <div class="IconCheckmark">
                            <Icon class="IconStyle" icon="material-symbols:done" />
                        </div>
                        <div class="checkmark">
                            <span>ARPU Anual</span> 
                        </div>

                        <div class="textCenter">
                            <span>{{ this.arpuAnnual.toFixed(2) }}</span>
                        </div>
                        <div class="text colortext">
                            <span>Receita Média por Usuário (R$)</span>
                        </div>
                    </div>

                    <div class="box">
                        <div class="IconCheckmark">
                            <Icon class="IconStyle" icon="material-symbols:done" />
                        </div>
                        <div class="checkmark">
                            <span>LTV Anual</span> 
                        </div>

                        <div class="textCenter">
                            <span>{{ this.ltvAnnual.toFixed(2) }}</span>
                        </div>
                        <div class="text colortext">
                            <span>Valor Vitalício (R$)</span>
                        </div>
                    </div>

                    <div class="box">
                        <div class="IconCheckmark">
                            <Icon class="IconStyle" icon="material-symbols:done" />
                        </div>
                        <div class="checkmark">
                            <span>MAU</span> 
                        </div>

                        <div class="textCenter">
                            <span>{{ this.totalUsers }}</span>
                        </div>
                        <div class="text colortext">
                            <span>Total de Usuários Ativos (UN)</span>
                        </div>
                    </div>

                    <div class="box boxVariant">
                        <div class="IconCheckmark">
                            <Icon class="IconStyle variant  VariantWidth" icon="tdesign:error" />
                        </div>
                        <div class="checkmark">
                            <span>ChurnRate</span> 
                        </div>

                        <div class="textCenter">
                            <span>{{ this.ChurnRate.toFixed(2) }}</span>
                        </div>
                        <div class="text colortext variant">
                            <span>Taxa de cancelamento (%)</span>
                        </div>
                    </div>

                    <div class="box">
                        <div class="IconCheckmark">
                            <Icon class="IconStyle" icon="material-symbols:done" />
                        </div>
                        <div class="checkmark">
                            <span>ARPU Mensal</span> 
                        </div>

                        <div class="textCenter">
                            <span>{{ this.arpuMonthly.toFixed(2) }}</span>
                        </div>
                        <div class="text colortext">
                            <span>Receita Média por Usuário (R$)</span>
                        </div>
                    </div>

                    <div class="box">
                        <div class="IconCheckmark">
                            <Icon class="IconStyle" icon="material-symbols:done" />
                        </div>
                        <div class="checkmark">
                            <span>LTV Mensal</span> 
                        </div>

                        <div class="textCenter">
                            <span>{{ this.ltvMonthly.toFixed(2) }}</span>
                        </div>
                        <div class="text colortext">
                            <span>Valor Vitalício (R$)</span>
                        </div>
                    </div>

                    <div class="box">
                        <div class="IconCheckmark">
                            <Icon class="IconStyle" icon="material-symbols:done" />
                        </div>
                        <div class="checkmark">
                            <span>MTM Mensal</span> 
                        </div>

                        <div class="textCenter">
                            <span>{{ this.totalMonthlyRevenue.toFixed(2) }}</span>
                        </div>
                        <div class="text colortext">
                            <span>Receita Total (R$)</span>
                        </div>
                    </div>
            </div> 
            <div class="description">
                <h2>Informações Mensais</h2>
            <hr />
            </div>
            <div class="ContainerDash">
                <div class="DashGraphs">
                    <canvas ref="mrrChart"></canvas>
                </div>
                <div class="DashGraphs">
                    <canvas ref="churnRateAmonthChart"></canvas>
                </div>
            </div>
             <div class="description">
                    <h2>Assinaturas</h2>
                <hr />
                </div>
            <div class="ContainerDash">
                <div class="DashGraphs donuts">
                    <canvas style="margin-bottom: 10px" ref="totalChart"></canvas>
                </div>
                <div class="DashGraphs">
                    <canvas ref="statisticsAmonthChart"></canvas>
                </div>
            </div>       
        </div>
        <div v-else>Nenhum dado disponível. Carregue a Planilha novamente</div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import Chart from 'chart.js/dist/Chart.min.js';
import Mediator from "../service/Mediator";
export default {
    data() {
        return {
            tableData: false,
            MrrChart: {},
            churnRateAmonthChart: {},
            statisticsAmonthChart: {},
            totalChart:{},
            loading: false,
            Arr: 0,
            Mrr: [],
            ChurnRate: 0,
            ChurnRateAmonth: 0,
            statisticsAmonth: {},
            arpuMonthly: 0,
            arpuAnnual: 0,
            totalMonthlyRevenue: 0,
            totalAnnualRevenue: 0,
            totalUsers: 0,
            ltvMonthly: 0,
            ltvAnnual: 0,
          
        };
    },
    created() {
        Mediator.notify(this, "initGraphs");
    },
    components: {
        Icon,
    },
    mounted() {
        this.createMrrChart();
        this.createChurnRateAmonthChart();
        this.creaDashGraphsatisticsAmonthChart();
        this.createTotalChart()
    },
    methods: {
        loadFromMediator(data) {
            if (data) {
                this.tableData = true;
                this.Arr = data.ARR;
                this.Mrr = data.Mrr
                this.ChurnRate = data.ChurnRate
                this.ChurnRateAmonth = data.ChurnRateAmonth
                this.statisticsAmonth = data.statisticsAmonth
                this.arpuMonthly = data.arpuMonthly
                this.arpuAnnual = data.arpuAnnual
                this.totalMonthlyRevenue = data.totalMonthlyRevenue
                this.totalAnnualRevenue = data.totalAnnualRevenue
                this.totalUsers = data.totalUsers
                this.ltvMonthly = data.ltvMonthly
                this.ltvAnnual = data.ltvAnnual

                if (this.Mrr) {           
                    this.createMrrChart();
                    this.createChurnRateAmonthChart();
                    this.creaDashGraphsatisticsAmonthChart();
                    this.createTotalChart()
                }

            }   
        },
        destroyChart(chart) {
            if (chart) {
                const ctx = chart.ctx;
                if (ctx) {
                    chart.destroy();
                }
            }
        },
        createMrrChart() {
            try {
                const chartCanvas = this.$refs.mrrChart;
                if (chartCanvas && this.Mrr) {
                    const ctx = chartCanvas.getContext('2d');
        
                    this.destroyChart(this.MrrChart);

                    const months = Object.keys(this.statisticsAmonth).filter(month => month !== 'TotalGeneral').sort((a, b) => new Date(a + "/01/2000") - new Date(b + "/01/2000"));
                    const values = Object.values(this.Mrr);
                
                    this.MrrChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: months.map(month => this.getMonthName(month)),
                            datasets: [{
                                label: 'MRR Mensal',
                                fill: false,
                                borderColor: '#08b2e3',
                                borderWidth: 2,
                                pointHoverBackgroundColor: '#08b2e3',
                                data: values,
                            }],
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                xAxes: [{
                                    barPercentage: 0.5,
                                    categoryPercentage: 0.6,
                                }],
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                }],
                            },
                            title: {
                                display: true,
                                text: 'MRR Mensal',
                                fontSize: 16,
                                align: 'left',
                            },
                            legend: {
                                labels: {
                                    boxWidth: 14, 
                                    backgroundColor: '#08b2e3',
                                },
                                align: 'left',
                            },
                        },
                    });
                }
            } catch (error) {
                console.error('Erro ao analisar os dados:', error);
            }
        },
        createChurnRateAmonthChart() {
            try {
                const chartCanvas = this.$refs.churnRateAmonthChart;

                if (chartCanvas && this.churnRateAmonthChart) {
                    const ctx = chartCanvas.getContext('2d');

                    this.destroyChart(this.ChurnRateAmonthChart);


                    const months = Object.keys(this.ChurnRateAmonth);
                    const values = Object.values(this.ChurnRateAmonth);

                    months.sort((a, b) => new Date(a + "/01/2000") - new Date(b + "/01/2000"));

                    this.ChurnRateAmonthChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: months.map(month => this.getMonthName(month)),
                            datasets: [{
                                label: 'Churn Rate Amonth Mensal',
                                fill: false,
                                borderColor: '#ee6352',
                                borderWidth: 2,
                                data: values,
                            }],
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                xAxes: [{
                                    barPercentage: 0.5,
                                    categoryPercentage: 0.6,
                                }],
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                }],
                            },
                            title: {
                                
                                display: true,
                                text: 'Churn Rate Amonth Mensal',
                                fontSize: 16,
                                align: 'left',
                            },
                             legend: {
                                labels: {
                                    boxWidth: 14,
                                    backgroundColor: '#ee6352',
                                },
                                align: 'left',
                            },
                        },
                    });
                }
            } catch (error) {
                console.error('Erro ao analisar os dados:', error);
            }
        },
        creaDashGraphsatisticsAmonthChart() {
            try {
     
                if (this.$refs.statisticsAmonthChart && this.statisticsAmonth) {
                    const ctx = this.$refs.statisticsAmonthChart.getContext('2d');

                    if (ctx) {
                        const months = Object.keys(this.statisticsAmonth).sort((a, b) => new Date(a + "/01/2000") - new Date(b + "/01/2000"));

                        const totalGeneralIndex = months.indexOf('TotalGeneral');
                        if (totalGeneralIndex !== -1) {
                            months.splice(totalGeneralIndex, 1);
                        }

                        const labels = ['Ativa', 'Atrasada', 'Cancelada', 'TrialCancelada', 'Upgrade'];
                        const datasets = [];

                        const colors = {
                            'Ativa': '#57a773',
                            'Atrasada': '#fcba03',
                            'Cancelada': '#EE6352',
                            'TrialCancelada': '#a60202',
                            'Upgrade': '#08b2e3',
                        };

                        for (const label of labels) {
                            const data = months.map(month => this.statisticsAmonth[month][label] || 0);
                            const backgroundColor = colors[label];

                            datasets.push({
                                label: label,
                                data: data,
                                backgroundColor: backgroundColor,
                                borderColor: backgroundColor,
                                borderWidth: 1,
                            });
                        }

                        this.statisticsAmonthChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: months.map(month => this.getMonthName(month)),
                                datasets: datasets,
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [{
                                        stacked: false,
                                        ticks: {
                                            beginAtZero: true,
                                        },
                                    }],
                                    xAxes: [{
                                        stacked: false,
                                    }],
                                },
                                title: {
                                    display: true,
                                    text: 'Estatísticas Mensais',
                                    fontSize: 16,
                                    align: 'left',
                                    
                                },
                                
                            },
                            legend: {
                                align: 'left',
                            },
                        });
                    }
                }
            } catch (error) {
                console.error('Erro ao criar o gráfico de estatísticas mensais:', error);
            }
        },
        createTotalChart() {
            try {
                if (this.$refs.totalChart && this.statisticsAmonth) {
                    const ctx = this.$refs.totalChart.getContext('2d');

                    if (ctx) {
                        const labels = ['Ativa', 'Atrasada', 'Cancelada', 'TrialCancelada', 'Upgrade'];
                        const backgroundColors = ['#57a773', '#fcba03', '#EE6352', '#a60202', '#08b2e3'];

                        const totals = labels.map(label => Object.values(this.statisticsAmonth).reduce((sum, month) => sum + (month[label] || 0), 0));

                        this.totalChart = new Chart(ctx, {
                            type: 'doughnut',
                            data: {
                                labels: labels,
                                datasets: [{
                                    data: totals,
                                    backgroundColor: backgroundColors,
                                }],
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                cutoutPercentage: 60, 
                                title: {
                                    display: true,
                                    text: 'Estatística do Ano',
                                    fontSize: 16,
                                },
                                legend: {
                                    align: 'left',
                                },
                            },
                        });
                    }
                }
            } catch (error) {
                console.error('Erro ao criar o gráfico de totais:', error);
            }
        },
        getMonthName(month) {
            const monthNames = {
                '01': 'Janeiro',
                '02': 'Fevereiro',
                '03': 'Março',
                '04': 'Abril',
                '05': 'Maio',
                '06': 'Junho',
                '07': 'Julho',
                '08': 'Agosto',
                '09': 'Setembro',
                '10': 'Outubro',
                '11': 'Novembro',
                '12': 'Dezembro',
            };
            return monthNames[month] || month;
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    justify-content: flex-start;
    flex-wrap: wrap; 
    column-gap: 16px;
    width: 100%;
    background-color: #ffffff;
}

.box {
    flex: 1 0 calc(50% - 50px);
    display: flex;
    background-color: #FAFAFA;
    max-width: 199px;
    min-width: 164px;
    height: 122px;
    border: solid 1px #57A773;
    margin-bottom: 16px;
    border-radius: 4px;
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); */
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    
}

.checkmark {
    font-size: 14px;
    margin-top: -33px;
}
.IconCheckmark{
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-right: 30px;
}
.textCenter{
    font-weight: 500;
    font-size: 25px;
}

.text {
    text-align: center;
    font-size: 16px;
    color: #635d5d;
}
.IconStyle{
    color: #57A773;
    width: 30px;
    height: 30px
}
.colortext{
    color: #57A773;
    font-size: 12px;
}
.boxVariant{
    border: solid 1px #EE6352;
}
.variant{
    color: #EE6352;
    
}
.VariantWidth{
    width: 25px;
    height: 23px;
}
.table-container {
    margin-bottom: 5rem;
    border-radius: 4px;
}

Table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
}

tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

tbody tr:hover {
    background-color: #e0e0e0;
}

p {
    display: none;
    margin-top: 20px;
}
.DashGraphs{
    padding: 8px 16px 16px 16px !important;
    flex: 1 0 calc(50% - 50px);
    display: flex;
    background-color: #FAFAFA;
    min-width: 400px;
    height: 20rem;
    border: solid 1px #ccc;
    margin-bottom: 9px;
    border-radius: 4px;
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); */
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.donuts{
    padding: 10px 16px 16px 5px;
    max-width: 400px;
    min-width: 400px;
}

@media (max-width: 858px) {
    .donuts{
        max-width: 900px;
        min-width: 400px;
    }
}
@media (max-width: 500px) {
    .box{
        max-width: 155px;
        min-width: 155px;
    }
    .DashGraphs{
        max-width: 400px;
        min-width: 200px;
    }

}

.description h2 {
    font-size: 16px;
    color:#666666;
    margin-top: 10px;
    margin-bottom: 10px;
}

.description hr {
    border: 1px solid #ccc;
    margin-bottom: 20px;
}
.ContainerDash{
    display: flex;
    justify-content: center;
    justify-content: flex-start;
    flex-wrap: wrap; 
    column-gap: 16px;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
}
</style>
