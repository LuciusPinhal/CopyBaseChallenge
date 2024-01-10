<template>
  <div>
    <input type="file" @change="handleFileChange" accept=".xlsx, .csv" />
    <button @click="uploadFile">Enviar</button>

    <div v-if="result">
      <h2>receital anual: {{ result.arr }}</h2>
      <h2>Churn Rate: {{ result.ChurnRate }}</h2>

      <table v-if="result.mrr && result.mrr.length > 0">
        <thead>
          <tr>
            <th>Assinante</th>
            <th>Receita Mensal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(receita, index) in result.mrr" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ receita.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <p>Nenhuma receita mensal disponível.</p>
      </div>
    </div>


  </div>

</template>

<script>

export default {
  name: 'FormMetric',
  data() {
    return {
      file: null,
      result: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
      uploadFile() {
      const formData = new FormData();
      formData.append('file', this.file);

      this.$axios.post('http://localhost:3000/api/stats', formData)
        .then(response => {
          // Salvando cada propriedade separadamente no localStorage
          localStorage.setItem('Receita Recorrente Anual-ARR', JSON.stringify(response.data.arr));
          localStorage.setItem('Receita Recorrente Mensal-MRR', JSON.stringify(response.data.mrr));
          localStorage.setItem('ChurnRate', JSON.stringify(response.data.ChurnRate));
          localStorage.setItem('ChurnRateMes', JSON.stringify(response.data.ChurnRateMes));
          localStorage.setItem('estatisticasPorMes', JSON.stringify(response.data.statisticsAmonth));
          localStorage.setItem('resultadoAgrupadoPorMes', JSON.stringify(response.data.resultGroupedPermonth));

          localStorage.setItem('Receita Média por Usuário  Mensal', JSON.stringify(response.data.arpuMonthly));
          localStorage.setItem('Receita Média por Usuário Anual', JSON.stringify(response.data.arpuAnnual));
          localStorage.setItem('Receita Total Mensal', JSON.stringify(response.data.totalMonthlyRevenue));
          localStorage.setItem('Receita Total Anual', JSON.stringify(response.data.totalAnnualRevenue));
          localStorage.setItem('Número Total de Usuários', JSON.stringify(response.data.totalUsers));
          localStorage.setItem('Valor do Tempo de Vida do Cliente Mensal', JSON.stringify(response.data.ltvMonthly));
          localStorage.setItem('Valor do Tempo de Vida do Cliente Anual', JSON.stringify(response.data.ltvAnnual));
   
                               


          // Atualizando this.result com os dados do servidor
          this.result = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },

  },

};
</script>
