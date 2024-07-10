function getUserIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

document.addEventListener("DOMContentLoaded", function() {
    const userId = getUserIdFromUrl();
    if (userId) {
        fetchUserData(userId);
    } else {
        displayError('Invalid user ID');
    }
});

function displayError(message) {
    const userDataDiv = document.getElementById('userData');
    userDataDiv.innerHTML = `<p>${message}</p>`;
}

function fetchUserData(userId) {
    if (!validateUserId(userId)) {
        displayError('Invalid user ID');
        return;
    }

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(data => displayUserData(data))
        .catch(error => displayError('Error fetching user data'));
}

function validateUserId(userId) {
    return !isNaN(userId) && userId > 0;
}


function displayUserData(data) {
    const userDataDiv = document.getElementById('userData');
    userDataDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p><strong>Username:</strong> ${data.username}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Website:</strong> <a href="http://${data.website}" target="_blank">${data.website}</a></p>
        <h3>Address</h3>
        <p>${data.address.suite}, ${data.address.street}, ${data.address.city}, ${data.address.zipcode}</p>
        <h3>Company</h3>
        <p><strong>Name:</strong> ${data.company.name}</p>
        <p><strong>CatchPhrase:</strong> ${data.company.catchPhrase}</p>
        <p><strong>BS:</strong> ${data.company.bs}</p>
    `;
}