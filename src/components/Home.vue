<template>
    <div class="cover1" style="display: grid; max-width: 100vw; min-height: 80vh;">       
        <div class="row">
            <div class="col" style="border-right: 3px white solid; background: rgba(178, 153, 110, .6)
            ">
                
            </div>
            <div class="col" style="min-height: 80vh;">
                
            </div>
        </div>
        <div class="row">
            <div class="" style="flex-direction: column; margin-top: 16vh; text-align: center;">
                <p style="color: white; text-shadow: 1px 1px 10px black; font-weight: bold; font-size: 60px; font-family: Arial, Helvetica, sans-serif">
                    HAVO SIFATI <br> MONITORINGI
                </p>
            </div>
            
        </div> 
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            
        }
    },
    methods: {
        
    },

    created() {
        if (JSON.parse(localStorage.getItem('signedIn'))) {
            this.$router.push('/dashboard')
        }
    },
    
    
}
</script>
<style scoped>
.cover1{
    background-image: url('../assets/andijan3.jpg');
    background-size: 100%;
    background-repeat: no-repeat; 
    background-position: 0 -150px; 
}

.row{
    grid-area: 1 / 1;
    max-width: 99vw !important;
}

@media only screen and (max-width: 740px) {
    .cover1{
        background-position: 0 -50px;
        background-size: 160vh;
    }

}
</style>