const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// const dummyTransactions = [
//     { id: 1, text: 'Flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 200 },
//     { id: 3, text: 'Book', amount: 120 },
//     { id: 4, text: 'Camera', amount: 520 },
//     { id: 5, text: 'Pen', amount: 20 }
// ]

// let transaction = dummyTransactions;

const localStorageTransactions = JSON.parse(localStorage.getItem('transaction'));
let transaction = localStorage.getItem('transaction') !== null ? localStorageTransactions : [];

// add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert("Plz add a text and amount")
    } else {
        const transaction1 = {
            id: generateRandomNumber(),
            text: text.value,
            amount: +amount.value
        };
        transaction.push(transaction1);
        addTransactionDOM(transaction1);
        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

// generate random Id
function generateRandomNumber() {
    return Math.floor(Math.random() * 1000000)
}
// add transaction to DOM list
function addTransactionDOM(transaction) {
    // get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // add class based on value
    item.classList.add(transaction.amount > 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${(sign)}${Math.abs(transaction.amount)}<span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>`;

    list.appendChild(item)

}


// update the balance, income and expense
function updateValues() {
    const amounts = transaction.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
    console.log(total);

    const income = amounts.filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = amounts.filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0 * -1)
        .toFixed(2);

    balance.innerText = `${total}`;
    money_minus.innerText = `${expense}`
    money_plus.innerText = `${income}`
}

// remove transaction by id
function removeTransaction(id) {
    transaction = transaction.filter(transaction => transaction.id
        !== id);

    updateLocalStorage();

    init();
}

// update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transaction', JSON.stringify(transaction))
}

//init app
function init() {
    list.innerHTML = '';
    transaction.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction)