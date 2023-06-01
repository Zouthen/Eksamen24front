console.log("jeg er i sailboatpointsform.js")
let addpointsbutton = document.getElementById("submit-btn-points")
addpointsbutton.addEventListener('click',
    function () {
        let boatid = document.getElementById("boatid").value
        let points = document.getElementById("points").value
        console.log(boatid)
        console.log(points)
        restAddPointsToSailboat(boatid, points)
    })
async function restAddPointsToSailboat(boatid, points) {
    const url = "http://localhost:8080/addPointsToSailboat/" + boatid + "/" + points;
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
        console.log("Add points to sailboat failed");
        alert("One or more of the values are not valid")
    }
    return response;
}