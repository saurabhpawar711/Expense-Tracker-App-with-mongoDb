const backendApi = "http://localhost:4000";


window.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".navbar-toggler");
    const linksContainer = document.querySelector(".navbar-collapse");

    toggleBtn.addEventListener("click", function () {
        linksContainer.classList.toggle("show");
    });
});

let currentPosition = 1;
window.addEventListener('DOMContentLoaded', getLeaderboardDetails);
async function getLeaderboardDetails() {
    try {
        const page = 1;
        const token = localStorage.getItem('token');
        const response = await axios.get(`${backendApi}/premium/show-leaderboard/${page}`, { headers: { "Authorization": token } });
        for (let i = 0; i < response.data.users.length; i++) {
            showLeaderboard(response.data.users[i], currentPosition);
            currentPosition++;
            pagination(response.data.data);
        }
    }
    catch (err) {
        const errorMessage = err.response.data.error;
        if (errorMessage) {
            alert(errorMessage);
        }
    }
}

async function pagination(data) {

    const firstPage = 1;
    const currentPage = data.currentPage;
    const hasPreviousPage = data.hasPreviousPage;
    const nextPage = data.nextPage;
    const hasNextPage = data.hasNextPage;
    const previousPage = data.previousPage;
    const lastPage = data.lastPage;

    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const firstBtn = document.createElement('button');
    firstBtn.innerHTML = `<`;
    firstBtn.classList.add('firstBtn');
    pagination.appendChild(firstBtn);
    firstBtn.addEventListener('click', () => { goToPage(firstPage) });

    if (hasPreviousPage) {
        const previousBtn = document.createElement('button');
        previousBtn.innerHTML = `${previousPage}`;
        previousBtn.classList.add('previousBtn');
        pagination.appendChild(previousBtn);
        previousBtn.addEventListener('click', () => { goToPage(previousPage) });
    }

    const presentBtn = document.createElement('button');
    presentBtn.innerHTML = `${currentPage}`;
    presentBtn.classList.add('presentBtn', 'active');
    pagination.appendChild(presentBtn);
    presentBtn.addEventListener('click', () => { goToPage(currentPage) });

    if (hasNextPage) {
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = `${nextPage}`;
        nextBtn.classList.add('nextBtn');
        pagination.appendChild(nextBtn);
        nextBtn.addEventListener('click', () => { goToPage(nextPage) });
    }

    const lastBtn = document.createElement('button');
    lastBtn.innerHTML = `>`;
    lastBtn.classList.add('lastBtn');
    pagination.appendChild(lastBtn);
    lastBtn.addEventListener('click', () => { goToPage(lastPage) });
}
async function goToPage(page) {
    const tableBody = document.getElementById('leaderboardTableList');
    tableBody.innerHTML = "";
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${backendApi}/premium/show-leaderboard/${page}`, { headers: { "Authorization": token } });
        if (page > 1) {
            currentPosition = (page-1) * 10 + 1; 
        } else {
            currentPosition = 1;
        }
        for (let i = 0; i < response.data.users.length; i++) {
            showLeaderboard(response.data.users[i], currentPosition);
            currentPosition++;
            pagination(response.data.data);
        }
    }
    catch (err) {
        const errorMessage = err.response.data.error;
        if (errorMessage) {
            alert(errorMessage);
        }
    }
}


function showLeaderboard(leaderboard, position) {

    const tableBody = document.getElementById('leaderboardTableList');
    const newRow = document.createElement('tr');

    const positionCol = document.createElement('td');
    positionCol.classList.add('positionCol');
    positionCol.textContent = position;

    const nameCol = document.createElement('td');
    nameCol.classList.add('nameCol');
    nameCol.textContent = leaderboard.name;

    const amountCol = document.createElement('td');
    amountCol.classList.add('amountCol');
    if (leaderboard.totalExpense > 0) {
        amountCol.textContent = leaderboard.totalExpense;
    }
    else {
        amountCol.textContent = 0;
    }

    newRow.appendChild(positionCol);
    newRow.appendChild(nameCol);
    newRow.appendChild(amountCol);
    tableBody.appendChild(newRow);
}