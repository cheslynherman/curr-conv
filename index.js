const apiKey = "f3cabfe42c1edd3acdbf554d";

// fetch currency options

fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
.then((response) => response.json()) // fetching the api data and then passing it as json
.then((data) => {
    const {supported_codes} = data;
    const selectElements = document.querySelectorAll("select");

    supported_codes.forEach((code) => {
        const optionElement = document.createElement("option");
        optionElement.value = code;
        optionElement.text = code;
        // creating option element in order to have codes live within that element .

        selectElements.forEach((select) => {
            select.appendChild(optionElement.cloneNode(true));

            // appending the child of the option element to the select parent 
        });
    });
})

.catch ((error) => {
    console.log("Error fetching currency options:", error);
    // if there is an error fetching the currency options then it will be logged into the console for the developer
});

function convertCurrency() {
    const amountInput = document.getElementById("amountInput")
    const fromCurrency = document.getElementById("fromCurrency").value
    const toCurrency= document.getElementById("toCurrency").value
    const resultElement = document.getElementById ("result")



    fetch (`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`)
    .then(response => response.json())
    // fetching the api data and then passing it as json
    .then(data => {
        const {conversion_rate} = data;
        const convertedAmount = (amountInput.value * conversion_rate).toFixed(2); 
        // our sum for when we converting the currecy
        resultElement.innerHTML = `${amountInput.value} ${fromCurrency} = ${convertedAmount} ${toCurrency}`
        // what we want displayed on the page after converting
    })
    .catch(error => {
        console.log("Error fetching exchange rate: error");
    })
}

const convertBtn = document.getElementById("convertBtn")
convertBtn.addEventListener("click", convertCurrency)