let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null;
let appointments = {}; // Objeto para armazenar compromissos

// Função para gerar o calendário
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const currentMonthYear = document.getElementById('current-month-year');

    // Meses e dias da semana
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    // Configuração do calendário
    currentMonthYear.innerHTML = `${months[currentMonth]} ${currentYear}`;
    calendar.innerHTML = '<div class="calendar-header">' + daysOfWeek.map(day => `<div class="calendar-day">${day}</div>`).join('') + '</div>';
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let date = 1;

    // Preenchendo o calendário
    for (let i = 0; i < 6; i++) { // 6 semanas para cobrir o mês
        let weekHTML = '<div class="calendar">';
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < firstDay) || date > daysInMonth) {
                weekHTML += '<div class="calendar-day"></div>';
            } else {
                const dayKey = `${currentYear}-${currentMonth}-${date}`;
                const hasAppointment = appointments[dayKey] ? 'has-appointment' : '';
                weekHTML += `<div class="calendar-day ${hasAppointment}" onclick="selectDate(${date})">${date}</div>`;
                date++;
            }
        }
        weekHTML += '</div>';
        calendar.innerHTML += weekHTML;
    }
    displayAppointments();
}

// Função para exibir a lista de compromissos
function displayAppointments() {
    const list = document.getElementById('appointments-list');
    list.innerHTML = '';

    // Organizar os compromissos por data, hora e nome do cliente
    const sortedAppointments = Object.keys(appointments)
        .filter(dateKey => {
            // Filtra os compromissos apenas para o mês e ano atuais
            const [year, month] = dateKey.split('-').map(num => parseInt(num));
            return year === currentYear && month === currentMonth;
        })
        .sort() // Organiza por data
        .map(dateKey => {
            appointments[dateKey] = appointments[dateKey]
                .sort((a, b) => {
                    // Ordena primeiro por horário (hora e minuto)
                    const timeA = a.time.split(':').map(num => parseInt(num));
                    const timeB = b.time.split(':').map(num => parseInt(num));
                    if (timeA[0] !== timeB[0]) return timeA[0] - timeB[0]; // Ordena por hora
                    return timeA[1] - timeB[1]; // Ordena por minuto
                })
                .sort((a, b) => a.client.localeCompare(b.client)); // Ordena por nome do cliente

            return { dateKey, appointments: appointments[dateKey] };
        });

    // Exibir compromissos na lista
    sortedAppointments.forEach(({ dateKey, appointments }) => {
        appointments.forEach(app => {
            const item = document.createElement('li');
            item.textContent = `Dia ${dateKey.split('-')[2]} - ${app.time.replace(":", "H:")} - Nome: ${app.client} - Descrição: ${app.description}`;
            
            // Adicionar o botão de exclusão
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = () => deleteAppointment(dateKey, app.time, app.client);
            item.appendChild(deleteButton);

            list.appendChild(item);
        });
    });
}

// Função para selecionar uma data
function selectDate(day) {
    selectedDate = day;
    document.getElementById('event-popup').style.display = 'block';
}

// Função para salvar o compromisso
function saveAppointment() {
    const clientName = document.getElementById('client-name').value;
    const appointmentTime = document.getElementById('appointment-time').value;
    const description = document.getElementById('appointment-description').value;

    if (clientName && appointmentTime && description && selectedDate) {
        const dateKey = `${currentYear}-${currentMonth}-${selectedDate}`;
        if (!appointments[dateKey]) {
            appointments[dateKey] = [];
        }
        appointments[dateKey].push({ client: clientName, time: appointmentTime, description });
        
        // Salvar compromissos no localStorage
        saveAppointmentsToLocalStorage();
        
        closePopup();
        generateCalendar();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Função para excluir o compromisso
function deleteAppointment(dateKey, time, client) {
    // Filtrar o compromisso a ser excluído
    appointments[dateKey] = appointments[dateKey].filter(app => !(app.time === time && app.client === client));

    // Se não houver mais compromissos nesse dia, remover a data
    if (appointments[dateKey].length === 0) {
        delete appointments[dateKey];
    }

    // Salvar novamente no localStorage
    saveAppointmentsToLocalStorage();

    // Atualizar o calendário
    generateCalendar();
}

// Função para fechar o pop-up
function closePopup() {
    document.getElementById('event-popup').style.display = 'none';
    clearPopupFields();
}

// Função para limpar campos do pop-up
function clearPopupFields() {
    document.getElementById('client-name').value = '';
    document.getElementById('appointment-time').value = '';
    document.getElementById('appointment-description').value = '';
}

// Função para mudar o mês
function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
}

// Função para carregar os compromissos do localStorage
function loadAppointmentsFromLocalStorage() {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
        appointments = JSON.parse(savedAppointments);
    }
}

// Função para salvar compromissos no localStorage
function saveAppointmentsToLocalStorage() {
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

// Inicializar o calendário ao carregar a página
window.onload = function() {
    loadAppointmentsFromLocalStorage(); // Carregar compromissos do localStorage
    generateCalendar(); // Gerar o calendário com os compromissos carregados
};
