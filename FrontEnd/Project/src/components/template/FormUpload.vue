<template>
    <div class="form-file">
        <MessageError :msg="msg" v-show="msg" />
        <div ref="dropArea" class="drop-area" id="app" :class="{ flash: flash }" >
            <div class="form-drag" @dragover.prevent="dragover" @dragleave.prevent="dragleave" @drop.prevent="drop">
                <div class="div-icon-pajamas">
                    <Icon class="icon-pajamas" icon="pajamas:export" />
                </div>
                <input type="file" multiple name="fields[assetsFieldHandle][]" id="assetsFieldHandle"
                    class="input-file-xlsx" @change="onChange" ref="file" accept=".xlsx, .csv" />

                <label for="assetsFieldHandle" class="block cursor-pointer">
                    <div>
                        Arraste e solte os <span class="text-bold">arquivos</span> aqui, ou use o <span
                            class="underline">navegador de arquivos</span>
                    </div>
                </label>
                <div class="teste">
                    <div class="filelist-item" v-if="filelist.length" v-cloak>
                        <p class="text-sm p-1" v-for="(file, index) in filelist" :key="index" >
                            {{ file.name }}
                        </p>
    
                        <div @click="remove(index)" title="Remove file">
                            <Icon class="icon-cancel"  icon="mdi:delete"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="form-button margin-top" @click="uploadFile">Enviar Arquivo</button>
    </div>
</template>

<script>
import Mediator from "../service/Mediator";
import { Icon } from '@iconify/vue';
import MessageError from "../MessageError.vue"
export default {
    data() {
        return {
            filelist: [],
            msg: null,
            flash: false,
            validationextension: false
        };
    },
    created() {
        Mediator.notify(this, "initUpload");
    },
    components: {
        Icon,
        MessageError,

    },
    methods: {
        flashEffect() {
            this.flash = true;
            //this.$refs.dropArea.style.border = 'none';
            setTimeout(() => {
                //this.$refs.dropArea.style.border = '2px dashed #ccc';
                this.flash = false;
            }, 200);
        },

        onChange() {
            this.filelist = [...this.$refs.file.files];
        },

        remove(index) {
            this.filelist.splice(index, 1);

            if (this.filelist.length === 0) {
                location.reload();
                this.validationextension = false;
                 Mediator.notify(this.validationextension, "screenStatus");
            }
        },
        dragover(event) {
            event.preventDefault();
            if (!event.currentTarget.classList.contains('bg-green-300')) {
                event.currentTarget.classList.remove('bg-gray-100');
                event.currentTarget.classList.add('bg-green-300');
            }
        },
        dragleave(event) {
            event.preventDefault();
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        drop(event) {
            event.preventDefault();
            this.$refs.file.files = event.dataTransfer.files;
            this.onChange();
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        uploadFile() {
            if (this.filelist.length > 0) {
                const allowedExtensions = ['.xlsx', '.csv'];
                const uploadedFileName = this.filelist[0].name.toLowerCase();
                Mediator.notify(uploadedFileName, 'FileName');

                if (allowedExtensions.some(extension => uploadedFileName.endsWith(extension))) {
                    const formData = new FormData();
                    formData.append('file', this.filelist[0]);

                    this.$axios.post('http://localhost:3000/api/stats', formData)
                        .then(response => {
                            
                            this.validationextension = true;
                            Mediator.notify(this.validationextension, "screenStatus");

                            
                            const Arr = response.data.arr;
                            const Mrr = response.data.mrr;
                            const ChurnRate = response.data.ChurnRate;
                            const ChurnRateAmonth = response.data.ChurnRateAmonth;
                            const statisticsAmonth = response.data.statisticsAmonth;

                            //ver quando carregar a tela se o mediator envia os dados
                            const resultGroupedPermonth = response.data.resultGroupedPermonth;

                            const arpuMonthly = response.data.arpuMonthly;
                            const arpuAnnual = response.data.arpuAnnual;
                            const totalMonthlyRevenue = response.data.totalMonthlyRevenue;
                            const totalAnnualRevenue = response.data.totalAnnualRevenue;
                            const totalUsers = response.data.totalUsers;
                            const ltvMonthly = response.data.ltvMonthly;
                            const ltvAnnual = response.data.ltvAnnual;

                            Mediator.notify({ Arr, Mrr, ChurnRate, ChurnRateAmonth, statisticsAmonth, resultGroupedPermonth,
                                arpuMonthly, arpuAnnual, totalMonthlyRevenue, totalAnnualRevenue, totalUsers,
                                ltvMonthly, ltvAnnual }, "AllStats");
                  
                    
                        })
                        .catch(error => {
                            this.msg = 'Erro na requisição:' + error;
                            setTimeout(() => (this.msg = ''), 3000);
                        });
                } else {
                    this.msg = 'Formato de arquivo inválido. Apenas arquivos .xlsx e .csv são permitidos.';
                    setTimeout(() => (this.msg = ''), 3000);

                }
            } else {
                this.msg = 'Nenhum arquivo selecionado.';
                setTimeout(() => (this.msg = ''), 3000);
            }
        },
    }
};
</script>
<style scoped>
.teste{
    height: 40px;
}
.flash {
    transition: box-shadow 0.4s ease;
    box-shadow: 8px 8px 20px 8px rgb(0 0 0 / 21%);
    background-color: #f0f0f038;
}

.icon-cancel {
    cursor: pointer;
    width: 29px;
    height: 3rem;
    color: #EE6352;

}

.filelist-item {
    margin: 10px;
    display: flex;
    align-items: center;
}

.text-sm {
    margin-right: 5px !important;
}

.input-file-xlsx {
    opacity: 0;
    margin: 4px;
}

.form-drag {
    height: 100%;
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.icon-pajamas {
    width: 5rem;
    height: 4rem;
    color: #EFE9F4;
}

.underline {
    text-decoration: underline;
    font-weight: bold;
    cursor: pointer;
    color: #3F287A;
}

.margin-top {
    margin-top: 10px;
}

.form-button {
    border: 2px solid #3F287A;
    background-color: #ffff;
    padding: 8px;
    color: #3F287A;
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: all 0.3s ease;
    border-radius: 4px;
    width: 8rem;

}

.form-button:hover {
    color: #ffff;
    background-color: #3F287A;
    border-radius: 5px;
}

.text-bold {
    font-weight: bold;
}

.drop-area {
    border-radius: 4px;
    border: 2px dashed #ccc;
    text-align: center;
    height: 240px;
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
}

.drop-area.drag-over {
    background-color: #f0f0f0;
}

.drop-area p {
    margin: 0;
}</style>
