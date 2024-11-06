let currentMonth = new Date().getMonth(); // Mês atual (0-11)
let currentYear = new Date().getFullYear(); // Ano atual

let selectedDate = null;

// Função para gerar o calendário
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const currentMonthYear = document.getElementById('current-month-year');

    // Definir o primeiro dia do mês
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const lastDate = lastDay.getDate();

    // Exibir mês e ano no topo
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    currentMonthYear.innerHTML = `${months[currentMonth]} ${currentYear}`;

    // Cabeçalhos dos dias da semana
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    let calendarHTML = '<div class="calendar-header">';
    for (let i = 0; i < 7; i++) {
        calendarHTML += `<div class="calendar-day">${daysOfWeek[i]}</div>`;
    }
    calendarHTML += '</div>';

    // Preencher os dias do mês
    let date = 1;
    for (let i = 0; i < 6; i++) { // 6 linhas para cobrir o mês completo
        calendarHTML += '<div class="calendar">';
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j >= firstDay.getDay()) || (i > 0 && date <= lastDate)) {
                const currentDay = (i === 0 && j >= firstDay.getDay()) ? date++ : date++;
                const todayClass = currentDay === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? 'today' : '';
                calendarHTML += `<div class="calendar-day ${todayClass}" onclick="selectDate(${currentDay})">${currentDay}</div>`;
            } else {
                calendarHTML += `<div class="calendar-day"></div>`;
            }
        }
        calendarHTML += '</div>';
    }
    calendar.innerHTML = calendarHTML;
}

// Função para selecionar uma data e mostrar o pop-up
function selectDate(day) {
    selectedDate = day;
    const selectedDay = document.querySelectorAll('.calendar-day');
    selectedDay.forEach(day => day.classList.remove('selected'));
    document.querySelector(`[onclick="selectDate(${day})"]`).classList.add('selected');

    // Exibir pop-up para adicionar evento
    const popup = document.getElementById('event-popup');
    popup.style.display = 'block';
}

// Função para salvar evento
function saveAppointment() {
    const clientName = document.getElementById('client-name').value;
    const appointmentTime = document.getElementById('appointment-time').value;
    const description = document.getElementById('appointment-description').value;

    if (clientName && appointmentTime && description && selectedDate) {
        alert(`Compromisso agendado com ${clientName} para o dia ${selectedDate} às ${appointmentTime}`);

        // Fechar pop-up
        document.getElementById('event-popup').style.display = 'none';
        clearPopupFields();
        generateCalendar(); // Regerar o calendário para mostrar compromissos
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Função para fechar o pop-up sem salvar
function closePopup() {
    document.getElementById('event-popup').style.display = 'none';
    clearPopupFields();
}

// Função para limpar os campos do pop-up
function clearPopupFields() {
    document.getElementById('client-name').value = '';
    document.getElementById('appointment-time').value = '';
    document.getElementById('appointment-description').value = '';
}

// Função para mudar de mês
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

// Gerar o calendário ao carregar a página
window.onload = generateCalendar;
