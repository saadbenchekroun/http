document.addEventListener("DOMContentLoaded", function() {
    getUsers();
});

function getUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => createTable(data))
        .catch(error => console.error('Error fetching users:', error));
}

function createTable(users) {
    const userListDiv = document.getElementById('userList');
    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
        </tr>
    `;
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="user.html?id=${user.id}">${user.id}</a></td>
            <td>${user.name}</td>
            <td>${user.email}</td>
        `;
        table.appendChild(row);
    });
    
    userListDiv.appendChild(table);
}