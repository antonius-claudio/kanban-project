const url = "https://lit-dawn-18982.herokuapp.com" || "http://localhost:3000";
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