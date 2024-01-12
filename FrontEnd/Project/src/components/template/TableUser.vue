<template>
    <div class="container">
        <div v-if="tableData">
            <div class="search-container">
                <Icon class="icon-search" icon="material-symbols:search" />
                <input v-model="filter" class="input-with-icon" placeholder="Pesquise aqui..." />
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th @click="sortTable('ID assinante')" class="header-cell">
                                <div class="header-content">
                                    <span class="header-text">ID Assinante</span>
                                    <span v-if="sortKey === 'ID assinante' && sortOrder === 1" class="chevron-down"><Icon icon="mdi:chevron-down" class="formTableIcon" /></span>
                                    <span v-if="sortKey === 'ID assinante' && sortOrder === -1" class="chevron-up"><Icon icon="mdi:chevron-down" class="formTableIcon" :rotate="2" /></span>
                                </div>
                            </th>
                            <th @click="sortTable('periodicidade')" class="header-cell">
                                <div class="header-content">
                                    <span class="header-text">Periodicidade</span>
                                    <span v-if="sortKey === 'periodicidade' && sortOrder === 1" class="chevron-down"><Icon icon="mdi:chevron-down" class="formTableIcon" /></span>
                                    <span v-if="sortKey === 'periodicidade' && sortOrder === -1" class="chevron-up"><Icon icon="mdi:chevron-down" class="formTableIcon" :rotate="2" /></span>
                                </div>
                            </th>
                            <th @click="sortTable('quantidade cobranças')" class="header-cell">
                                <div class="header-content">
                                    <span class="header-text">Quantidade de Cobranças</span>
                                    <span v-if="sortKey === 'quantidade cobranças' && sortOrder === 1" class="chevron-down"><Icon icon="mdi:chevron-down" class="formTableIcon" /></span>
                                    <span v-if="sortKey === 'quantidade cobranças' && sortOrder === -1" class="chevron-up"><Icon icon="mdi:chevron-down" class="formTableIcon" :rotate="2" /></span>
                                </div>
                            </th>
                            <th @click="sortTable('cobrada a cada X dias')" class="header-cell">
                                <div class="header-content">
                                    <span class="header-text">Cobrada a cada X dias</span>
                                    <span v-if="sortKey === 'cobrada a cada X dias' && sortOrder === 1" class="chevron-down"><Icon icon="mdi:chevron-down" class="formTableIcon" /></span>
                                    <span v-if="sortKey === 'cobrada a cada X dias' && sortOrder === -1" class="chevron-up"><Icon icon="mdi:chevron-down" class="formTableIcon" :rotate="2" /></span>
                                </div>
                            </th>
                            <th @click="sortTable('data início')" class="header-cell">
                                <div class="header-content">
                                    <span class="header-text">Data Início</span>
                                    <span v-if="sortKey === 'data início' && sortOrder === 1" class="chevron-down"><Icon icon="mdi:chevron-down" class="formTableIcon" /></span>
                                    <span v-if="sortKey === 'data início' && sortOrder === -1" class="chevron-up"><Icon icon="mdi:chevron-down" class="formTableIcon" :rotate="2" /></span>
                                </div>                            
                            </th>
                            <th @click="sortTable('status')" class="header-cell">
                                <div class="header-content">
                                    <span class="header-text">Status</span>
                                    <span v-if="sortKey === 'status' && sortOrder === 1" class="chevron-down"><Icon icon="mdi:chevron-down" class="formTableIcon" /></span>
                                    <span v-if="sortKey === 'status' && sortOrder === -1" class="chevron-up"><Icon icon="mdi:chevron-down" class="formTableIcon" :rotate="2" /></span>
                                </div>                                    
                            </th>
                            <th @click="sortTable('data status')" class="header-cell">
                                <div class="header-content">
                                    <span class="header-text">Data do Status</span>
                                    <span v-if="sortKey === 'data status' && sortOrder === 1" class="chevron-down"><Icon icon="mdi:chevron-down" class="formTableIcon" /></span>
                                    <span v-if="sortKey === 'data status' && sortOrder === -1" class="chevron-up"><Icon icon="mdi:chevron-down" class="formTableIcon" :rotate="2" /></span>
                                </div>                               
                            </th>
                            <th @click="sortTable('valor')" class="header-cell">
                                <div class="header-content">
                                    <span class="header-text">Valor</span>
                                    <span v-if="sortKey === 'valor' && sortOrder === 1" class="chevron-down"><Icon icon="mdi:chevron-down" class="formTableIcon" /></span>
                                    <span v-if="sortKey === 'valor' && sortOrder === -1" class="chevron-up"><Icon icon="mdi:chevron-down" class="formTableIcon" :rotate="2" /></span>
                                </div>                               
                            </th>
                            <th @click="sortTable('próximo ciclo')" class="header-cell">
                                <div class="header-content">
                                    <span class="header-text">Próximo Ciclo</span>
                                    <span v-if="sortKey === 'próximo ciclo' && sortOrder === 1" class="chevron-down"><Icon icon="mdi:chevron-down" class="formTableIcon" /></span>
                                    <span v-if="sortKey === 'próximo ciclo' && sortOrder === -1" class="chevron-up"><Icon icon="mdi:chevron-down" class="formTableIcon" :rotate="2" /></span>
                                </div> 
                            </th>
                        </tr>
                    </thead>
                    <tbody v-if="tableData">
                        <tr v-for="(user, index) in filteredData" :key="index">
                            <td>{{ user['ID assinante'] }}</td>
                            <td>{{ user.periodicidade }}</td>
                            <td>{{ user['quantidade cobranças'] }}</td>
                            <td>{{ user['cobrada a cada X dias'] }}</td>
                            <td>{{ user['data início'] }}</td>
                            <td>{{ user.status }}</td>
                            <td>{{ user['data status'] }}</td>
                            <td>{{ user.valor }}</td>
                            <td>{{ user['próximo ciclo'] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else class="containerEmpty">
            <div class="textEmpty">
                Nenhum dado disponível.
            </div>
            <div class="textEmpty">
                É necessário importar a planilha!
            </div>
        </div>
    </div>
</template>

<script>
import Mediator from "../service/Mediator";
import { Icon } from '@iconify/vue';
import { parse, compareDesc } from 'date-fns';
export default {
    data() {
        return {
            filter: "",
            sortKey: "ID assinante",
            sortOrder: 1,
            resultadoAgrupadoPorMes: {},
            usersAmonth: [],
            tableData: false
        };
    },
    components: {
        Icon,
    },
    created() {
        Mediator.notify(this, "initTable");
    },
    computed: {
        filteredData() {
            return this.usersAmonth
                .filter((user) =>
                    Object.values(user).some(value =>
                        String(value).toLowerCase().includes(this.filter.toLowerCase())
                    )
                )
                .sort((a, b) => {
                    const modifier = this.sortOrder === 1 ? 1 : -1;
                    return modifier * (a[this.sortKey] - b[this.sortKey]);
                });
        },
    },
    methods: {
     loadFromMediator(resultGroupedPermonth) {
            if (resultGroupedPermonth) {
                try {
                    if (resultGroupedPermonth && resultGroupedPermonth.UsersAmonth) {
                        const usersAmonthArray = Object.values(resultGroupedPermonth.UsersAmonth).flat();

                        if (usersAmonthArray.length > 0) {
                            this.usersAmonth = usersAmonthArray.sort((a, b) => {
                                const dateA = parse(a['data início'], 'dd/MM/yyyy HH:mm:ss', new Date());
                                const dateB = parse(b['data início'], 'dd/MM/yyyy HH:mm:ss', new Date());

                                return compareDesc(dateA, dateB);
                            });

                            this.tableData = true;
                        } else {
                            console.warn('Array de usersAmonth está vazio.');
                            this.tableData = false;
                        }
                        
                    } else {
                        console.warn('Dados no formato esperado não encontrados');
                        this.tableData = false;
                    }
                } catch (error) {
                    console.error('Erro ao analisar os dados:', error);
                }
            } else {
                console.warn('Nenhum dado encontrado.');
            }
        },
        getStatus(data) {
            this.tableData = data
        },
        sortTable(key) {
            if (this.sortKey === key) {
                this.sortOrder *= -1;
            } else {
                this.sortKey = key;
                this.sortOrder = 1;
            }
            this.usersAmonth.sort((a, b) => {
                const modifier = this.sortOrder;

                if (key === 'dataInicio' || key === 'Data do Status' || key === 'Próximo Ciclo') {
                    const dateA = new Date(a[key]);
                    const dateB = new Date(b[key]);
                    return modifier * (dateA - dateB);
                } else if (key === 'ID assinante') {
                    const numA = parseInt(a[key].substring(5)); 
                    const numB = parseInt(b[key].substring(5));
                    return modifier * (numA - numB);
                } else if (typeof a[key] === 'string' && typeof b[key] === 'string') {
                    const valA = a[key].toUpperCase();
                    const valB = b[key].toUpperCase();
                    return modifier * valA.localeCompare(valB);
                } else {
                    const valA = typeof a[key] === 'number' ? a[key] : 0;
                    const valB = typeof b[key] === 'number' ? b[key] : 0;
                    return modifier * (valA - valB);
                }
            });
        },
    },
};
</script>

<style scoped>

.header-cell {
    vertical-align: middle;
    position: sticky;
    top: 0;
    background-color: #efe9f4;
    color: #3f287a;
    z-index: 1;
}

.header-content {
    display: flex;
    align-items: center;
}

.header-text {
    flex-grow: 1;
}

.chevron-down,
.chevron-up {
    width: 26px;
    height: 26px;
    color: #3f287a;
}
.formTableIcon{
    width: 26px;
    height: 26px;
    color:#3F287A; 
}
.container{
    width: 100%;
    height: 50vh;
    border-radius: 4px;
 
}
.containerEmpty{
    width: 100%;
    height: 240px;
    border-radius: 4px;
    border: 2px dashed #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.textEmpty{
    color: #AFB1B3;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
input {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease-in-out;
}

input:focus {
  border-color: rgb(95, 70, 160); 
  box-shadow: 0 0 5px rgba(95, 70, 160, 0.5);
}

input::placeholder {
  color: #782f2f; 
}

.search-container {
    background-color: white;
    margin-bottom: -1px;
    position: relative;
}

.icon-search {
  position: absolute;
  left: 10px; 
  top: 40%;
  transform: translateY(-50%);
  color:#3F287A; 
}
.input-with-icon {
  padding-left: 30px;
}

.table-container {
    height: 42vh;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    overflow-x: auto;
    border-radius: 5px;
    font-size: 11px;
    width: 100%;
}

@media (max-width: 1000px) {
    .table-container {
      height: 60vh;
    }
}

table {
  border-collapse: collapse;
  width: 100%;
}
thead th {
  vertical-align: middle;
  position: sticky;
  top: 0;
  background-color: #efe9f4;
  color:#3f287a;
  z-index: 1;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  cursor: pointer;
}

tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

tbody tr:hover {
    background-color: #e0e0e0;
}

p {
    display: none;
    margin-top: 20px;
}
</style>