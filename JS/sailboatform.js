const urlPostSailboat = 'http://localhost:8080/sailboat'

console.log("jeg er i sailboatform");
document.addEventListener('DOMContentLoaded', createFormEventListener);
let formSailboat;

function createFormEventListener(){
    formSailboat = document.getElementById("sailboat-form");
    formSailboat.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(formSailboat);
    console.log("vi er i handleFormSubmit sailboat")
    console.log(formData);
    const jsonToPost = convertFormDataToJson(formData)
    console.log(jsonToPost)
    try {
        const responseData = await postFormDataAsJson(urlPostSailboat, jsonToPost);
        console.log(responseData)
        actionFetchSailboats()
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


