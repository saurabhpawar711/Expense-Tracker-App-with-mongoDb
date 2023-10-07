const backendApi = "http://localhost:4000";

window.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".navbar-toggler");
    const linksContainer = document.querySelector(".navbar-collapse");

    toggleBtn.addEventListener("click", function () {
        linksContainer.classList.toggle("show");
    });
});

const dailyToggle = document.getElementById('dailyToggle');
const monthlyToggle = document.getElementById('monthlyToggle');
const dailyContainer = document.getElementById('dailyContainer');
const monthlyContainer = document.getElementById('monthlyContainer');
const reportContainer = document.getElementById('reportContainer');
const tableBody = document.getElementById('expenseTable');
reportContainer.style.display = 'none';


    dailyToggle.addEventListener('click', () => {
        document.getElementById('selectedDate').value = "";
        tableBody.innerHTML = '';
        dailyToggle.classList.add('active');
        monthlyToggle.classList.remove('active');
        dailyContainer.style.display = 'block';
        monthlyContainer.style.display = 'none'; 
        reportContainer.style.display = 'none';       
    });

    monthlyToggle.addEventListener('click', () => {
        document.getElementById('selectedMonth').value = "";
        tableBody.innerHTML = '';
        monthlyToggle.classList.add('active');
        dailyToggle.classList.remove('active');
        monthlyContainer.style.display = 'block';
        dailyContainer.style.display = 'none';
        reportContainer.style.display = 'none';
    });


const dailyButton = document.getElementById('dailyBtn');
const monthlyButton = document.getElementById('monthlyBtn');

dailyButton.addEventListener('click', dailyReports);
monthlyButton.addEventListener('click', monthlyReports);

async function dailyReports() {

    const tableBody = document.getElementById('expenseTable');
    tableBody.innerHTML = '';
    reportContainer.style.display = 'block';

    const date = document.getElementById('selectedDate').value;
    const dateSplit = date.split('-');
    const day = dateSplit[2];
    const month = dateSplit[1];
    const year = dateSplit[0];
    const formattedDate = `${day}/${month}/${year}`;
    const dateDetail = {
        date: formattedDate
    };
    
    try {
        let totalExpenseAmount = 0;
        const token = localStorage.getItem('token');
        const response = await axios.post(`${backendApi}/reports/dailyReports`, dateDetail, { headers: { "Authorization": token } });
        response.data.data.forEach((expense) => {
            showExpense(expense);
            totalExpenseAmount += expense.amount;
        })
        showTotalExpense(totalExpenseAmount);

        function showExpense(expense) {
            const tableBody2 = document.getElementById('expenseTable');
            const newRow = document.createElement('tr');

            const dateCol = document.createElement('td');
            dateCol.classList.add('dateCol');
            dateCol.textContent = expense.date;

            const categoryCol = document.createElement('td');
            categoryCol.classList.add('categoryCol');
            categoryCol.textContent = expense.category;

            const amountCol = document.createElement('td');
            amountCol.classList.add('amountCol');
            amountCol.textContent = expense.amount;

            const descriptionCol = document.createElement('td');
            descriptionCol.classList.add('descriptionCol');
            descriptionCol.textContent = expense.description;


            newRow.appendChild(dateCol);
            newRow.appendChild(categoryCol);
            newRow.appendChild(descriptionCol);
            newRow.appendChild(amountCol);
            tableBody2.appendChild(newRow);
        }

        function showTotalExpense(amount) {
            const tableExpenseBody = document.getElementById('expenseTable');
            const totalRow = document.createElement('tr');

            const emptyCol = document.createElement('td');
            emptyCol.setAttribute('colspan', '2');

            const totalLabelCol = document.createElement('td');
            totalLabelCol.innerHTML = '<h6>Total</h6>';

            const totalAmountCol = document.createElement('td');
            totalAmountCol.innerHTML = `<h6>${amount}</h6>`;

            totalRow.appendChild(emptyCol);
            totalRow.appendChild(totalLabelCol);
            totalRow.appendChild(totalAmountCol);
            tableExpenseBody.appendChild(totalRow);
        }
    }
    catch (err) {
        console.log(err);
        const errorMessage = err.response.data.error;
        if (errorMessage) {
            alert(errorMessage);
        }
    }
}

async function monthlyReports() {

    const tableBody = document.getElementById('expenseTable');
    tableBody.innerHTML = '';
    reportContainer.style.display = 'block';

    const month = document.getElementById('selectedMonth').value;
    const monthSplit = month.split('-');
    const year = monthSplit[0];
    const monthNumber = monthSplit[1];

    const monthDetail = {
        month: monthNumber,
        year: year
    };

    try {
        let totalExpenseAmount = 0;
        const token = localStorage.getItem('token');
        const response = await axios.post(`${backendApi}/reports/monthlyReports`, monthDetail, { headers: { "Authorization": token } });
        response.data.data.forEach((expense) => {
            showExpense(expense);
            totalExpenseAmount += expense.amount;
        })
        showTotalExpense(totalExpenseAmount);

        function showExpense(expense) {
            const tableBody2 = document.getElementById('expenseTable');
            const newRow = document.createElement('tr');

            const dateCol = document.createElement('td');
            dateCol.classList.add('dateCol');
            dateCol.textContent = expense.date;

            const categoryCol = document.createElement('td');
            categoryCol.classList.add('categoryCol');
            categoryCol.textContent = expense.category;

            const amountCol = document.createElement('td');
            amountCol.classList.add('amountCol');
            amountCol.textContent = expense.amount;

            const descriptionCol = document.createElement('td');
            descriptionCol.classList.add('descriptionCol');
            descriptionCol.textContent = expense.description;


            newRow.appendChild(dateCol);
            newRow.appendChild(categoryCol);
            newRow.appendChild(descriptionCol);
            newRow.appendChild(amountCol);
            tableBody2.appendChild(newRow);
        }

        function showTotalExpense(amount) {
            const tableExpenseBody = document.getElementById('expenseTable');
            const totalRow = document.createElement('tr');

            const emptyCol = document.createElement('td');
            emptyCol.setAttribute('colspan', '2');

            const totalLabelCol = document.createElement('td');
            totalLabelCol.innerHTML = '<h6>Total</h6>';

            const totalAmountCol = document.createElement('td');
            totalAmountCol.innerHTML = `<h6>${amount}</h6>`;

            totalRow.appendChild(emptyCol);
            totalRow.appendChild(totalLabelCol);
            totalRow.appendChild(totalAmountCol);
            tableExpenseBody.appendChild(totalRow);
        }

    }
    catch (err) {
        console.log(err);
        const errorMessage = err.response.data.error;
        if (errorMessage) {
            alert(errorMessage);
        }
    }
}
