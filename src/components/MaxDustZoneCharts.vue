<template>
  <div class="row" style="margin-top: 5px"> 
    <div class="col-2">
      <div class="card second-row-cards" style="color: cyan;">
        <div class="card-body" style="display: flex; align-items: center; flex-direction: column;">
          <p class="card-title" style="font-weight: bolder;">Chang miqdori eng yuqori hudud</p>
          <div style="height: 10vh; display: flex; align-items: center; ">
            <h4 class="card-text" style="font-weight: bold; font-family: Arial, Helvetica, sans-serif">{{ this.mostDustyZoneName }}</h4>
          </div>          
        </div>
      </div>
    </div>
    <div class="col-2">
      <div class="card second-row-cards" style="color: cyan;">
        <div class="card-body" style="display: flex; align-items: center; flex-direction: column;">
          <p class="card-header">PM 2.5 &emsp; µg/m³ </p>
          <h1 class="card-text" style="font-weight: bold; font-family: Arial, Helvetica, sans-serif">
            {{ this.lastDustLevel }}
          </h1>
          <h4>{{ this.currentDustState }}</h4>
        </div>
      </div>
    </div>
    <div class="col-2 mobileNone">
      <div class="card second-row-cards" style="color: cyan;">
        <div class="card-body" style="display: flex; align-items: center; flex-direction: column;">
          <p class="card-header">Temperatura&ensp; °C </p>
          <h1 class="card-text" style="font-weight: bold; font-family: Arial, Helvetica, sans-serif">{{ this.lastTemperature }}</h1>
          <h4>{{ this.currentTemperatureState }}</h4>
        </div>
      </div>
    </div>
    <div class="col-2 mobileNone">
      <div class="card second-row-cards" style="color: cyan;">
        <div class="card-body" style="display: flex; align-items: center; flex-direction: column;">
          <p class="card-header">Nisbiy Namlik&ensp;% </p>
          <h1 class="card-text" style="font-weight: bold; font-family: Arial, Helvetica, sans-serif">{{ this.lastHumidity }}</h1>
          <h4>{{ this.currentHumidityState }}</h4>
        </div>
      </div>
    </div>
    <div class="col-2 mobileNone">
      <div class="card second-row-cards" style="color: cyan;">
        <div class="card-body" style="display: flex; align-items: center; flex-direction: column;">
          <p class="card-title">Hududlar</p>
          <div class="row" style="background-color: transparent; padding: 0; width: 100%; display: flex;">
            <div class="col-6" style=" flex: 1; text-align: center;">
              <p style="font-size: 1rem; text-align: center;">Aktiv</p>
              <h1>{{ this.numberOfActiveZones }}</h1>
            </div>
            <div class="col-6" style="flex: 1; text-align: center;">
              <p style="font-size: 1rem; text-align: center;">Passiv</p>
              <h1>{{ this.numberOfPassiveZones }}</h1>
            </div>
          </div>
        </div>
      </div>


    </div>
    <div class="col-2 mobileNone">
      <div class="card second-row-cards" style="color: cyan;">
        <div class="card-body" style="display: flex; align-items: center; flex-direction: column;">
          <p class="card-header">Nisbiy Namlik&ensp;% </p>
          <h1 class="card-text" style="font-weight: bold; font-family: Arial, Helvetica, sans-serif">{{ this.lastHumidity }}</h1>
          <h4>{{ this.currentHumidityState }}</h4>
        </div>
      </div>
    </div>
  </div>
  <div class="row"> 
    <div class="col-9 chart-container" style="height: 200px;">
      <Line v-if="loaded" :data="dataDust" :options="chartOptions"/>
    </div>   
    <div class="col-3 mobileNone">
      <div class="row" style="">
        <div class="col-md-4 vertical-div" style="width: 100%; height: 66px;">

          <div class="inner-div" style="height: 80%; margin: 2%; background-color: #b32b2b;">
            <div class="row" style="background-color: transparent;  margin: 0 2%;">
              <div class="col-7" style="display: flex; align-items: center; flex-direction: column;">
                <p style="font-size: 1.5rem">Xavfli</p>
              </div>
              <div class="col-5" style="display: flex; align-items: center; flex-direction: column;">
                <p style="font-size: 1.9rem"> >120 </p>
              </div>
            </div>
          </div>
          <div class="inner-div" style="height: 80%; margin: 2%; background-color: #6e2f8f;">
            <div class="row" style="background-color: transparent;  margin: 0 2%;">
              <div class="col-7" style="display: flex; align-items: center; flex-direction: column;">
                <p style="font-size: 1.5rem">Zararli</p>
              </div>
              <div class="col-5" style="display: flex; align-items: center; flex-direction: column;">
                <p style="font-size: 1.9rem"> 120</p>
                
              </div>
            </div>
          </div>
          <div class="inner-div" style="height: 80%; margin: 2%; background-color: #2d9546;">
            <div class="row" style="background-color: transparent;  margin: 0 2%;">
              <div class="col-7" style="display: flex; align-items: center; flex-direction: column;">
                <p style="font-size: 1.5rem">Yaxshi</p>
              </div>
              <div class="col-5" style="display: flex; align-items: center; flex-direction: column;">
                <p style="font-size: 1.9rem"> 60 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-4 chart-container">
      <Line v-if="loaded" :data="dataTemperature" :options="chartOptions" />
    </div>

    <div class="col-4 chart-container">
      <Line v-if="loaded" :data="dataHumidity" :options="chartOptions" />
    </div>

    <div class="col-4 mobileMap" style="display: flex; flex-direction: column; align-items: center" @click="goToZones()">
      <img class="mapclass" src="../assets/andijan-map-1.png" alt="" height="160vh">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
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
  name: 'MaxDustZoneCharts',
  components: { Line,  },
  data() {
    return {
      lastTemperature: '',
      lastDustLevel: '',
      lastHumidity: '',
      currentDustState: '',
      currentTemperatureState: '',
      currentHumidityState: '',
      loaded: false,
      mostDustyZoneName: '',
      numberOfActiveZones: 0,
      numberOfPassiveZones: 0,

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
    };
  },

  methods: {
    goToZones(){
      location.replace('/zones');
    }
  },




  async mounted() {
    this.loaded = false;
    try {
      const { data } = await axios.get('/parameter/max-dust');
      this.dataDust.labels = data.createdAt;
      this.dataDust.datasets[0].data = data.pm2_5;
      this.dataTemperature.labels = data.createdAt;
      this.dataTemperature.datasets[0].data = data.temperatures;
      this.dataHumidity.labels = data.createdAt;
      this.dataHumidity.datasets[0].data = data.humidities;
      this.mostDustyZoneName = data.zoneName;
      this.lastTemperature = data.temperatures[data.temperatures.length-1]
      this.lastDustLevel = data.pm2_5[data.pm2_5.length-1]
      this.lastHumidity = data.humidities[data.humidities.length-1]

      // Categorize the current dust state
      if(this.lastDustLevel <= 60){
        this.currentDustState = 'Yaxshi'
      } else if(this.lastDustLevel >= 60 && this.lastDustLevel <= 120){
        this.currentDustState = 'Zararli'
      } else if(this.lastDustLevel >= 120){
        this.currentDustState = 'Xavfli'
      } else {
        this.currentDustState = 'Noma\'lum'
      }

      // Categorize the current temperature state
      if(this.lastTemperature <= 0){
        this.currentTemperatureState = 'Juda sovuq'
      } else if(this.lastTemperature > 0 && this.lastDustLevel <= 10){
        this.currentTemperatureState = 'Sovuq'
      } else if(this.lastTemperature > 10 && this.lastTemperature <= 15){
        this.currentTemperatureState = 'Salqin'
      } else if(this.lastTemperature >= 15 && this.lastTemperature <= 26){
        this.currentTemperatureState = 'Iliq'
      } else if(this.lastTemperature > 26 && this.lastTemperature <= 35){
        this.currentTemperatureState = 'Issiq'
      } else if(this.lastTemperature > 35){
        this.currentTemperatureState = 'Juda issiq'
      } else {
        this.currentTemperatureState = 'Noma\'lum'
      }

      // Categorize the current humidity state
      if(this.lastHumidity >= 0 && this.lastHumidity < 20){
        this.currentHumidityState = 'Juda quruq'
      } else if(this.lastHumidity >= 20 && this.lastHumidity <= 40){
        this.currentHumidityState = 'Quruq'
      } else if(this.lastHumidity >= 40 && this.lastHumidity <= 60){
        this.currentHumidityState = 'Qulay'
      } else if(this.lastHumidity >= 60 && this.lastHumidity <= 80){
        this.currentHumidityState = 'Nam'
      } else if(this.lastHumidity >= 80 && this.lastHumidity <= 100){
        this.currentHumidityState = 'Juda nam'
      } else {
        this.currentHumidityState = 'Noma\'lum'
      }
      console.log(this.currentHumidityState)


      //Send to most dusty zone name to dashboard component
      this.$emit('badZone', this.mostDustyZoneName)


      // Fetch all the zones together with last dust values on each 
      const zoneStatus = await axios.get('/zone/conditions')

      // Calculate the number of active and passive zones
      for(const element in zoneStatus.data.zonesDict){
        if(parseInt(zoneStatus.data.zonesDict[element])){
          this.numberOfActiveZones++;
        } else {
          this.numberOfPassiveZones++
        }
      }

      // Toggle the flag to true to start the charts rendering
      this.loaded = true;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
};
</script>

<style scoped>
/* Add custom styles for dark background */
.row {
  background-color: #2c3e50; /* Dark background for the row */
  border-radius: 8px;
}

.chart-container {
  border-radius: 8px;
  background-color: #2c3e50; /* Ensure the background inside the border is also dark */
  margin: 0px; /* Add margin to create gap between each chart */
  padding: 3px;
}

h3 {
  color: white; /* White text for the title */
}

.inner-div {
  color: white;
}

.second-row-cards {
    background-color: transparent;
    backdrop-filter:blur(10px) brightness(80%) contrast(90%);
    min-height: 25vh;
    margin-bottom: 2%;
    transition: transform .2s;
}

.second-row-cards:hover{
  transform: scale(1.05);
}

.mapclass{
  transition: transform .2s;
}

.mapclass:hover{
    cursor:pointer;
    transform: scale(1.1);
  }
  @media only screen and (max-width: 740px) {
  /* For mobile phones: */
  [class*="col-"] {
    width: 50%;
  }
  .col-9 {
    width: 100% !important;
  }
  .mobileMap{
    margin-left: 20vw;
  }
  .mobileNone{
    display: none;
  }

}
  
</style>
