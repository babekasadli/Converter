const currencyOne = document.querySelectorAll('#currency1'); /*left side buttons*/
const currencyTwo = document.querySelectorAll('#currency2'); /*right side buttons*/
const inputOne = document.querySelector('#input1'); /*left input*/
const inputTwo = document.querySelector('#input2'); /*right input*/
const exchangeOne = document.querySelector('#exchange1'); /*left exchange information*/
const exchangeTwo = document.querySelector('#exchange2'); /*right exchange information*/

let one = 'RUB';
let two = 'USD';
let sum = inputOne.value = 1;
let sumTwo = inputTwo.value;
let bool = true;

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

function result() { /*displaying result*/
    sum = inputOne.value;
    sumTwo = inputTwo.value;
    converter();
}

/* converter -------------*/

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
    if (bool == true && one == two) { /*if currencies are same, then there is no any error*/
        inputTwo.value = inputOne.value;
        return;
    }
    if (bool == false && two == one) { /*if currencies are same, then there is no any error*/
        inputOne.value = inputTwo.value;
        return;
    }
    if (bool == true) {
        let url = `https://api.exchangerate.host/convert?from=${one}&to=${two}&amount=${sum}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                inputTwo.value = data.result.toFixed(4);
            })
            .catch((err) => {
                alert('error!');
            })
    }
    if (bool == false) {
        let url = `https://api.exchangerate.host/convert?from=${two}&to=${one}&amount=${sumTwo}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                inputOne.value = data.result.toFixed(4);
            })
            .catch((err) => {
                alert('error!');
            })
    }
}
converter();

inputOne.addEventListener('click', rev);
inputTwo.addEventListener('click', revTwo);

function rev() {
    bool = true;
};

function revTwo() {
    bool = false;
};
