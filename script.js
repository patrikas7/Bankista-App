'use strict';

// Static accounts for users
const account1 = {
    owner: 'Patrikas Voicechovksi',
    movements: [200,450,-400,3000,-650,-130,70,1300],
    interestRate: 1.2,
    pin: 1111,
    movementDates: [
        '2019-11-18T21:31:17.178Z',
        '2020-12-08T19:20:17.018Z',
        '2019-12-14T17:31:17.178Z',
        '2019-01-04T15:31:17.178Z',
        '2019-03-23T11:31:17.178Z',
        '2019-05-06T10:31:17.178Z',
        '2019-07-12T19:31:17.178Z',
        '2021-06-07T22:31:17.178Z',
    ],
    currency: 'EUR',
    locale: 'lt-LT'
};

const account2 = {
    owner: 'Lebron James',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementDates: [
        '2019-11-18T21:31:17.178Z',
        '2020-12-08T19:20:17.018Z',
        '2019-12-14T17:31:17.178Z',
        '2019-01-04T15:31:17.178Z',
        '2019-03-23T11:31:17.178Z',
        '2019-05-06T10:31:17.178Z',
        '2019-07-12T19:31:17.178Z',
        '2019-08-07T22:31:17.178Z',
    ],
    currency: 'USD',
    locale: 'en-US'
};

const account3 = {
    owner: 'Kazkas Kazkas',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    movementDates: [
        '2019-11-18T21:31:17.178Z',
        '2020-12-08T19:20:17.018Z',
        '2019-12-14T17:31:17.178Z',
        '2019-01-04T15:31:17.178Z',
        '2019-03-23T11:31:17.178Z',
        '2019-05-06T10:31:17.178Z',
        '2019-07-12T19:31:17.178Z',
        '2019-08-07T22:31:17.178Z',
    ],
    currency: 'EUR',
    locale: 'en-US'
};

const account4 = {
    owner: 'Petras Tomas',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
    movementDates: [
        '2019-11-18T21:31:17.178Z',
        '2020-12-08T19:20:17.018Z',
        '2019-12-14T17:31:17.178Z',
        '2019-01-04T15:31:17.178Z',
        '2019-03-23T11:31:17.178Z',
        '2019-05-06T10:31:17.178Z',
        '2019-07-12T19:31:17.178Z',
        '2019-08-07T22:31:17.178Z',
    ],
    currency: 'USD',
    locale: 'en-US'
};

const accoutns = [account1, account2, account3, account4];

// Getting elements from page to manipulate them
const historyColumn = document.querySelector('.history-col');
const userBalance = document.getElementById('balance-value');
const incomeMoney = document.querySelector('.in-money');
const outMoney = document.querySelector('.out-money');
const interestMoney = document.querySelector('.interest-money');
const loginButton = document.querySelector('.login-button');
const loginUsername = document.querySelector('.user-input');
const loginPin = document.querySelector('.pin-input');
const welcomeMessage = document.querySelector('.welcome-message');
const container = document.querySelector('.cutom-container');
const transferMoneyButton = document.querySelector('.trasfer-btn');
const transferAmmount = document.querySelector('.transfer-ammount');
const transferAccount = document.querySelector('.transfer-account');
const closeAccountButton = document.querySelector('.close-btn');
const closeAccountUser = document.querySelector('.confirm-user');
const closeAccountPin = document.querySelector('.confirm-pin');
const requsetMoneyButton = document.querySelector('.request-btn');
const requestAmount = document.querySelector('.request-amount');
const sortButton = document.querySelector('.sort-btn');
const currentTime = document.querySelector('.current-time-balance');
const logOutTimer = document.querySelector('.log-out-time');

// Options object for Intl API to format date
const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
};

const locale = navigator.language;

// Formats date to be displayed when transaction was made
const formatDate = function(date, locale){
    const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    const daysPaased = calcDaysPassed(new Date(), date);
    if(daysPaased === 0) return 'Today';
    if(daysPaased === 1) return 'Yesterday';
    if(daysPaased <= 7) return `${daysPaased} days ago`;
    return new Intl.DateTimeFormat(locale, options).format(date);
}

// Displaying all users transactions and sorts them if sort button is clicked
const displayMovement = function(account, sort = false){
    historyColumn.innerHTML = '';
    const sortMovements = sort ? account.movements.slice().sort((a,b) => a-b) : account.movements;
    sortMovements.forEach(function(mov, i){
        const transactionType = mov > 0 ? 'deposit' : 'withdrawal';
        const transactionDate = new Date(account.movementDates[i]);
        const displayDate = formatDate(transactionDate, locale);
        const formattedTransaction = new Intl.NumberFormat(account.locale, {style: 'currency', currency: account.currency}).format(mov);

        const html = ` 
        <div class="mt-3 movement-row">
            <span class="${transactionType} text-uppercase p-2">${i + 1} ${transactionType}</span>
            <span class="transaction-date">${displayDate}</span>
            <span class="transfer-ammount ">${formattedTransaction}</span>
        </div><hr class="movement-hr">`;

        historyColumn.insertAdjacentHTML('afterbegin', html);
    });
};

