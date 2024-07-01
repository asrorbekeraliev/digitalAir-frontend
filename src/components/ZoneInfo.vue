<template>
    <div class="wrapper">
        <div v-if="this.alertStatus" class="alert alert-danger" role="alert" style="position: sticky; top: 0; z-index: 15; text-align: center;">
            <h1>{{ this.alertMessage }}</h1>
        </div>        
        
        <div class="row allcharts" v-if="!this.alertStatus"> 
            <h2>{{ this.zoneName }} tumanidagi havo sifati ko'rsatkichlari</h2>
            <div class="buttonsCateg col-3">
                <button type="button" class="btn btn-dark" @click="getDailyParameters" style="margin-right: 50px">Kunlik</button>
                <button type="button" class="btn btn-dark" @click="renderPage" style="margin-left: 50px">Soatlik</button>
            </div>
            <div class="col-12 chart-container">
                <Line v-if="loaded" :data="dataDust" :options="chartOptions"/>
            </div>
            <div class="col-12 chart-container">
                <Line v-if="loaded" :data="dataTemperature" :options="chartOptions" />
            </div>

            <div class="col-12 chart-container">
                <Line v-if="loaded" :data="dataHumidity" :options="chartOptions" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
export default {
    components: { Line,  },
    data() {
        return {
            zoneId: this.$route.params.id,
            data: null,
            alertMessage: '',
            alertStatus: false,
            loaded: false,
            zoneName: '',

            dataDust: {
                labels: [],
                datasets: [
                {
                    label: 'Chang miqdori [ PM 2.5  µg/m³ ]',
                    borderColor: 'rgb(222, 55, 49)',
                    pointBackgroundColor: 'white',
                    fill: true,
                    backgroundColor: (ctx) => {
                    const canvas = ctx.chart.ctx;
                    const gradient = canvas.createLinearGradient(0,0,0,160);

                    gradient.addColorStop(0, 'rgb(222, 55, 49)');
                    gradient.addColorStop(1, 'transparent');

                    return gradient;
                    },
                    data: [],
                },
                ],
            },
            dataTemperature: {
                labels: [],
                datasets: [
                {
                    label: 'Temperatura [ °C ]',
                    borderColor: 'blue',
                    fill: true,
                    pointBackgroundColor: 'white',
                    backgroundColor: (ctx) => {
                    const canvas = ctx.chart.ctx;
                    const gradient = canvas.createLinearGradient(0,0,0,160);

                    gradient.addColorStop(0, 'blue');
                    gradient.addColorStop(1, 'transparent');

                    return gradient;
                    },
                    data: [],
                },
                ],
            },
            dataHumidity: {
                labels: [],
                datasets: [
                {
                    label: 'Nisbiy namlik [ % ]',
                    borderColor: 'green',
                    fill: true,
                    pointBackgroundColor: 'white',
                    backgroundColor: (ctx) => {
                    const canvas = ctx.chart.ctx;
                    const gradient = canvas.createLinearGradient(0,0,0,160);

                    gradient.addColorStop(0, 'green');
                    gradient.addColorStop(1, 'transparent');

                    return gradient;
                    },
                    data: [],
                },
                ],
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: {
                                size: 12,
                                weight: 500,
                            },
                            color: 'white', // Set legend text color to white for better visibility
                            boxHeight: 8,
                            usePointStyle: true,
                            pointStyle: 'circle',
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'white', // Set x-axis ticks color to white
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)', // Set x-axis grid color
                        },
                    },
                    y: {
                        ticks: {
                            color: 'white', // Set y-axis ticks color to white
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)', // Set y-axis grid color
                        },
                    },
                },
                layout: {
                    padding: {
                        top: 10,
                        bottom: 10,
                        left: 10,
                        right: 10,
                    },
                },
                elements: {
                    point: {
                        backgroundColor: 'white',
                    },
                },
            }

        }
    },

    methods: {
        hideAlertAfterDelay() {
        setTimeout(() => {
        //   this.alertStatus = false;
          location.replace('/zones')
        }, 4000); 
      },

      async getDailyParameters(){
        this.loaded = false
        await axios.get('/parameter/days/zone/' + this.zoneId)
        .then((resp) => {

            this.dataDust.labels = []
            this.dataTemperature.labels = []
            this.dataHumidity.labels = []

            this.dataDust.datasets[0].data = []
            this.dataTemperature.datasets[0].data = []
            this.dataHumidity.datasets[0].data = []


            console.log(resp.data.parameters)
            const getDailyParameters = resp.data.parameters

            getDailyParameters.forEach(parameter => {
                 this.dataDust.labels.push(parameter.date)
                 this.dataTemperature.labels.push(parameter.date)
                 this.dataHumidity.labels.push(parameter.date)

                 this.dataDust.datasets[0].data.push((parameter.maxPm2_5 + parameter.minPm2_5)/2)
                 this.dataTemperature.datasets[0].data.push((parameter.maxTemperature + parameter.minTemperature)/2)
                 this.dataHumidity.datasets[0].data.push((parameter.maxHumidity + parameter.minHumidity)/2)

            });

            this.loaded = true

        })
        .catch((error) => {
            console.log(error)
        })
      },

      renderPage(){
        location.reload();
      }


        
    },

    async mounted() {
        await axios.get('/parameter/zone/' + this.zoneId  )
        .then((resp) => {
            // console.log(resp)
            this.dataDust.labels = resp.data.createdAt;
            this.dataDust.datasets[0].data = resp.data.pm2_5;
            this.dataTemperature.labels = resp.data.createdAt;
            this.dataTemperature.datasets[0].data = resp.data.temperatures;
            this.dataHumidity.labels = resp.data.createdAt;
            this.dataHumidity.datasets[0].data = resp.data.humidities;
            this.zoneName = resp.data.zoneName

            this.loaded = true;


        })
        .catch((error) => {
            console.log(error)
            if(error.response.data.success == false){
                this.alertMessage = 'Ushbu hududga qurilma o\'rnatilmagan'
                this.alertStatus = true
                this.hideAlertAfterDelay();
            }
        })
        



    },
}
</script>

<style scoped>

.wrapper {
    min-height: 80vh;
    width: 100%;
    background-color: #192c3f; 
}

.chart-container {
    width: 96%;
  border-radius: 8px;
  background-color: #2c3e50; /* Ensure the background inside the border is also dark */
  margin: 10px 0px; /* Add margin to create gap between each chart */
  padding: 0px;
}

.allcharts {
    display: flex;
    align-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
}

h2 {
    color: white;
    margin: 4vh;
}

.col-12 {
    height: 33vh;
}

.buttonsCateg {
    display: flex;
    align-content: center;
    flex-direction: row;

}

button {
    width: 10vw !important;
}



</style>