import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js"

import "bootstrap"




// axios.defaults.baseURL = 'http://localhost:3000/api/v1'
axios.defaults.baseURL = 'https://backend.helptech.uz/api/v1'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

const app = createApp(App)
app.use(router)
app.mount('#app')
