// Race table

const urlGetRaces = 'http://localhost:8080/races'
const tableRace = document.getElementById('race-list')

async function createRaceTable(race) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${race.id}</td>  
      <td>${race.raceNumber}</td>  
      <td>${race.boattype}</td>
    `;

    tableRace.appendChild(row);

    //Delete
    cell = row.insertCell(3)
    let pbDelete = document.createElement("button")
    pbDelete.textContent = "Delete"
    pbDelete.className = "btn btn-primary"
    pbDelete.addEventListener('click', function () {
        restDeleteRace(race)
    })
    cell.appendChild(pbDelete)

}

let lstRaces = []
async function actionFetchRaces() {
    lstRaces = await fetchAny(urlGetRaces);
    tableRace.innerHTML = '';
    lstRaces.forEach(createRaceTable)
}

function loadRacesDelay() {
    setTimeout(() => {
        actionFetchRaces();
    }, 3500);
}
loadRacesDelay()

async function restDeleteRace(race) {
    const url = "http://localhost:8080/race/" + race.id;
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
    actionFetchRaces()
    return response;
}

// Sailboat table

const urlGetSailboats = 'http://localhost:8080/sailboats'
const tableSailboat = document.getElementById('sailboat-list')

async function createSailboatTable(sailboat) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${sailboat.id}</td>
      <td>${sailboat.boattype}</td>
      <td>${sailboat.points}</td>
    `;

    tableSailboat.appendChild(row);

    //Delete
    cell = row.insertCell(3)
    let pbDelete = document.createElement("button")
    pbDelete.textContent = "Delete"
    pbDelete.className = "btn btn-primary" /*buttondelete*/
    pbDelete.addEventListener('click', function () {

        restDeleteSailboat(sailboat)
    })
    cell.appendChild(pbDelete)

}

let lstSailboats = []

async function actionFetchSailboats() {
    lstSailboats = await fetchAny(urlGetSailboats);
    tableSailboat.innerHTML = '';
    lstSailboats.forEach(createSailboatTable)
}

actionFetchSailboats()


async function restDeleteSailboat(sailboat) {
    const url = "http://localhost:8080/sailboat/" + sailboat.id;
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
    actionFetchSailboats()
    return response;
}


// Races with sailboats table

const urlGetRacesWithSailboats = 'http://localhost:8080/racesWithSailboats'