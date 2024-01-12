<template> 
<div id="nav" > 
    <div class="formNav">
        <router-link to="/" id="logo-url"> 
            <img :src="logo" :alt="alt" id="logo"> 
        </router-link>
    </div>
    <div>
        <router-link to="/">Home</router-link><span>|</span>
        <router-link to="/ListUserTable">Table</router-link> 
    </div>
</div> 
</template> 
<script>

export default { 
    name: "NavbarMenu",
    props: ["logo", "alt"],
    data() {
        return {
           
        }
    },
   
 } 
</script> 

<style scoped>
#nav {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #EFE9F4;
    /* border-bottom: 2px solid #3F287A; */
    padding: 0px 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 1000;
}

#nav .formNav {
    display: flex;
    align-items: center;
    margin: auto;
    margin-left: 0;
}

#logo {
    width: 155px;
    height: 40px;
}

#nav a,
.fileName p {
    color: #3F287A;
    text-decoration: none;
    margin: 12px;
    transition: 0.5s;
}
#nav span {
    color: #3F287A;   
}
#nav a:hover {  
    text-decoration: underline;
}

</style>