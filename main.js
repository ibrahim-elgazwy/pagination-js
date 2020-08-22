let users = [];
let page = 1;
let size = 5;
let totalRecords = 5000;

let usersTable = document.getElementById("users-table");
let prevous = document.getElementById("prevous");
let next = document.getElementById("next");
let selectSize = document.getElementById("size");
let currentPage = document.getElementById("current-page");
let btn4 = document.getElementById("btn-4");
let btns = Array.from(document.getElementsByClassName('btn'));

prevous.addEventListener('click', getPrevousUsers);
next.addEventListener('click', getNextUsers);
selectSize.addEventListener('click', getUsersBySize);
btn4.addEventListener('click', getLastPage);
btns.map(btn => btn.addEventListener('click', getUsersByPage))

function getTotalPages(){
    return Math.ceil(totalRecords/size);
}

function showUsersInfo(users) {
    let out = `
        <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Address</th>
        </tr>
    `;
    let record = 1;
    for(let user of users){
        out += `
            <tr>
                <td>${record + (size * (page-1))}</td>
                <td>${user.name.first}</td>
                <td>${user.name.last}</td>
                <td>${user.phone}</td>
                <td>${user.gender}</td>
                <td>${user.email}</td>
                <td>${user.location.city}</td>
            </tr>
        `;
        ++record;
    }

    usersTable.innerHTML = out;
}

function getNextUsers(){
    if(page < getTotalPages())
        page += 1;
    getUserData(page, size, true);
}

function getPrevousUsers(){
    if(page > 1){
        page -= 1;
        getUserData(page, size, true);
    }
}

function getUsersBySize(event){
    size = parseInt(event.currentTarget.value);
    getUserData(page, size);
}

function getLastPage(event){
    page = parseInt(event.currentTarget.textContent);
    resetBtnsBackground();
    event.currentTarget.classList = 'btn w3-button w3-green';
    getUserData(page, size);
}

function resetBtnsBackground() {
    btns.map(btn => btn.classList = "btn w3-button w3-teal");
    btn4.classList = "btn w3-button w3-teal";
}

function getUsersByPage(event){
    debugger
    resetBtnsBackground();
    let id = event.currentTarget.id;
    if(id === 'btn-1'){
        page = parseInt(event.currentTarget.textContent);
        getUserData(page, size, false)
    }

    if(id === 'btn-2'){
        page = parseInt(event.currentTarget.textContent);
        getUserData(page, size, false)
    }
    if(id === 'btn-3'){
        page = parseInt(event.currentTarget.textContent);
        getUserData(page, size, false)
    }
    event.currentTarget.classList = "btn w3-button w3-green"
}

function changBtnsOrder(){
    debugger
    let countDown = false;
    let seq = page;
    if(page === getTotalPages() -1)
        countDown = true;
    btns.map(btn => {
        btn.addEventListener('click', getUsersByPage);
        btn.classList = "btn w3-button w3-teal"
        btn.textContent = seq;
        !countDown ? ++seq : --seq;
    });
    btns[0].classList = "btn w3-button w3-green";
}

function getUserData(page, size, status){
    fetch(`https://randomuser.me/api/?results=${size}&page=${page}`)
    .then(res => res.json())
    .then(data => {
        users = data.results;
        currentPage.textContent = `CurrentPage: ${page}/${getTotalPages()}`;
        btn4.textContent = getTotalPages();
        if(status && page < getTotalPages())
            changBtnsOrder();
        showUsersInfo(users);
    })
}

getUserData(page, size, false);