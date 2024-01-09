<template>
    <div>
        <Table v-if="tableData" class="table-container">
            <thead>
                <tr>
                    <th>ID Assinante</th>
                    <th>Periodicidade</th>
                    <th>Quantidade de Cobranças</th>
                    <th>Cobrada a cada X dias</th>
                    <th>Data Início</th>
                    <th>Status</th>
                    <th>Data do Status</th>
                    <th>Valor</th>
                    <th>Próximo Ciclo</th>
                </tr>
            </thead>
            <tbody v-if="tableData">
                <tr v-for="(user, index) in usuariosPorMes" :key="index">
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
        </Table>
        <p v-else>Nenhum dado disponível. Carregue a Planilha novamente</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            resultadoAgrupadoPorMes: {},
            usuariosPorMes: [],
            tableData: false
        };
    },
    created() {
        this.loadFromLocalStorage();
    },
    methods: {
        loadFromLocalStorage() {
            const dataAsString = localStorage.getItem('resultadoAgrupadoPorMes');

            if (dataAsString) {
                try {
                    const parsedData = JSON.parse(dataAsString);

                    if (parsedData && parsedData.UsuariosPorMes) {
                        const usuariosPorMesArray = Object.values(parsedData.UsuariosPorMes).flat();

                        if (usuariosPorMesArray.length > 0) {
                            this.usuariosPorMes = usuariosPorMesArray;
                            this.tableData = true;
                        } else {
                            console.warn('Array de usuariosPorMes está vazio.');
                            this.tableData = false;
                        }

                        console.log('Dados do localStorage carregados com sucesso:', this.usuariosPorMes);
                    } else {
                        console.warn('Dados no formato esperado não encontrados no localStorage.');
                        this.tableData = false;
                    }
                } catch (error) {
                    console.error('Erro ao analisar os dados do localStorage:', error);
                }
            } else {
                console.warn('Nenhum dado encontrado no localStorage.');
            }
        },
    },
};
</script>

<style scoped>
  .table-container {
    /* Adiciona um overflow horizontal e torna a tabela responsiva */
    overflow-x: auto;
  }

  Table {
    /* Seu estilo da tabela aqui */
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    /* Seu estilo para células aqui */
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  th {
    /* Seu estilo para cabeçalho aqui */
    background-color: #f2f2f2;
  }

  tbody tr:nth-child(even) {
    /* Seu estilo para linhas pares aqui */
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    /* Seu estilo para linhas em hover aqui */
    background-color: #e0e0e0;
  }

  p {
    /* Estilo para o parágrafo quando a tabela estiver escondida */
    display: none;
    margin-top: 20px;
  }

</style>
