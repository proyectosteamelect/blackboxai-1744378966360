// Lista de estudiantes autorizados
const authorizedStudents = [
    'valdiviesomarindaniel@colegiocalatrava.edu.co',
    'contrerasurbanojacobo@colegiocalatrava.edu.co'
];

// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('emailInput');
const loginButton = document.getElementById('loginButton');
const errorMessage = document.getElementById('errorMessage');

// Función para mostrar mensajes de error
const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
};

// Función para validar el correo institucional
const validateEmail = (email) => {
    if (!email) return false;
    email = email.toLowerCase();
    if (!email.endsWith('@colegiocalatrava.edu.co')) {
        showError('Por favor, utiliza tu correo institucional (@colegiocalatrava.edu.co)');
        return false;
    }
    if (!authorizedStudents.includes(email)) {
        showError('Este correo no está autorizado para votar');
        return false;
    }
    return true;
};

// Función para manejar el inicio de sesión
const handleLogin = (e) => {
    e.preventDefault();
    const email = emailInput.value.trim().toLowerCase();
    
    if (validateEmail(email)) {
        // Verificar si el estudiante ya votó
        const votes = JSON.parse(localStorage.getItem('votes') || '{}');
        
        // Guardar información del usuario
        sessionStorage.setItem('userEmail', email);
        
        // Redirigir según si ya votó o no
        if (votes[email]) {
            window.location.href = 'results.html';
        } else {
            window.location.href = 'vote.html';
        }
    }
};

// Event Listeners
loginForm.addEventListener('submit', handleLogin);

// Verificar estado de autenticación al cargar la página
const checkAuth = () => {
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
        const votes = JSON.parse(localStorage.getItem('votes') || '{}');
        if (votes[userEmail]) {
            window.location.href = 'results.html';
        } else {
            window.location.href = 'vote.html';
        }
    }
};

// Iniciar verificación de autenticación
checkAuth();
