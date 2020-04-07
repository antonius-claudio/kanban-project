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
  

$(document).ready(() => {
    console.log(url+'/')
    $.ajax({
        url: url+'/',
        method: 'GET'
    })
    .done((result) => {
        $('#testData').append(`
            ${result.message}
        `);
    })
    .catch((err) => {
        M.toast({html: JSON.stringify(err)});
    })
})