let addbutton = document.getElementById("submit-btn-addToRace")
addbutton.addEventListener('click',
    function () {
        let raceid = document.getElementById("raceID").value
        let boatid = document.getElementById("boatid").value
        console.log(raceid)
        console.log(boatid)
        restAddSailboatToRace(raceid, boatid)
})
async function restAddSailboatToRace(raceid, boatid) {
    const url = "http://localhost:8080/addSailboatToRace/" + raceid + "/" + boatid;
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
        console.log("Add to race failed");
        alert("One or more of the ID's are not valid")
    }
    //actionFetchSailboatsAdded()
    return response;
}



















/*
const urlPostSailboat = 'http://localhost:8080/sailboat'

console.log("jeg er i addSailboatToRaceform");
document.addEventListener('DOMContentLoaded', createFormEventListener);
let formAddToRace;

function createFormEventListener(){
    formAddToRace = document.getElementById("addToRace-form");
    formAddToRace.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    //Vi handler submitten her i stedet for default html behaviour
    event.preventDefault();
    id = document.getElementById("boatid").value
    const formData = new FormData(formAddToRace);
    formData.get("sailboatId")
    console.log("vi er i handleFormSubmit sailboat")
    console.log(formData);
    const jsonToPost = convertFormDataToJson(formData)
    console.log(jsonToPost)
    try {
        const responseData = await postFormDataAsJson("http://localhost:8080/", jsonToPost);
        console.log(responseData)
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


 */

