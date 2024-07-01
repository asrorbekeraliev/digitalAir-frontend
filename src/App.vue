<template>
  <nav>
    <Navbar/>
  </nav>
  <router-view/>
  <Footer></Footer>
  
</template>


<script>
import Navbar from './components/layouts/Navbar.vue'
import Footer from './components/layouts/footer/Footer.vue'
export default {
  components:{
    Navbar,
    Footer
  }
  
}
</script>

<style>

nav {
  font-size: large;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
