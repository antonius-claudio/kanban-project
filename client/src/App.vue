<template>
  <div class="row" v-if="isLogin === false">
      <div class="col s3 offset-s4">
          <div class="opening">
              <form @submit.prevent="loginForm"  v-if="isNew === false">
                  <h4>Login</h4>
                  <div class="input-field col s12">
                      <input type="text" placeholder="email" v-model="emailLogin">
                      <label>Email</label>
                  </div>
                  <div class="input-field col s12">
                      <input type="password" placeholder="password" v-model="passwordLogin">
                      <label>Password</label>
                  </div>
                  <div class="input-field col s6">
                      <button type="submit" class="btn">login</button>
                  </div>
                  <div class="input-field col s6">
                      <div class="g-signin2" v-on:click="googleSign(onSignIn)" data-onsuccess="onSignIn"></div>
                  </div>
                  <div v-on:click="loadFormRegister">
                      Don't have account?
                  </div>
              </form>
              <form @submit.prevent="registerForm"  v-else-if="isNew === true">
                  <h4>Register</h4>
                  <div class="input-field col s12">
                      <input type="text" placeholder="name" v-model="nameRegister">
                      <label>Name</label>
                  </div>
                  <div class="input-field col s12">
                      <input type="text" placeholder="email" v-model="emailRegister">
                      <label>Email</label>
                  </div>
                  <div class="input-field col s12">
                      <input type="password" placeholder="password" v-model="passwordRegister">
                      <label>Password</label>
                  </div>
                  <div class="input-field col s6">
                      <button type="submit" class="btn">register</button>
                  </div>
                  <div class="input-field col s6">
                      <div class="g-signin2" v-on:click="googleSign(onSignIn)" data-onsuccess="onSignIn"></div>
                  </div>
                  <div v-on:click="loadFormRegister">
                      Already have account?
                  </div>
              </form>
          </div>
      </div>
  </div>

  <div class="content" v-else-if="isLogin === true">
      <nav>
          <div class="nav-wrapper">
              <a href="#" class="brand-logo"><img src="../assets/logo.png" alt=""></a>
              <ul id="nav-mobile" class="right hide-on-med-and-down">
                  <li v-on:click="btnLogout">Logout</li>
              </ul>
          </div>
      </nav>
      <div class="container">
          <TaskList v-for="category in categories" 
          :key="category" 
          :category="category" 
          :UserId="UserId" 
          :tasks="tasks" 
          @itemFromNewTask="addedTask"
          @itemRemove="removeItem">
          </TaskList>
      </div>
  </div>
</template>

<script>
import TaskList from './components/TaskList';
import { url } from './utils.js';
export default {
  name: "App",
  components: {
    TaskList
  },
  data() {
    return {
      isLogin: false,
      isNew: false,
      UserId: null,
      emailLogin: '',
      passwordLogin: '',
      nameRegister: '',
      emailRegister: '',
      passwordRegister: '',
      categories: ['Backlog', 'Todo', 'Done', 'Completed'],
      tasks: [],
      showDiv: false
    };
  },
  methods: {
        loginForm: function () {
            axios({
                url: url+'/login',
                method: 'POST',
                data: {
                    email: this.emailLogin,
                    password: this.passwordLogin
                }
            })
            .then((response) => {
                this.isLogin = true;
                this.UserId = response.data.id;
                this.emailLogin = '';
                this.passwordLogin = '';
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('name', response.data.name);
                this.getTaks();
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                    showClass: {
                      popup: 'animated fadeInDown faster'
                    },
                    hideClass: {
                      popup: 'animated fadeOutUp faster'
                    }
                })
            })
        },
        registerForm: function () {
            axios({
                url: url + '/register',
                method: 'POST',
                data: {
                    name: this.nameRegister,
                    email: this.emailRegister,
                    password: this.passwordRegister
                }
            })
            .then((response) => {
                this.isLogin = true;
                this.emailRegister = '';
                this.emailRegister = '';
                this.passwordRegister = '';
                this.UserId = response.data.id;
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('name', response.data.name);
                this.getTaks();
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                    showClass: {
                      popup: 'animated fadeInDown faster'
                    },
                    hideClass: {
                      popup: 'animated fadeOutUp faster'
                    }
                })
            })
        },
        getTaks: function () {
          console.log(localStorage.getItem('access_token'))
            axios({
                url: url + '/tasks',
                method: 'GET',
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then((response) => {
                this.tasks = response.data;
                // console.log('berhasil:', this.tasks);
                console.log('masuk task', this.tasks)
            })
            .catch((err) => {
                console.log('gagal:', err.response.data);
            });
        },
        addedTask: function(payload) {
          this.tasks.push(payload);
        },
        googleSign: function onSignIn (googleUser) {
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
            let idToken = googleUser.getAuthResponse().id_token;
            console.log('sampai sini');
            $.ajax({
                url: url+'/googleSignIn',
                method: 'POST',
                data: {
                    idToken
                }
            })
            .done((result) => {
                console.log('berhasil');
                console.log(result);
            })
            .fail((err) => {
                console.log(err);
            })
        },
        btnLogout: function () {
            console.log('User masuk log out.');
            this.isLogin = false;
            localStorage.removeItem('access_token');
            localStorage.removeItem('id');
            localStorage.removeItem('name');
            this.UserId = null;
            this.emailLogin = '';
            this.passwordLogin = '';
            this.nameRegister = '';
            this.emailRegister = '';
            this.passwordRegister = '';
            this.categories = ['Backlog', 'Todo', 'Done', 'Completed'];
            this.tasks = null;
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
            });
        },
        loadFormRegister: function(){
            console.log('sini')
            this.isNew = !this.isNew;
        },
        removeItem: function(payload) {
          let temp = null;
          this.tasks.forEach((i, index) => {
              if(i.id === payload) {
                  temp = index;
              }
          });
          this.tasks.splice(temp, 1);
        }
    },
    created() {
        // this.getTaks();
        if (localStorage.getItem('access_token')) {
          console.log('masuk create app')
            this.isLogin = true;
            this.UserId = localStorage.getItem('id');
            this.getTaks();
        }
    },
    computed: {
        
    },
    watch: {
        isLogin: function(val, oldVal) {
            if (localStorage.getItem('id')) {
                console.log('masuk refresh')
                isLogin = true;
                this.getTaks();
            } else {
                console.log('masuk gagal refresh')
                isLogin = false;
            }
        }
    }
};
</script>