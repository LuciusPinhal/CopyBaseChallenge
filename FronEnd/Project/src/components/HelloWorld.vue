<template>
  <div>
    <input type="file" @change="handleFileChange" accept=".xlsx, .csv" />
    <button @click="uploadFile">Enviar</button>

    <div v-if="result">
      <h2>MRR: {{ result.mrr }}</h2>
      <h2>Churn Rate: {{ result.churnRate }}</h2>

      <table v-if="result.receitasMensais.length > 0">
        <thead>
          <tr>
            <th>Assinante</th>
            <th>Receita Mensal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(receita, index) in result.receitasMensais" :key="index">
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
          this.result = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>
