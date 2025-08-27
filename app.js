let income = 0, expense = 0;
const transactions = [];

function addEntry() {
  const title = document.getElementById("title").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!title || isNaN(amount) || amount <= 0) {
    alert("Please enter valid data!");
    return;
  }

  const transaction = { title, amount, type };
  transactions.push(transaction);

  if (type === "income") income += amount;
  else expense += amount;

  updateUI();
  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
}

function updateUI() {
  document.getElementById("totalIncome").innerText = income;
  document.getElementById("totalExpense").innerText = expense;
  document.getElementById("balance").innerText = income - expense;

  const list = document.getElementById("transactionList");
  list.innerHTML = "";
  transactions.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${t.title}: ${t.amount} (${t.type})`;
    list.appendChild(li);
  });

  renderChart();
}

function renderChart() {
  const ctx = document.getElementById("budgetChart").getContext("2d");
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [income, expense],
        backgroundColor: ["#2ecc71", "#e74c3c"]
      }]
    }
  });
}
