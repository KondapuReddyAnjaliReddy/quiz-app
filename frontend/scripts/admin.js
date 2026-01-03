async function loadUsers() {
    const res = await fetch("http://localhost:5000/api/admin/users");
    const users = await res.json();
    const tbody = document.getElementById("user-list");

    users.forEach(user => {
        const row = `<tr><td>${user.username}</td><td>${user.score}</td></tr>`;
        tbody.innerHTML += row;
    });
}

loadUsers();
