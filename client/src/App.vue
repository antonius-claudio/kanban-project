<template>
  <div>
    <div class="row" v-if="isLogin === false">
        <div class="col s3 offset-s4 martop">
            <div class="opening formR">
                <form @submit.prevent="loginForm"  v-if="isNew === false">
                    <h4>Login</h4>
                    <div class="input-field col s12">
                        <input type="text" placeholder="email" v-model="emailLogin">
                    </div>
                    <div class="input-field col s12">
                        <input type="password" placeholder="password" v-model="passwordLogin">
                    </div>
                    <div class="col s12 colBtn">
                        <div class="input-field col s6">
                            <button type="submit" class="btn">login</button>
                        </div>
                        <div class="input-field col s6">
                            <a @click.prevent="handleClickSignIn" v-if="!isSignIn" :disabled="!isInit" class="goog">login with <i class="fab fa-google-plus-g"></i></a>
                            <button @click.prevent="handleClickSignOut" v-if="isSignIn" :disabled="!isInit">signout</button>
                        </div>
                    </div>
                    <div>
                        <div v-on:click="loadFormRegister">
                            Don't have account?
                        </div>
                    </div>
                </form>
                <form @submit.prevent="registerForm"  v-else-if="isNew === true">
                    <h4>Register</h4>
                    <div class="input-field col s12">
                        <input type="text" placeholder="name" v-model="nameRegister">
                    </div>
                    <div class="input-field col s12">
                        <input type="text" placeholder="email" v-model="emailRegister">
                    </div>
                    <div class="input-field col s12">
                        <input type="password" placeholder="password" v-model="passwordRegister">
                    </div>
                    <div class="input-field col s12">
                        <button type="submit" class="btn">register</button>
                    </div>
                    <div>
                        <div v-on:click="loadFormRegister">
                            Already have account?
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="content" v-else>
        <nav>
            <div class="nav-wrapper">
                <a href="#" class="brand-logo"><img src="../assets/logo.png" alt=""></a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li @click.prevent="handleClickSignOut">Logout</li>
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
            @itemRemove="removeItem"
            @itemUpdate="updateItem">
            </TaskList>
        </div>
    </div>
  </div>
</template>

<script>
import TaskList from './components/TaskList';
import { url } from './utils.js';
import io from 'socket.io-client';