// Computes usernames for each account based on user name and surname
const createUserNames = function(accounts){
    accounts.forEach(function(account){
        account.username = account.owner.toLowerCase().split(' ').map(user => user[0]).join('');
    });
};

createUserNames(accoutns);

// Formats numbers by account locale and currency
const formatNumbers = function(account, number) {
    return new Intl.NumberFormat(account.locale, {style: 'currency', currency: account.currency}).format(number);
}

// Accumulates user total balance
const getUserBalance = function(account){
    account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
    userBalance.textContent = `${formatNumbers(account, account.balance)}`;
};

// Calculates only income money
const calculateIncomeMoney = function(account){
    const income = account.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    incomeMoney.textContent = `${formatNumbers(account, income)}`;
}

// Calculates only money that left account
const calculateOutMoney = function(account){
    const out = Math.abs(account.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0));
    outMoney.textContent = `${formatNumbers(account, out)}`;
}

// Calculates income interest
const calculateInterest = function(account){
    const interest = account.movements.filter(mov => mov > 0).map(deposit => deposit * account.interestRate/100).reduce((acc, interest) => acc + interest, 0);
    interestMoney.textContent = `${formatNumbers(account, interest)}`;
}

// Sets current date and time
const setCurrentTime = function(){
    const now = new Date();
    currentTime.textContent = `As of: ${new Intl.DateTimeFormat(locale, options).format(now)}`;
}

const updateUI = function(currentAccount){
    setCurrentTime();
    displayMovement(currentAccount);
    getUserBalance(currentAccount);
    calculateIncomeMoney(currentAccount);
    calculateOutMoney(currentAccount);
    calculateInterest(currentAccount);
}

let currentAccount, timer;

// Sets log out timer for user
const startLogOutTimer = function(){
    let remainingTime = 600;
    const tick = function(){
        const minutes = String(Math.trunc(remainingTime / 60)).padStart(2, 0);
        const seconds = String(remainingTime % 60).padStart(2, 0);
        logOutTimer.textContent = `You will be logged out in: ${minutes}:${seconds}`
        if(remainingTime === 0){
            clearInterval(timer);
            container.style.opacity = 0;
            welcomeMessage.textContent = `Log in to get started`;
        }
        remainingTime--;
    };
    tick();
    const timer = setInterval(tick, 1000);
    return timer;
};

// Displays all the UI if user log in is correct
loginButton.addEventListener('click', function(e){
    e.preventDefault();
    currentAccount = accoutns.find(acc => acc.username === loginUsername.value);
    if(currentAccount?.pin === +loginPin.value){
        welcomeMessage.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
        loginUsername.value = loginPin.value = '';
        loginPin.blur();
        updateUI(currentAccount);
        container.style.opacity = 100;
        if(timer){
            clearInterval(timer);
        }
        timer = startLogOutTimer();
    }else{
        container.style.opacity = 0;
        alert('Incorrect log in!');
        welcomeMessage.textContent = `Log in to get started`;
    }
});

// Transfer money to other account and updates UI
transferMoneyButton.addEventListener('click', function(e){
    e.preventDefault();
    const amount = +transferAmmount.value;
    const receiverAccount = accoutns.find(account => account.username === transferAccount.value);
    transferAmmount.value = transferAccount.value = '';
    transferAccount.blur();
    if(amount > 0 && currentAccount.balance >= amount && receiverAccount && receiverAccount?.username !== currentAccount.username){
        currentAccount.movements.push(-amount);
        currentAccount.movementDates.push(new Date());
        receiverAccount.movementDates.push(new Date());
        receiverAccount.movements.push(amount);
        updateUI(currentAccount);
        clearInterval(timer);
        timer = startLogOutTimer();
    }
});

// Users loan request 
requsetMoneyButton.addEventListener('click', function(e){
    e.preventDefault();
    const amount = Math.floor(requestAmount.value);
    if(amount > 0 && currentAccount.movements.some(movement => movement >= amount * 0.1)){
        setTimeout(function(){
        currentAccount.movements.push(amount);
        currentAccount.movementDates.push(new Date());
        updateUI(currentAccount);
        clearInterval(timer);
        timer = startLogOutTimer();}, 2500);
    }else{
        alert('There should be deposit which is at least 10% of loan request');
    }
    requestAmount.value = '';
    requestAmount.blur();
});

// Delets users account if he enters his username and pin
closeAccountButton.addEventListener('click', function(e){
    e.preventDefault();
    if(currentAccount.username === closeAccountUser.value && currentAccount.pin === +closeAccountPin.value){
        const index = accoutns.findIndex(account => account.username === currentAccount.username);
        accoutns.splice(index, 1);
        container.style.opacity = 0;
        welcomeMessage.textContent = `Log in to get started`;
        closeAccountUser.value = closeAccountPin.value = '';
    }else{
        alert('Incorrect log in!');
    }
});

let sorted = false;

// Sorts movements after button click
sortButton.addEventListener('click', function(e){
    e.preventDefault();
    displayMovement(currentAccount, !sorted);
    sorted = !sorted;
});

