// script.js

let users = [
    { name: 'João Silva', email: 'joao@exemplo.com', role: 'Advogado' },
    { name: 'Maria Oliveira', email: 'maria@exemplo.com', role: 'Estagiário' },
    { name: 'Carlos Souza', email: 'carlos@exemplo.com', role: 'Assistente' }
];

let selectedUser = null;

document.addEventListener('DOMContentLoaded', () => {
    displayUsers(users);
});

function searchUser() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchInput) || user.email.toLowerCase().includes(searchInput));
    displayUsers(filteredUsers);
}

function displayUsers(usersList) {
    const tbody = document.querySelector('#userTable tbody');
    tbody.innerHTML = ''; // Limpar a tabela

    usersList.forEach((user, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="openEditModal(${index})">Alterar Cargo</button>
                <button class="delete" onclick="openDeleteModal(${index})">Excluir</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

function openEditModal(index) {
    selectedUser = index;
    const modal = document.getElementById('editModal');
    const user = users[selectedUser];
    document.getElementById('newRole').value = user.role;
    modal.style.display = 'block';
}

function saveRole() {
    const newRole = document.getElementById('newRole').value;
    users[selectedUser].role = newRole;
    displayUsers(users);
    closeModal();
}

function openDeleteModal(index) {
    selectedUser = index;
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'block';
}

function confirmDelete() {
    users.splice(selectedUser, 1); // Remover usuário do array
    displayUsers(users);
    closeModal();
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
    document.getElementById('deleteModal').style.display = 'none';
}
