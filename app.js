// Grab elements
const dateInput = document.getElementById('grad-date');
const timeInput = document.getElementById('grad-time');
const calcBtn = document.getElementById('calc-btn');
const clearBtn = document.getElementById('clear-btn');
const results = document.getElementById('results');
const resultsList = document.getElementById('results-list');

// Calculate button
calcBtn.addEventListener('click', () => {
    const dateValue = dateInput.value;
    const timeValue = timeInput.value;

    // Validate
    if (!dateValue) {
        showError('Please select a graduation date.');
        return;
    }

    const gradDate = new Date(dateValue + 'T' + (timeValue || '00:00'));
    const now = new Date();

    // Clear previous
    resultsList.innerHTML = '';
    results.classList.remove('hidden');

    // --- Section 1: Basic info ---
    addResult('Current Date &amp; Time:', now.toLocaleString());
    addResult('Date of Graduation:', gradDate.toLocaleDateString());
    addResult('&nbsp;', '');

    // --- Section 2: Breakdown ---
    addResult('What day is the graduation?', gradDate.toLocaleDateString('en-US', { weekday: 'long' }));
    addResult('What month is it?', gradDate.toLocaleDateString('en-US', { month: 'long' }));
    addResult('What day of the month?', gradDate.toLocaleDateString());
    addResult('What time?', gradDate.toLocaleTimeString('en-US'));
    addResult('&nbsp;', '');

    // --- Section 3: Time remaining ---
    const diffMs = gradDate - now;

    if (diffMs < 0) {
        addResult('Status:', '🎉 Graduation has already passed!');
        return;
    }

    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffMinutes = diffMs / (1000 * 60);
    const diffWeeks = diffDays / 7;
    const diffMonths = diffDays / 30.44;
    const diffYears = diffDays / 365.25;

    addResult('How long?', '');
    addResult('Days remaining:', Math.floor(diffDays).toLocaleString());
    addResult('Weeks remaining:', diffWeeks.toFixed(1));
    addResult('Months remaining:', diffMonths.toFixed(1));
    addResult('Years remaining:', diffYears.toFixed(2));
    addResult('Hours remaining:', Math.floor(diffHours).toLocaleString());
    addResult('Minutes remaining:', Math.floor(diffMinutes).toLocaleString());
});

// Clear button
clearBtn.addEventListener('click', () => {
    dateInput.value = '';
    timeInput.value = '';
    resultsList.innerHTML = '';
    results.classList.add('hidden');
});

// Helper: add a result row
function addResult(label, value) {
    const li = document.createElement('li');
    li.innerHTML = '<strong>' + label + '</strong> ' + value;
    resultsList.appendChild(li);
}

// Helper: show error
function showError(message) {
    resultsList.innerHTML = '';
    results.classList.remove('hidden');
    const li = document.createElement('li');
    li.className = 'error';
    li.textContent = message;
    resultsList.appendChild(li);
}
