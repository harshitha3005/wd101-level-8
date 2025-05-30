
document.addEventListener('DOMContentLoaded', () => {
    loadEntries();

    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', handleSubmit);
});

function handleSubmit(event) {
    event.preventDefault(); 

    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    
    let adjustedAge = age;
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        adjustedAge--;
    }

    if (adjustedAge < 18 || adjustedAge > 55) {
        alert('Age must be between 18 and 55 years.');
        return;
    }

    
    const entry = {
        name,
        email,
        password,
        dob,
        terms
    };

    
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));

    
    sessionStorage.setItem('lastEntry', JSON.stringify(entry));

    
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('terms').checked = false;

    
    loadEntries();
}

function loadEntries() {
    const entriesBody = document.getElementById('entriesBody');
    entriesBody.innerHTML = '';

    
    let entries = JSON.parse(localStorage.getItem('entries')) || [];

    
    entries.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.terms}</td>
        `;
        entriesBody.appendChild(row);
    });
}