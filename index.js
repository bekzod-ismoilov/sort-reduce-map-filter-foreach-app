const main = document.querySelector("#main");
const addUserBtn = document.querySelector("#addUser");
const doubleBtn = document.querySelector("#double");
const showMillioniersBtn = document.querySelector("#showMillioners");
const sortBtn = document.querySelector("#sort");
const calcWealthBtn = document.querySelector("#calcWealth");

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

let data = [];

//fetch data
async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api/");
    const data = await res.json();
    // console.log(data);

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser)
}

function addData(object) {
    data.push(object);

    updateDOM();
}

function updateDOM(providedData = data) {
    main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;
    providedData.forEach(item => {
        const elem = document.createElement("div");
        elem.classList.add('person');
        elem.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)} $`;
        main.appendChild(elem);
    })
}


//formatting number to money
function formatMoney(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//double money
function doubleMoney() {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 }
    });
    updateDOM();
}


//showMillioniers
function showMillioniers() {
    data = data.filter((user) => {
        return user.money > 1000000
    });

    updateDOM();
}


//sort richest
function sortRichest() {
    data = data.sort((a, b) => {
        return b.money - a.money
    });
    updateDOM();
}


//calculate wealth

function calcWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthEl = document.createElement("div");
    wealthEl.innerHTML = `<br><br><h2>Total Wealth: ${formatMoney(wealth)} $</h2>`;
    main.appendChild(wealthEl);
}


//event listener
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
showMillioniersBtn.addEventListener("click", showMillioniers);
sortBtn.addEventListener("click", sortRichest);
calcWealthBtn.addEventListener("click", calcWealth);