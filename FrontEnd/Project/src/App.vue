<template>
  <div>
    <NavbarMenu :logo="logo_src" :alt="app_name"/> 
    <router-view />
    <FooterSection />
  </div>
</template>
<script>
import NavbarMenu from "./components/NavbarMenu.vue";
import FooterSection from "./components/FooterSection.vue";

 export default {

  components: {
    NavbarMenu,
    FooterSection,
  },
  data() {
    return {
      logo_src: require('@/Img/logo.png'),
      app_name: "Make Your Burger"
    }
  }
}


</script>

<style>
* {
  font-family: Helvetica;
  padding: 0;
  margin: 0;
  box-sizing: border-box;

}

.main-container {
  margin-top: 95px !important;
  margin: 24px;
  min-height: 250px;
}

h1 {
  text-align: center;
  font-size: 32px;
  margin-bottom: 10px;
  color: #222;

}
</style>