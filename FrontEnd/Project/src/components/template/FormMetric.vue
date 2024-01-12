<template>
  <div v-if="validationextension">
     <FormGraphs/>
  </div> 
  <div class="form-file" v-else>
    <FormUploadVue/>
  </div>
</template>

<script>
import Mediator from "../service/Mediator";
import FormUploadVue from './FormUpload.vue';
import FormGraphs from '../Dashboard/FormGraphs.vue'
export default {
    data() {
      return {
        validationextension: false
      };
    },
    components: {
      FormUploadVue,
      FormGraphs
    },
  methods: {   
    ValidationHeader(validation) {
      this.validationextension = validation;
    }

  },
    created() {
      Mediator.notify(this, "initHome");
    },
  };
</script>
<style scoped>

</style>
