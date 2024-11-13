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

    for (const key in appointments) {
        const [year, month] = key.split('-');
        if (parseInt(year) === currentYear && parseInt(month) == currentMonth) {
            appointments[key].forEach(app => {
                const item = document.createElement('li');
                item.textContent = `Dia ${key.split('-')[2]} - ${app.time.replace(":", "H:")}min - Nome: ${app.client} - Descrição: ${app.description}`;
                list.appendChild(item);
            });
        }
    }
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
        closePopup();
        generateCalendar();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
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

// Inicializar o calendário ao carregar a página
window.onload = generateCalendar;
