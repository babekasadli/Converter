const currencyOne = document.querySelectorAll('#currency1');
const currencyTwo = document.querySelectorAll('#currency2');
const inputOne = document.querySelector('#input1');
const inputTwo = document.querySelector('#input2');
const exchangeOne = document.querySelector('#exchange1');
const exchangeTwo = document.querySelector('#exchange2');

let one = 'RUB';
let two = 'USD';
let sum = inputOne.value = 1;
let sumTwo = inputTwo.value;

currencyOne.forEach((currencyOne) => {
    if (currencyOne.innerText == one) {
        currencyOne.style.background = '#833AE0';
        currencyOne.style.color = '#FFFFFF';
    }
    currencyOne.addEventListener('click', clickButtonCurrencyOne);
});

currencyTwo.forEach((currencyTwo) => {
    if (currencyTwo.innerText == two) {
        currencyTwo.style.background = '#833AE0';
        currencyTwo.style.color = '#FFFFFF';
    }
    currencyTwo.addEventListener('click', clickButtonCurrencyTwo);
});

function clickButtonCurrencyOne(event) {
    currencyOne.forEach((currencyOne) => {
        if (currencyOne.style.background !== '') {
            currencyOne.style.background = '';
            currencyOne.style.color = '#C6C6C6';
        }
    });
    event.target.style.background = '#833AE0';
    event.target.style.color = '#FFFFFF';
    one = event.target.innerText;
    result();
}

function clickButtonCurrencyTwo(event) {
    currencyTwo.forEach((currencyTwo) => {
        if (currencyTwo.style.background !== '') {
            currencyTwo.style.background = '';
            currencyTwo.style.color = '#C6C6C6';
        }
    });
    event.target.style.background = '#833AE0';
    event.target.style.color = '#FFFFFF';
    two = event.target.innerText;
    result();
}

function result() {
    sum = inputOne.value.replace(/,/g, '.');
    sumTwo = inputTwo.value.replace(/,/g, '.');
    converter();
}

function converter() {
    let urlTwo = `https://api.exchangerate.host/convert?from=${one}&to=${two}&amount=1`;
    fetch(urlTwo)
        .then(res => res.json())
        .then(data => {
            exchangeOne.innerText = `1 ${one} = ${data.result.toFixed(4)} ${two}`;
        })
    let urlThree = `https://api.exchangerate.host/convert?from=${two}&to=${one}&amount=1`;
    fetch(urlThree)
        .then(res => res.json())
        .then(data => {
            exchangeTwo.innerText = `1 ${two} = ${data.result.toFixed(4)} ${one}`;
        })
    if (one == two) {
        inputTwo.value = inputOne.value.replace(/,/g, '.');
        return;
    } else {
        let url = `https://api.exchangerate.host/convert?from=${one}&to=${two}&amount=${sum}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (inputOne.value == '') {
                    inputTwo.value = '';
                } else {
                    inputTwo.value = data.result.toFixed(4);
                }
            })
            .catch((err) => {
                alert('Something went wrong!');
            })
    }
}
converter();