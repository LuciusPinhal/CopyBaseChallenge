<template> 
<div id="nav" > 
    <div class="test">
        <router-link to="/" id="logo-url"> 
            <img :src="logo" :alt="alt" id="logo"> 
        </router-link>
        <router-link to="/">Home</router-link>|
        <router-link to="/ListUserTable">ListUserTable</router-link> 

    </div>
    <div>
        <div v-if="FileName">          
            <a>{{ this.FileName }}</a> 
        </div>
        <div v-else>
           <a>Importe os dados</a>
        </div>
    </div>
</div> 
</template> 
<script>
import Mediator from "../components/service/Mediator";
export default { 
    name: "NavbarMenu",
    props: ["logo", "alt"],
    data() {
        return {
            FileName: "",
        }
    },
    created() {
        Mediator.notify(this, "initNavbar");
    },
    methods: {
        updateNavbar(data) {
            this.FileName = data;
        }
    }
 } 
</script> 

<style scoped>
#nav {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #222;
    border-bottom: 4px solid #111;
    padding: 0px 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 1000;
}

#nav .test {
    display: flex;
    align-items: center;
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