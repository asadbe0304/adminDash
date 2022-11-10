'use strict';


function getUser() {
    fetch('http://localhost:3000/user')
        .then((response) => response.json())
        .then((result) => renderData(result))
}

getUser();

function renderData(data = []) {
    data.length > 0 ? data.forEach((e) => {
        const tr = createElement('tr', 'item table-primary', ` <td scope="row">${e.id}</td>
        <td><img class="avatar" src="${e.avatar}" width="40" height="40" alt="avatar"> ${e.user_name}
            </td>
        <td>${e.score}</td>
        <td><button class="btn btn-dark" data-set-edit = ${e.id}>Edit</button></td>
        <td><button class="btn btn-danger data-set-del = ${e.id}">Delete</button></td>`)
        $('.tbody').appendChild(tr)
    }) : $('.tbody').innerHTML = 'user empty'
};

const addUser = () => {
    const userName = $('#userName').value.trim();
    const userScore = $('#userScore').value.trim();
    const userPic = $('.avatar').value

    if (userScore.length === 0 || userName.length === 0) {
        alert('please')
    } else {
        fetch('http://localhost:3000/user', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_name: userName,
                score: userScore,
                avatar: userPic,
            })
        })
    }
}

$('.form').addEventListener('submit', (e) => {
    e.preventDefault()
    addUser()
})


$('.tbody').addEventListener('click', (e) => {
    let target = e.target;
    if (target.classList.contains('btn-danger')) {
        target.parentElement.parentElement.remove();
    }
})