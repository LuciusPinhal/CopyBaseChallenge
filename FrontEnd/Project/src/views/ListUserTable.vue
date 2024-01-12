<template>
    <div>
        <div class="main-container">
            <div class="form-header">
                <h1>Table</h1>
                <p>Detalhamento de usuários referente a planilha</p>
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