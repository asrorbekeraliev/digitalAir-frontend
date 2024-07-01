<template>
    <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body mobile-nav" data-bs-theme="dark" style="height: 10vh; z-index: 999;">
      <div class="container-fluid" style="margin: 0 50px">
        <a class="navbar-brand" href="/" v-if="!signedIn">AIR Monitoring</a>
        <a class="navbar-brand" href="/dashboard" v-if="signedIn">AIR Monitoring</a>
        <button class="navbar-toggler" type="button" @click="toggleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div :class="{'collapse': !isNavbarOpen, 'navbar-collapse': true, 'mobile': true}" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" style="margin: 0 30px;">
            <li class="nav-item">
              <router-link to="/dashboard" class="nav-link" v-if="signedIn">Asosiy</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link" v-if="signedIn">Tizim haqida</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/#" class="nav-link" v-if="!signedIn">Mahsulotlar</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/dashboard" class="nav-link">Aloqa</router-link>
            </li>
          </ul>         
          <button class="btn btn-outline-success mobile-chiqish" type="submit" v-if="signedIn" @click="logout()">Chiqish</button>
          <router-link to="/login" class="nav-link mobile-login" v-if="!signedIn"><button class="btn btn-outline-success" type="submit">Kirish</button></router-link>
          <router-link to="/register" class="nav-link mobile-register" v-if="!signedIn" style="color: azure; margin-left: 2%">Ro'yxatdan o'tish</router-link>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
    data() {
      return {
        signedIn: false,
        isNavbarOpen: false
      }
    },
    methods: {
      logout() {
        localStorage.clear();
        location.replace('/login');
        // this.$router.push('/login')
      },
      toggleNavbar() {
        this.isNavbarOpen = !this.isNavbarOpen;
      }
    },
    mounted() {
      this.signedIn = JSON.parse(localStorage.getItem('signedIn')) || false;
    }
  }
  </script>
  
  <style scoped>
   @media only screen and (max-width: 740px) {
      .mobile {
          margin-top: 3vh;
          background-color: rgb(51, 46, 46);
          border-radius: 10px;
      }
      .mobile-chiqish{
          margin-left: 5%;
          margin-bottom: 5%;
      }
      .mobile-login{
          margin-left: 5vw;
      }
      .mobile-register{
          margin: 5vw 0 5vw 5vw !important;
      }
      .mobile-nav{
          height: 15vh !important;
      }
   }
  </style>
   