<template>
  <div v-if="validationextension">

  <ul class="mt-4" v-if="filelist.length" v-cloak>
      <li class="text-sm p-1" v-for="(file, index) in filelist" :key="index">
        {{ file.name }}
        <button class="ml-2" type="button" @click="remove(index)" title="Remove file">remove</button>
      </li>
  </ul>

  </div> 
  <div class="form-file" v-else>
    <MessageError :msg="msg" v-show="msg" />
     <div class="drop-area" id="app">
        <div class="form-drag" @dragover.prevent="dragover" @dragleave.prevent="dragleave"
          @drop.prevent="drop">
          <div class="div-icon-pajamas">
            <Icon class="icon-pajamas" icon="pajamas:export" />
          </div>
          <input type="file" multiple name="fields[assetsFieldHandle][]" id="assetsFieldHandle"
            class="input-file-xlsx" @change="onChange" ref="file"
            accept=".xlsx, .csv" />

          <label for="assetsFieldHandle" class="block cursor-pointer">
            <div>
              Arraste e solte os <span class="text-bold">arquivos</span> aqui, ou use o <span class="underline">navegador de arquivos</span>
            </div>
          </label>
          <div class="filelist-item" v-if="filelist.length" v-cloak>
              <p class="text-sm p-1" v-for="(file, index) in filelist" :key="index">
                {{ file.name }}
              </p>

            <div @click="remove(index)" title="Remove file">
              <Icon class="icon-cancel" icon="material-symbols:cancel-outline" />
            </div>
          </div>
        </div>
      </div>
    <button class="form-button margin-top" @click="uploadFile">Enviar Arquivo</button>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import MessageError from "./MessageError.vue"
export default {
    data() {
      return {
        filelist: [],
        msg: null,
        validationextension: false
      };
    },
    components: {
      Icon,
      MessageError,

    },
    methods: {
      onChange() {
        this.filelist = [...this.$refs.file.files];
      },

      remove(index) {
        this.filelist.splice(index, 1);

        if (this.filelist.length === 0) {
          location.reload();
          this.validationextension = false;
        }
      },
      dragover(event) {
        event.preventDefault();
        if (!event.currentTarget.classList.contains('bg-green-300')) {
          event.currentTarget.classList.remove('bg-gray-100');
          event.currentTarget.classList.add('bg-green-300');
        }
      },
      dragleave(event) {
        event.preventDefault();
        event.currentTarget.classList.add('bg-gray-100');
        event.currentTarget.classList.remove('bg-green-300');
      },
      drop(event) {
        event.preventDefault();
        this.$refs.file.files = event.dataTransfer.files;
        this.onChange();
        event.currentTarget.classList.add('bg-gray-100');
        event.currentTarget.classList.remove('bg-green-300');
      },
      uploadFile() {
        if (this.filelist.length > 0) {
          const allowedExtensions = ['.xlsx', '.csv'];
          const uploadedFileName = this.filelist[0].name.toLowerCase();

          console.warn("🍷🗿 >> uploadedFileName:", uploadedFileName);


          if (allowedExtensions.some(extension => uploadedFileName.endsWith(extension))) {
            const formData = new FormData();
            formData.append('file', this.filelist[0]);

            this.$axios.post('http://localhost:3000/api/stats', formData)
              .then(response => {
                console.log('Resposta do servidor:', response.data);
                this.validationextension = true;

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
             
              })
              .catch(error => {
                this.msg = 'Erro na requisição:' + error;
                setTimeout(() => (this.msg = ''), 3000);
              });
          } else {
            this.msg = 'Formato de arquivo inválido. Apenas arquivos .xlsx e .csv são permitidos.';
            setTimeout(() => (this.msg = ''), 3000);

          }
        } else {
          this.msg = 'Nenhum arquivo selecionado.';
          setTimeout(() => (this.msg = ''), 3000);
        }
      },
    }
  };
</script>
<style scoped>
.icon-cancel{
  cursor: pointer;
  width: 29px;
  height: 3rem;
  color: #a60202;

}
.filelist-item{
  margin: 1rem;
  display: flex;
  align-items: center;
}
.text-sm{
  margin-right: 5px !important;
}
.input-file-xlsx{
  opacity: 0;
  margin: 4px;
}
.div-icon-pajamas{
  height: 5rem;
}
.form-drag{
  height: 100%;
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.icon-pajamas{
  width: 5rem;
  height: 5rem;
  color: #3F287A;
}
.underline{
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
  color: #256EB6;
}
.margin-top{
  margin-top:1rem;
}
.form-button {
  border: 2px solid #256EB6;
  background-color: #ffff;
  padding: 8px; 
  color: #256EB6;
  cursor: pointer;
  display: inline-block; 
  position: relative;
  transition: all 0.3s ease;
  border-radius: 4px;
  width: 8rem;

}
.form-button:hover {
  color:#ffff;
  background-color: #256EB6;
  border-radius: 5px;
} 
.text-bold{
  font-weight: bold;
}
.drop-area {
    border-radius: 4px;
    border: 2px dashed #ccc;
    text-align: center;
    height: 240px;
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
}
.drop-area.drag-over {
  background-color: #f0f0f0;
}
.drop-area p {
  margin: 0;
}
</style>
