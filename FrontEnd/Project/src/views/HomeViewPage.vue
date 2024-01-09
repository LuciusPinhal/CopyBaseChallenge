<template>
  <div>
    <div class="main-container">
      <h1>Container:</h1>
      <BurgerForm />
    </div>
  </div>
</template>

<script>
import BurgerForm from '../components/HelloWorld.vue'
export default {
  name: 'HomeViewPage',
  components: {
    BurgerForm
  }
}
</script>