<template>
  <div v-if="validationextension">
  <div>gay</div>
  </div> 
  <div class="form-file" v-else>
    <FormUploadVue/>
  </div>
</template>

<script>
import Mediator from "../service/Mediator";
import FormUploadVue from '../HomePage/FormUpload.vue';
export default {
    data() {
      return {
        validationextension: false
      };
    },
    components: {
      FormUploadVue
    },
  methods: {   
    ValidationHeader(validation) {
      this.validationextension = validation;
    }

  },
    created() {
      Mediator.notify(this, "init");
    },
  };
</script>
<style scoped>

</style>
