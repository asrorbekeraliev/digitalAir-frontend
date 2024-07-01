<template>
    <div v-if="loggedIn" class="container-fluid" style="min-height: 80vh; background-color: #2c3e51;">
      <div class="row">
        <div :class="sidebarStatus ? 'col-2 sidebarcontrol' : 'col-1 sidebarcontrol'" style="padding-left: 0;">
          <Sidebar v-if="sidebarStatus" />
          <button @click="toggleSidebar" type="button" class="btn btn-toggle" style="position: fixed; bottom: 10px;">
            <span v-if="sidebarStatus" class="icon-close">&Chi;</span>
            <span v-else class="icon-menu">&#9776;</span>
          </button>
        </div>
        <div :class="sidebarStatus ? 'col-10' : 'col-12'" style="padding-left: 10px; transition: all 0.3s ease; z-index: 55;">
          <MaxDustZoneCharts @badZone="getBadZone" />
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="text-center" style="min-height: 55vh; margin-top: 25vh;">Not authorized</h1>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Sidebar from './layouts/sidebar/Sidebar.vue';
  import MaxDustZoneCharts from './MaxDustZoneCharts.vue';
  
  export default {
    name: 'Dashboard',
    components: { Sidebar, MaxDustZoneCharts },
    data() {
      return {
        loggedIn: false,
        sidebarStatus: true,
        badZone: ''
      };
    },
    methods: {
      getBadZone(badZone) {
        this.badZone = badZone;
        console.log(badZone);
      },
      toggleSidebar() {
        this.sidebarStatus = !this.sidebarStatus;
      }
    },
    async mounted() {
      if (localStorage.getItem('token')) {
        this.loggedIn = true;
        try {
          const response = await axios.get('/auth/all-users', {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          });
          console.log(response);
        } catch (error) {
          if (error.response.data.error === 'jwt expired') {
            localStorage.clear();
            location.replace('/');
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .btn-toggle {
    backdrop-filter: blur(10px) brightness(60%) contrast(80%);
    color: white;
    z-index: 9999;
    position: fixed;
    bottom: 20px;
    left: 20px;
    background-color: rgba(0, 0, 0, 0.5); /* Dark translucent background */
    border: none;
    width: 60px;
    height: 40px; /* Rectangle shape */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s; /* Smooth transitions */
  }
  
  .btn-toggle:hover {
    background-color: rgba(159, 199, 228, 0.932); /* Darker on hover */
    transform: scale(1.1); /* Slightly larger on hover */
  }
  
  .icon-close, .icon-menu {
    font-size: 35px; /* Slightly larger icons */
  }
  
  .card {
    margin: auto;
  }
  
  .card-header, .card-body {
    text-align: center;
  }
  .badzone {
    font-size: xx-large;
  }
  
  h1 {
    color: white;
  }

  .second-row-cards {
    background-color: transparent;
    backdrop-filter:blur(10px) brightness(150%) contrast(90%);
    min-height: 30vh;
  }

@media only screen and (max-width: 740px) {
  /* For mobile phones: */
  .sidebarcontrol {
    width: 15vw;
    /* display: none; */
  }
}
  </style>
  