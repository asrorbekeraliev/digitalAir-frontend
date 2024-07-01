<template>
    <div class="home">
      <div v-if="showAlert" class="alert alert-danger alert-box" role="alert">
        {{ alertMessage }}
      </div>
      <div class="form-container">
       <h2 style="color: aliceblue;">
        {{ this.check }}
       </h2> 
        <div class="form-wrapper">
          <form @submit.prevent="submitHandler" class="form">
            <div class="form-group">
              <label for="inputEmail4" class="form-label">Elektron pochta</label>
              <input type="email" class="form-control" id="inputEmail4" v-model="email">
            </div>
            <div class="form-group">
              <label for="inputPassword4" class="form-label">Parol</label>
              <input type="password" class="form-control" id="inputPassword4" v-model="password">
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary submit-btn">Kirish</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        showAlert: false,
        alertMessage: '',
        check: ''
      };
    },
    methods: {
      async submitHandler() {
        const data = {
          email: this.email,
          password: this.password
        };

          await axios.post('/auth/login', data)
          .then((response) => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('firstname', response.data.user.firstname);
            localStorage.setItem('lastname', response.data.user.lastname);
            localStorage.setItem('email', response.data.user.email);
            localStorage.setItem('signedIn', true);
            location.replace('/dashboard');
          })
          .catch((error) => {
            console.log(error)
            this.showAlert = true;
            this.alertMessage = error.response.data.error || 'An error occurred!';
            this.hideAlertAfterDelay();
          })


        
      },
      hideAlertAfterDelay() {
        setTimeout(() => {
          this.showAlert = false;
        }, 5000); // 2000ms = 2 seconds
      }
    },
    mounted() {
      
    },
  };
  </script>
  
  <style scoped>
  .home {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    background-image: url("../assets/background-earth.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0 -150px; 
  }
  
  .alert-box {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 25vw;
    background-color: rgba(255, 0, 0, 0.37); /* Transparent red */
    border: red;
    border-radius: 8px;
    font-size: larger;
    text-align: center;
    color: white;
    z-index: 1000; /* Ensures the alert is on top */
  }
  
  .form-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 8vh;
  }
  
  .form-wrapper {
    border-radius: 8px;
    width: 45vw;
    backdrop-filter: blur(10px) brightness(150%) contrast(90%);
    padding-bottom: 3vh;
  }
  
  .form {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 10vh 0;
  }
  
  .form-group {
    width: 50%;
    margin-bottom: 3%;
  }
  
  .submit-btn {
    width: 100%;
    margin-top: 2%;
  }
  
  label {
    color: white;
  }

  @media only screen and (max-width: 740px) {
    .home {
      background-position: 0 0px !important; 
      background-size: cover !important;
    }

    .form-wrapper {
      border-radius: 8px;
      width: 85vw;
      backdrop-filter: blur(10px) brightness(150%) contrast(90%);
      padding-bottom: 3vh;
    }

    .form-group {
      width: 55vw;
    }
  }
  </style>
  