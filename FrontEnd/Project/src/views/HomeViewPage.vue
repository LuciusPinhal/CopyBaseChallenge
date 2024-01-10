<template>
  <div>
    <div class="main-container">
      <h1>Container:</h1>
      <FormMetric />
    </div>
  </div>
</template>

<script>
import FormMetric from '../components/FormMetric.vue'
export default {
  name: 'HomeViewPage',
  components: {
    FormMetric
  }
}
</script>