let socket = io(url);
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      tasks: [],
      showDiv: false,
      isInit: false,
      isSignIn: false
    };
  },
  methods: {
        handleClickSignIn(){
            console.log('-----methods handleClickSignIn----')
            this.$gAuth.signIn()
            .then(user => {
                // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
                this.isSignIn = this.$gAuth.isAuthorized
                let token = user.getAuthResponse().id_token;
                axios({
                    url: url + '/googleSignIn',
                    method: 'POST',
                    data: {
                        idToken: token
                    }
                })
                .then((response) => {
                    this.isLogin = !this.isLogin;
                    this.UserId = response.data.id;
                    localStorage.setItem('access_token', response.data.access_token);
                    localStorage.setItem('id', response.data.id);
                    localStorage.setItem('name', response.data.name);
                    this.getTasks();
                })
                .catch((err) => {
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
                });
            })
            .catch(error  => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed connect to google',
                    showClass: {
                      popup: 'animated fadeInDown faster'
                    },
                    hideClass: {
                      popup: 'animated fadeOutUp faster'
                    }
                })
            })
        },
        handleClickSignOut(){
            console.log('-----methods handleClickSignOut----')
            this.$gAuth.signOut()
            .then(() => {
                // On success do something
                this.isSignIn = this.$gAuth.isAuthorized
                localStorage.removeItem('access_token');
                localStorage.removeItem('id');
                localStorage.removeItem('name');
                this.isLogin = !this.isLogin;
                this.UserId = null;
                this.emailLogin = '';
                this.passwordLogin = '';
                this.nameRegister = '';
                this.emailRegister = '';
                this.passwordRegister = '';
                this.categories = ['Backlog', 'Todo', 'Done', 'Completed'];
                this.tasks = [];
            })
            .catch(error  => {
                // On fail do something
            })
        },
        loginForm: function () {
            console.log('-----methods loginForm----')
            axios({
                url: url+'/login',
                method: 'POST',
                data: {
                    email: this.emailLogin,
                    password: this.passwordLogin
                }
            })
            .then((response) => {
                this.isLogin = !this.isLogin;
                this.UserId = response.data.id;
                this.emailLogin = '';
                this.passwordLogin = '';
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('name', response.data.name);
                this.getTasks();
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
            console.log('-----methods registerForm----')
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
                this.isLogin = !this.isLogin;
                this.nameRegister = '';
                this.emailRegister = '';
                this.passwordRegister = '';
                this.UserId = response.data.id;
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('name', response.data.name);
                this.getTasks();
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
        getTasks: function () {
            console.log('-----methods getTasks----')
            axios({
                url: url + '/tasks',
                method: 'GET',
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then((response) => {
                this.tasks = response.data;
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'failed to get data from server',
                    showClass: {
                      popup: 'animated fadeInDown faster'
                    },
                    hideClass: {
                      popup: 'animated fadeOutUp faster'
                    }
                })
            });
        },
        addedTask: function(payload) {
            console.log('-----methods addedTask----')
            this.tasks.push(payload);
            socket.emit('createTask', payload);
        },
        loadFormRegister: function(){
            console.log('-----methods loadFormRegister----')
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
            socket.emit('deleteTask', payload);
        },
        updateItem: function(payload) {
            this.tasks.forEach(i => {
                if(i.id === payload.id) {
                  i.title = payload.title;
                  i.category = payload.category;
                }
            })
            socket.emit('updateTask', payload);
        }
    },
    beforeCreate() {
        console.log('-----before create----')
    },
    created() {
        console.log('-----created----')
        // this.getTaks();
        if (localStorage.getItem('access_token')) {
            this.isLogin = !this.isLogin;
            this.UserId = localStorage.getItem('id');
            this.getTasks();

            socket.on('createTask', (payload) => {
                console.log('ini dari user sebelah', payload);
                this.tasks.push(payload);
            })

            socket.on('deleteTask', (id) => {
                console.log('ini dari user sebelah', id);
                let temp = null;
                this.tasks.forEach((i, index) => {
                    if(i.id === id) {
                        temp = index;
                    }
                });
                this.tasks.splice(temp, 1);
            })

            socket.on('updateTask', (payload) => {
                console.log('ini dari user sebelah', payload);
                this.tasks.forEach(i => {
                    if(i.id === payload.id) {
                        i.title = payload.title;
                        i.category = payload.category;
                    }
                })
            })
        }
        
    },
    beforeMount() {
        console.log('-----before mount----')
    },
    mounted() {
        console.log('----- mount----')
        let that = this
        let checkGauthLoad = setInterval(function(){
        that.isInit = that.$gAuth.isInit
        that.isSignIn = that.$gAuth.isAuthorized
        if(that.isInit) clearInterval(checkGauthLoad)
        }, 1000);
    },
    beforeUpdate() {
        console.log('-----before update----')
    },
    updated() {
        console.log('-----updated----')
    },
    beforeDestroy() {
        console.log('-----before destroy----')
    },
    destroyed() {
        console.log('-----destroy----')
    },
    watch: {
        isLogin: function(val, oldVal) {
            console.log('-----watch isLogin----')
            if (localStorage.getItem('access_token')) {
                this.isLogin = true;
                this.getTasks();
            } else {
                this.isLogin = false;
            }
        },
        // tasks: function(val, oldVal) {
        //     console.log('-----watch tasks----')
        //     if(val !== oldVal) {
        //         socket.emit('changeTask', this.tasks);
        //     }
        // }
    }
};
</script>