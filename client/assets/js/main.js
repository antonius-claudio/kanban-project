// const url = "https://lit-dawn-18982.herokuapp.com";
const url = "http://localhost:3000";

function onSignIn(googleUser) {
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
}

$('#btnLogout').click(() => {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
})
  
var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      categories: ['Backlog', 'Todo', 'Done', 'Completed'],
      tasks: [
            {
                id:1,
                title:'ikan',
                category: this.category[0],
                user: 'anto1',
                createdAt: '2020-04-19',
                isOwner: true
            },
            {
                id:2,
                title:'ikan2',
                category: this.category[1],
                user: 'anto2',
                createdAt: '2020-04-21',
                isOwner: false
            },
            {
                id:3,
                title:'ikan3',
                category: this.category[2],
                user: 'anto3',
                createdAt: '2020-04-22',
                isOwner: true
            },
            {
                id:4,
                title:'ikan4',
                category: this.category[3],
                user: 'anto4',
                createdAt: '2020-04-23',
                isOwner: false
            }
      ]
    }
})

$(document).ready(() => {
    console.log('aap')
    app;
    // console.log(url+'/')
    // $.ajax({
    //     url: url+'/',
    //     method: 'GET'
    // })
    // .done((result) => {
    //     $('#testData').append(`
    //         ${result.message}
    //     `);
    // })
    // .catch((err) => {
    //     M.toast({html: JSON.stringify(err)});
    // })
})