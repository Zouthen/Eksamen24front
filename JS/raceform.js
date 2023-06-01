const urlPostRace = 'http://localhost:8080/race'

console.log("jeg er i raceform");
document.addEventListener('DOMContentLoaded', createFormEventListener);
let formRace;

function createFormEventListener(){
    formRace = document.getElementById("race-form");
    formRace.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    //Vi handler submitten her i stedet for default html behaviour
    event.preventDefault();
    const formData = new FormData(formRace);
    console.log("vi er i handleFormSubmit race")
    console.log(formData);
    const jsonToPost = convertFormDataToJson(formData)
    console.log(jsonToPost)
    try {
        const responseData = await postFormDataAsJson(urlPostRace, jsonToPost);
        console.log(responseData)
        //her kan man indsæt nyt product i tabellen
        actionFetchRaces()
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

function convertFormDataToJson(formData) {
    // laver formData til JSON
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString);
    return formDataJsonString
}

async function postFormDataAsJson(url, jsonToSend) {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonToSend,
    };
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        console.log("fejl i postFormDataAsJson")
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
}


let addAllButton = document.getElementById("createAllRaces")
addAllButton.addEventListener('click', restCreateAllRaces)
async function restCreateAllRaces() {
    const url = "http://localhost:8080/createAllRaces";
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: ""
    }
    //calls backend and wait for return
    const response = await fetch(url, fetchOptions);
    console.log(response);
    if (!response.ok) {
        console.log("Delete failed");
    }
    actionFetchSailboats()
    return response;
}