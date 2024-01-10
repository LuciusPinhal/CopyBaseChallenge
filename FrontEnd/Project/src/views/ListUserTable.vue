<template>
    <div>
        <div class="main-container">
            <div class="form-header">
                <h1>Dashboard</h1>
                <p>Este é um texto provisório. Substitua-o pelo seu conteúdo real.</p>
            </div>
            <TableUser />
        </div>
    </div>
</template>

<script>
import TableUser from '../components/template/TableUser.vue'
export default {
    name: 'ListUserTable',
    components: {
        TableUser
    }
}
</script>

<style scoped>
.form-header {
    margin-bottom: 1.5rem;

}

.form-header>h1 {
    text-align: left;
}
</style>