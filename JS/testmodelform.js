const urlPostTestmodel = 'http://localhost:8080/testmodel'

console.log("jeg er i testmodelform");
document.addEventListener('DOMContentLoaded', createFormEventListener);
let formTestmodel;

function createFormEventListener(){
    formTestmodel = document.getElementById("testmodel-form");
    formTestmodel.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    //Vi handler submitten her i stedet for default html behaviour
    event.preventDefault();
    const formData = new FormData(formTestmodel);
    console.log("vi er i handleFormSubmit")
    console.log(formData);
    const jsonToPost = convertFormDataToJson(formData)
    console.log(jsonToPost)
    try {
        const responseData = await postFormDataAsJson(urlPostTestmodel, jsonToPost);
        console.log(responseData)
        //her kan man indsæt nyt product i tabellen
        actionFetchTestmodels()
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

/// fill table with testmodels

const urlGetTestmodels = 'http://localhost:8080/testmodels'
const tableTestmodel = document.getElementById('testmodel-list')

async function createTestmodelTable(testmodel) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${testmodel.id}</td>
      <td>${testmodel.name}</td>
      <td>${testmodel.age}</td>
      <td>${testmodel.email}</td>
    `;

    cell = row.insertCell(4)
    let pbUpdate = document.createElement("button")
    pbUpdate.textContent = "Opdater"
    pbUpdate.className = "buttonupdate"
    pbUpdate.addEventListener('click', function () {
        handleFormEdit(testmodel)
        const testid = testmodel.id
        printTest(testid, testmodel)
    })
    cell.appendChild(pbUpdate)
    tableTestmodel.appendChild(row);

    //Delete movie
    cell = row.insertCell(5)
    let pbDelete = document.createElement("button")
    pbDelete.textContent = "Delete"
    pbDelete.className = "btn btn-primary" /*buttondelete*/
    pbDelete.addEventListener('click', function () {

        restDeleteTestmodel(testmodel)
    })
    cell.appendChild(pbDelete)

}

let lstTestmodels = []
async function actionFetchTestmodels() {
    lstTestmodels = await fetchAny(urlGetTestmodels);
    tableTestmodel.innerHTML = '';
    lstTestmodels.forEach(createTestmodelTable)
}
actionFetchTestmodels()
function printTest(testid, testmodel) {
    console.log(testid)
    console.log(testmodel)
}

async function restDeleteTestmodel(testmodel) {
    const url = "http://localhost:8080/testmodel/" + testmodel.id;
    const fetchOptions = {
        method: "DELETE",
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
    actionFetchTestmodels()
    return response;
}

/*
edit forsøg 1

async function handleFormEdit() {
    const formData = new FormData(formTestmodel);
    console.log("vi er i handleFormEdit")
    console.log(formData);
    //const jsonToPost = convertFormDataToJson(formData)
    //console.log(jsonToPost)

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let email = document.getElementById("email").value;

    const testmodel = {
        name: name,
        age: age,
        email: email
    }

    try {
        const responseData = await postFormDataEdit(urlPostTestmodelEdit, testmodel);
        console.log(responseData)
        //her kan man indsæt nyt product i tabellen
        actionFetchTestmodels()
    } catch (error) {
        console.log("fejl i handleFormEdit")
        alert(error.message);
        console.error(error);
    }
}
*/
/*
edit forsøg 2

async function handleFormEdit(testmodel) {
    const formData = new FormData(formTestmodel);
    console.log("vi er i handleFormEdit")
    console.log(formData);
    const jsonToPost = convertFormDataToJson(formData)
    console.log(jsonToPost)
    try {
        const responseData = await postFormDataEdit("http://localhost:8080/editTestModel/" + testmodel.id, JSON.stringify(formData));
        console.log(responseData)
        //her kan man indsæt nyt product i tabellen
        actionFetchTestmodels()
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

async function postFormDataEdit(url, formData) {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors',
        body: formData
    };
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        console.log("fejl i postFormDataEdit")
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
}

 */
