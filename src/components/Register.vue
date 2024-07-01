<template>
    <div class="home">
        <div style="display: flex; align-items: center; flex-direction: column; padding-top: 4vh;">
            <div class="quti" style="border-radius: 8px; width: 50vw; backdrop-filter:blur(10px) brightness(150%) contrast(90%);">
                <form @submit.prevent="submitHandler" class="row g-3" style="display: flex; align-items: center; flex-direction: column; padding: 9vh 0">
                    <div class="col-md-6">
                        <label for="firstname" class="form-label">Ism</label>
                        <input type="text" class="form-control" v-model="user.firstname" placeholder="Ismingizni kiriting:">
                    </div>
                    <div class="col-md-6">
                        <label for="lastname" class="form-label">Familiya</label>
                        <input type="text" class="form-control" id="lastname" v-model="user.lastname" placeholder="Familiyangizni kiriting: ">
                    </div>
                    <div class="col-md-6">
                        <label for="email" class="form-label">Elektron pochta</label>
                        <input type="email" class="form-control" id="email" v-model="user.email" placeholder="Elektron pochtangizni kiriting: ">
                    </div>
                    <div class="col-md-6">
                        <label for="password1" class="form-label">Parol</label>
                        <input type="password" class="form-control" id="password1" v-model="user.password1" placeholder="Yangi parol kiriting: ">
                    </div>
                    <div class="col-md-6">
                        <label for="password2" class="form-label">Parolingizni qayta kiriting</label>
                        <input type="password" class="form-control" id="password2" v-model="user.password2" placeholder="Parolingizni qayta kiriting">
                    </div>
                    <div class="col-md-6" style="display: flex; align-items: center; flex-direction: column">
                        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 2%">Ro'yxatdan o'tish</button>
                    </div>
                </form>
            </div>
        </div>
    </div>   

</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            user: {
                firstname: '',
                lastname: '',
                email: '',
                password1: '',
                password2: '',
            },
            response: null,
        }
    },
    methods: {
        async submitHandler(){
            const data = {
                firstname: this.user.firstname,
                lastname: this.user.lastname,
                email: this.user.email,
                password1: this.user.password1,
                password2: this.user.password2,  
            }
            const resp = await axios.post('/auth/register', data).catch(error => {
                console.error("There was an error!", error);
            })
            this.$router.push('/login')
            
        }
    }
}
</script>

<style scoped>
.home {
    margin-top: 0 !important;
    height: 100vh;
    width: 100%;
    background-image: url("../assets/background-earth.png");
    background-size: cover;
    background-repeat: no-repeat; 
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
      max-width: 50vw !important;
      backdrop-filter: blur(10px) brightness(150%) contrast(90%);
      padding-bottom: 3vh;
    }
    .quti{
        width: 80vw !important;
    }

    .col-md-6 {
        max-width: 60vw;
    }
  }
</style>