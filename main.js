import inputValidator from "./inputValidator.js";

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // Update Date and Time Function
    function updateDateTime() {
        const now = new Date();
        document.getElementById("date").innerText = now.toDateString();
        document.getElementById("time").innerText = now.toTimeString().substring(0, 8);
    }

    // Initial Date Time Update
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

window.onload = function () {
    console.log(localStorage.getItem("session"));
    document.getElementById("output").innerHTML = localStorage.getItem("session");
}

const mainForm = document.querySelector('input[value="Check"]');
mainForm.addEventListener('click', function (e) {
    // default action is to send the form data to the server and reload the page
    // by calling .preventDefault() i am stopping the browser from doing this, 
    // which allows me to handle the form submission programmatically in your JavaScript code instead.
    e.preventDefault();

    const xElement = document.querySelector('input[name="x"]:checked');
    const yElement = document.querySelector('#y');
    const rElement = document.querySelector('input[name="r"]:checked');
    if (xElement && yElement && rElement) {
        const xVal = parseFloat(xElement.value);
        const yVal = parseFloat(yElement.value.substring(0, 8));
        const rVal = parseFloat(rElement.value);
        console.log(`X: ${xVal}, Y: ${yVal}, R: ${rVal}`);

        let validator = new inputValidator();
        validator.validate(xVal, yVal, rVal);

        if (validator.getResponseCode() === 1) {
            console.log(`OK`);

            fetch(`./script.php?xVal=${xVal}&yVal=${yVal}&rVal=${rVal}`, {
                method: 'GET',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Server responded with bad getaway status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(function (serverAnswer) {
                    localStorage.setItem("session", serverAnswer);
                    document.getElementById("output").innerHTML = serverAnswer;
                })
                .catch(error => {
                    alert(`There was an error processing your request: ${error.message}`)
                })
        } else {

            Toastify({
                text: validator.getMessage(),
                className: "info",
                style: {
                    color: "black",
                    background: "white",
                    borderRadius: "8px",
                    width: "33.33%", 
                    height: "auto"                
                },
                offset: {
                    x: 0,
                    y: 0
                },
                position: "right",
            }).showToast();
        }
    } else {
        Toastify({
            text: "You should fill the form before submitting it :)",
            className: "info",
            style: {
                color: "black",
                background: "white",
                borderRadius: "8px",
                width: "33.33%", 
                height: "auto"                
            },
            offset: {
                x: 0,
                y: 0
            },
            position: "right",
        }).showToast();
    }
});


