function Account(name, firstDeposit){
    this.name = name;
    this.firstDeposit = firstDeposit;
    this.balance = 0;
    this.depositFunds(this.firstDeposit)
}

Account.prototype.depositFunds = function(funds) {
    this.balance += parseFloat(funds);
};

Account.prototype.withdrawFunds = function(funds) {
  funds = parseFloat(funds);
  if (this.balance >= funds) {
    this.balance -= funds;
  } else {
    window.alert('Insufficient funds!');
  }
};

// User Interface Logic ---------
const accounts = [];

function displayAccount(account) {
  const displayArea = document.getElementById('display-area');
  displayArea.innerText = account.name + '\n' + account.balance;
}

function handleNewAccountFormSubmission(event) {
    event.preventDefault();
    const inputtedAccountName = document.querySelector("input#new-account-name").value;
    const inputtedfirstDeposit = document.querySelector("input#first-deposit").value;
    let newAccount = new Account(inputtedAccountName, inputtedfirstDeposit);
    accounts.push(newAccount);
    document.getElementById("form-area").classList.add('hidden');
    document.getElementById("transaction-area").classList.remove('hidden');
    displayAccount(newAccount);
}

function handleTransactionSubmission (event) {
  event.preventDefault();
  const account = accounts[0];
  const transactionAmount = document.getElementById('transaction-amount').value;
  const transactionType = document.getElementById('transaction-type').value;
  if (transactionType === 'deposit') {
    account.depositFunds(transactionAmount);
  } else if (transactionType === 'withdrawal') {
    account.withdrawFunds(transactionAmount);
  }
  displayAccount(account);
}

window.onload = function() {
  const newAccountForm = document.getElementById('new-account');
  newAccountForm.addEventListener('submit', handleNewAccountFormSubmission);
  const transactionForm = document.getElementById('account-transaction');
  transactionForm.addEventListener('submit', handleTransactionSubmission);
}