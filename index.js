const apiKey = "f3cabfe42c1edd3acdbf554d";

// fetch currency options

fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
.then((response) => response.json())
.then((data) => {
    const {supported_codes} = data;
    const selectElements = document.querySelectorAll("select");

    supported_codes.forEach((code) => {
        const optionElement = document.createElement("option");
        optionElement.value = code;
        optionElement.text = code;

        selectElements.forEach((select) => {
            select.appendChild(optionElement.cloneNode(true));
        });
    });
})

.catch ((error) => {
    console.log("Error fetching currency options:", error);
});

function convertCurrency() {
    const amountInput = document.getElementById("amountInput")
    const fromCurrency = document.getElementById("fromCurrency").value
    const toCurrency= document.getElementById("toCurrency").value
    const resultElement = document.getElementById ("result")


    fetch (`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`)
    .then(response => response.json())
    .then(data => {
        const {conversion_rate} = data;
        const convertedAmount = (amountInput.value * conversion_rate).toFixed(2);

        resultElement.innerHTML = `${amountInput.value} ${fromCurrency} = ${convertedAmount} ${toCurrency}`
    })
    .catch(error => {
        console.log("Error fetching exchange rate: error");
    })
}

const convertBtn = document.getElementById("convertBtn")
convertBtn.addEventListener("click", convertCurrency)