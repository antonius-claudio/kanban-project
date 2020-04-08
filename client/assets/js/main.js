// const url = "https://lit-dawn-18982.herokuapp.com";
// const url = "http://localhost:3000";
  
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        categories: ['Backlog', 'Todo', 'Done', 'Completed'],
        tasks: [
            {
                id:1,
                title:'ikan',
                category: 'Backlog',
                user: 'anto1',
                createdAt: '2020-04-19',
                isOwner: true
            }, {
                id:2,
                title:'ikan2',
                category: 'Todo',
                user: 'anto2',
                createdAt: '2020-04-21',
                isOwner: false
            }, {
                id:3,
                title:'ikan3',
                category: 'Done',
                user: 'anto3',
                createdAt: '2020-04-22',
                isOwner: true
            }, {
                id:4,
                title:'ikan4',
                category: 'Completed',
                user: 'anto4',
                createdAt: '2020-04-23',
                isOwner: false
            }
        ]
    },
    methods: {
        deleteTask: function (id) {
            let temp = null;
            this.tasks.forEach((i, index) => {
                if(i.id === id) {
                    temp = index;
                }
            });
            this.tasks.splice(temp, 1);
        },
        onSignIn: function (googleUser) {
            console.log('masuk')
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
            let idToken = googleUser.getAuthResponse().id_token;
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
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
            });
        }
    }
})