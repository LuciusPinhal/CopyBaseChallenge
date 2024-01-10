<template> 
<div id="nav" > 
    <router-link to="/" id="logo-url"> 
        <img :src="logo" :alt="alt" id="logo"> 
     </router-link>
      <router-link to="/">Home</router-link>|
      <router-link to="/ListUserTable">ListUserTable</router-link> 
</div> 
</template> 
<script> 
export default { 
    name: "NavbarMenu",
    props: ["logo", "alt"]
 } 
</script> 

<style scoped>
#nav {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #222;
    border-bottom: 4px solid #111;
    padding: 15px 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 1000;
}

#nav #logo-url {
    margin: auto;
    margin-left: 0;
}

#logo {
    width: 40px;
    height: 40px;
}

#nav a {
    color: #FCBA03;
    text-decoration: none;
    margin: 12px;
    transition: 0.5s;
}

#nav a:hover {
    color: #fff;
}
</style>