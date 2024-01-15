<template>
    
    <section class="login-page">
        <article>
            <div class="form-container">
                <form @submit.prevent="submitLogin">
                    <h2>Log In</h2>
                    <p>
                        Enter your username and password to login
                    </p>
                    <div class="error-class">
                        <span v-for="error in errors" :key="error"> {{ error }} </span>
                    </div>
                    <div class="input-login">
                        <label>Username</label>
                        <inputTemplate type="text" :textHolder="'Username'" v-model:modelValueText="username"/>
                    </div>
                    <div class="input-login">
                        <label>Password</label>
                        <inputTemplate type="password" :textHolder="'Password'" v-model:modelValueText="password"/>
                        
                    </div>
                    <div class="submit-container">
                        <button type="submit" class="submit-login" :disabled="isLoginSubmit" :class="{'submit-login--loading' : (isLoginSubmit ? true : false) }">
                            Log in <login-icon/>
                        </button>
                    </div>
                    <div class="info-field">
                        <p>
                            Don't have an account? Request a signup <a href="#">here</a>
                        </p>
                    </div>
                </form>
            </div>

            <div class="logo-illustration">
                <!--<h1>
                    TKM viewBox="0 0 1190.55 841.89"
                </h1>-->
                <div class="svg-container">
                    <svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" style="enable-background:new 0 0 1000 1000;" xml:space="preserve" fill="none">
                    
                            <path class="st0" d="M435.72,685.08c0,75.49-0.64,150.99,0.42,226.47c0.29,20.42-7.2,28.98-28.83,33.91
				c-93.65,21.35-193.07-34.46-214.78-124.6c-5.44-22.58-15.85-31.11-39.41-36.39C23.92,755.5-27.92,617.32,53.67,519.72
				c12.66-15.15,14.02-23.49,0.68-39.16C-3.31,412.81,2.93,318.82,67.01,258.21c61.31-57.99,164.72-64.18,237.94-14.22
				c5.95,4.06,11.56,8.64,17.86,12.15c14.97,8.34,29.86,10.92,41.98-4.25c11.32-14.16,0.72-23.58-9.31-32.72
				c-37.66-34.3-83.39-53.24-135.44-57.68c-19.05-1.63-20.79-6.19-13.22-21.17c47.4-93.7,190.57-119.57,271.49-47.98
				c14.14,12.51,22.49,18.95,40.07,2.55c47.6-44.41,105.48-55.07,169.3-35.53c65.67,20.11,106.52,62.28,120.63,124.77
				c4.01,17.74,9.14,26.46,30.19,30.13c132.44,23.09,190.79,162.14,109.93,261.98c-14.15,17.47-16.57,28.03-0.81,46.8
				c56.58,67.42,48.65,158.84-16,219.58c-60.06,56.43-160.92,63.67-232.8,16.7c-8.62-5.63-16.88-11.77-25.81-16.92
				c-13.07-7.53-26.2-8.53-36.66,3.94c-10.64,12.69-5.49,23.9,5.7,33.63c36.46,31.73,78.85,53.3,129,57.32
				c27.45,2.2,29.67,10.54,17.31,30.69c-37.56,61.22-128.41,95.77-199.76,76.5c-19.67-5.31-27.25-14.46-27.18-33.3
				c0.56-151.95,0.62-303.9,0.14-455.84c-0.06-18.16,6.87-24.19,26.12-23.36c26.37,1.14,52.86,0.43,79.27-0.3
				c26.2-0.72,46.2-12.34,60.4-32.57c10.81-15.4,18.36-33.65,10.79-50.06c-7.6-16.47-28.27-7.53-42.87-7.81
				c-113.06-2.19-226.17,2.24-339.26-2.74c-54.52-2.4-88.59,22.35-96.93,65.94c-3.72,19.46,0.54,29.19,25.07,28.3
				c41.18-1.49,82.55,1.04,123.67-1.02c23.82-1.19,28.46,7.3,28.23,26.87C435.21,534.09,435.72,609.58,435.72,685.08z"/>
                        
                    </svg>
                    <!-- <img :src="logo"/> -->
                    <!--<div class="text-logo">
                        <p>Takafa Mindset</p>
                        <p>Happy people, better organizations</p>
                    </div>-->
                </div>
            </div>
        </article>
    </section>
</template>

<script>
import inputTemplate from '../../components/forms/inputs';
import takafaLogo from '@/assets/takafaOne.png';
//import authenticationService from '@/services/AuthService';
//import { useRoute } from 'vue-router';
export default {
    name : 'loginView',
    setup () {
        

    },
    data () {
        return {
            username : '',
            password : '',
            logo : takafaLogo,
            errors : [],
            isLoginSubmit : false
        }
    },
    components : {
        inputTemplate
    },
    computed : {
        url () {
            return this.$store.state.url
        }
    },
    methods : {
        validateForm() {
            this.errors = [];
            let error = false;
            if (this.username.trim() == "") {
                this.errors.push("Invalid username");
                error = true;
            }
            if(this.password.trim()== "") {
                this.errors.push("Invalid password");
                error = true
            }
            return error
        },

        async submitLogin() {
            if (!this.validateForm()) {
                //console.log("okay")
                const credentials = {
                    username : this.username,
                    password : this.password
                }
                this.isLoginSubmit = true;
                await this.$store.dispatch('signIn', credentials).then(res => {
                    console.log(res)
                    this.isLoginSubmit = false;
                    if (res.success) {
                        //console.log(res)
                        this.$router.push('/clients')

                    } else if (res.error) {
                        this.errors = [];
                        this.errors.push(res.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    
</style>