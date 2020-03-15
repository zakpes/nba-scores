
const request = new XMLHttpRequest();

request.open("GET", "https://jsonplaceholder.typicode.com/todos/1/users", true);
request.onload = function() {

    // console.log(request);
    

    let response = JSON.parse(request.responseText);
    
    console.log(response.forEach(user => {user.email;}));

    const userNames = response.forEach(user => {user.name});

    let htmlString = "";

    for (i = 0; i < response.length; i++) {
        console.log(response[i].name);

        htmlString += `<h2>${response[i].name}</h2><h3>${response[i].email}</h3>`;
        
    }

    document.querySelector(".users").innerHTML = htmlString;
    
};

request.send();

// function createCORSRequest(method, url) {

//     let xhr = new XMLHttpRequest();
//     if ("with credentials" in xhr) {
//         xhr.open(method, url, true);
//     } else {
//         xhr = null;
//     }
//     return xhr;
// }

// function makeCorsRequest() {

//     let url = "https://jsonplaceholder.typicode.com/todos/1";
//     let xhr = createCORSRequest("GET", url);
//     if (!xhr) {
//         alert("CORS not supported");
//         return;
//     }

//     xhr.onload = function() {
//         console.log(xhr.responseText);
        
//     }

//     xhr.send();
// }

// makeCorsRequest();








