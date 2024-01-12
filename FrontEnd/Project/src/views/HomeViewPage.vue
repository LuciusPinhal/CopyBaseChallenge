<template>
  <div>
    <div class="main-container">
      <div class="header-static">
        <div class="form-header">
          <h1>Dashboard viewer</h1>
          <div class="fileName" v-if="FileName">      
            <p>Arquivo:</p>    
              <p class="fileNameText" @mouseover="toggleHover(true)" @mouseleave="toggleHover(false)">
                {{ this.FileName }}
              </p>
              <div @click="remove()" title="Remove file" class="iconContainer">
                <Icon class="icon-cancel" icon="mdi:delete" />
              </div>
          </div>
          <div v-else>
              <p>Faça o importe da planilha para acompanhar receitas, taxas de cancelamento e estatísticas de usuários.</p>
          </div>
          
        </div>
        <FormMetric />
      </div>
    </div>
  </div>
</template>



<script>
import FormMetric from '../components/template/FormMetric.vue'
import Mediator from "../components/service/Mediator";
import { Icon } from '@iconify/vue';
export default {
  name: 'HomeViewPage',
  data() {
    return {
      FileName: "",
      isHover: false,
    }
   },
  components: {
     Icon,
     FormMetric
  },
  created() {
    Mediator.notify(this, "initNavbar");
  },
  methods: {
    updateNavbar(data) {
      this.FileName = data;
    },
    Import() {
      Mediator.notify(null, "ImportFile");
    },
    remove() {
      Mediator.notify(null, "Remove");
    },
    toggleHover(value) {
      this.isHover = value;
    },
  }
}
</script>

<style scoped>
.form-header{
  margin-bottom: 1.5rem;
}
.fileName p {
  font-size: 15px;
  margin-right: 4px;
  font-weight: bold;
}
.fileNameText{
  font-weight: 300 !important;
  transition: color 0.3s ease;
}
.form-header > h1{
  text-align: left;
}
.fileName{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color:#666666;
}

.icon-cancel{
    cursor: pointer;
    width: 23px;
    height: 25px;
    color: #EE6352;
}
.fileName:hover .fileNameText, .fileName:hover .icon-cancel {
  color: #EE6352;
  text-decoration: underline;
}
.icon-cancel {
  cursor: pointer;
  width: 23px;
  height: 25px;
  transition: color 0.3s ease;
}
.iconContainer {
  display: inline-block;
}
</style>