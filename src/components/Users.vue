<template>
    <div class="wrapper table-responsive">
        <div class="alert" v-if="this.alertFlag">
            <p style="color: white; font-size: larger; font-family: Verdana, Geneva, Tahoma, sans-serif">{{ this.alertMessage }}</p>
        </div>
        <h2 class="title">Tizimning barcha foydalanuvchilari jadvali</h2>
        <table class="table table-striped table-dark table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Ism</th>
                    <th scope="col">Familiya</th>
                    <th scope="col">Status</th>
                    <th scope="col" class="text-center">Boshqaruv</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <th>{{ index + 1 }}</th>
                    <td>{{ user.firstname }}</td>
                    <td>{{ user.lastname }}</td>
                    <td>{{ user.isAdmin }}</td>
                    <td>
                        <div class="row">
                            <div class="col button">
                                <button 
                                    type="button" 
                                    class="btn btn-primary" 
                                    @click="toggleAdminStatus(user)" 
                                    :class="{ 'btn-success': user.isAdmin === 'Oddiy' }"
                                >
                                    {{ user.isAdmin === 'Oddiy' ? 'Admin qilish' : 'Adminni bekor qilish' }}
                                </button>
                            </div>
                            <div class="col button">
                                <button type="button" class="btn btn-danger" @click="removeUser(user.id)">O'chirish</button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            alertFlag: false,
            alertMessage: '',
            users: [],
        };
    },
    methods: {
        async getAllUsers() {
            try {
                const response = await axios.get('/auth/all-users');
                this.users = response.data.users.map(user => ({
                    ...user,
                    isAdmin: user.isAdmin ? 'Admin' : 'Oddiy',
                }));
            } catch (error) {
                console.error(error);
            }
        },
        async toggleAdminStatus(user) {
            const url = user.isAdmin === 'Oddiy' 
                ? `/auth/makeadmin/user/${user.id}` 
                : `/auth/canceladmin/user/${user.id}`;

            try {
                const response = await axios.put(url);
                if (response.data.success) {
                    user.isAdmin = user.isAdmin === 'Oddiy' ? 'Admin' : 'Oddiy';
                }
            } catch (error) {
                this.alertFlag = true
                this.alertMessage = error.response.data.error
                console.error(error.response.data.error);
            }
        },
        async removeUser(id) {
            try {
                const response = await axios.delete(`/auth/delete/user/${id}`);
                if (response.data.success) {
                    this.users = this.users.filter(user => user.id !== id);
                }
            } catch (error) {
                this.alertFlag = true
                this.alertMessage = error.response.data.error
                console.error(error);
            }
        }
    },
    mounted() {
        this.getAllUsers();
    }
};
</script>

<style scoped>
.wrapper {
    min-height: 78vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-image: url("../assets/background-earth.png");
    background-size: cover;
    background-repeat: no-repeat;
}

table tr td, table tr th {
    backdrop-filter: blur(10px) brightness(150%) contrast(90%) !important;
}

table {
    width: 60vw;
    margin-top: 5vh;
}

.title {
    color: white;
    margin-top: 7vh;
}

.button {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.text-center {
    text-align: center;
}
.alert{
    background-color: rgba(255, 0, 0, 0.253);
    position:fixed;
    top:0;
    z-index:1000;
}

@media only screen and (max-width: 740px) {
  /* For mobile phones: */
  .button{
    margin-bottom: 10px;
  }

  h2{
    text-align: center;
  }
}
</style>
