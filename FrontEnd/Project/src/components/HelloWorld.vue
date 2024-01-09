<template>
  <div>
    <input type="file" @change="handleFileChange" accept=".xlsx, .csv" />
    <button @click="uploadFile">Enviar</button>

    <div v-if="result">
      <h2>MRR: {{ result.mrr }}</h2>
      <h2>Churn Rate: {{ result.churnRate }}</h2>

      <table v-if="result.recipesMonthly && result.recipesMonthly.length > 0">
        <thead>
          <tr>
            <th>Assinante</th>
            <th>Receita Mensal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(receita, index) in result.recipesMonthly" :key="index">
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
  name: 'HelloWorld',
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

      this.$axios.post('http://localhost:3000/upload', formData)
        .then(response => {
          // Salvando cada propriedade separadamente no localStorage
          localStorage.setItem('ChurnRate', JSON.stringify(response.data.ChurnRate));
          localStorage.setItem('ChurnRateMes', JSON.stringify(response.data.ChurnRateMes));
          localStorage.setItem('estatisticasPorMes', JSON.stringify(response.data.statisticsAmonth));
          localStorage.setItem('mrr', JSON.stringify(response.data.mrr));
          localStorage.setItem('recipesMonthly', JSON.stringify(response.data.recipesMonthly));
          localStorage.setItem('resultadoAgrupadoPorMes', JSON.stringify(response.data.resultGroupedPermonth));

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
