// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyBKFyw5XCJUxXL-qoqgpfxo3csNBSNKkEw",
    authDomain: "base-de-datos-jcu-dvm.firebaseapp.com",
    projectId: "base-de-datos-jcu-dvm",
    storageBucket: "base-de-datos-jcu-dvm.firebasestorage.app",
    messagingSenderId: "780379248702",
    appId: "1:780379248702:web:705fe326403f360da3196f",
    measurementId: "G-N26R6NB7GC",
    databaseURL: "https://base-de-datos-jcu-dvm-default-rtdb.firebaseio.com"
};

// Initialize Firebase with error handling
let app;
try {
    if (!firebase.apps.length) {
        app = firebase.initializeApp(firebaseConfig);
        console.log('Firebase initialized successfully');
    } else {
        app = firebase.app();
    }
} catch (error) {
    console.error('Error initializing Firebase:', error);
    // Mostrar error en la UI si existe el elemento
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.textContent = 'Error al conectar con el servidor. Por favor, recarga la página.';
        errorMessage.classList.remove('hidden');
    }
}

// Export auth and database with error handling
let auth, database;
try {
    auth = firebase.auth();
    database = firebase.database();
} catch (error) {
    console.error('Error initializing Firebase services:', error);
}

// Configure Google Auth Provider
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    'hd': 'colegiocalatrava.edu.co',
    'prompt': 'select_account'
});

// Monitor connection state
const monitorConnection = () => {
    try {
        const connectedRef = database.ref('.info/connected');
        connectedRef.on('value', (snap) => {
            if (snap.val() === true) {
                console.log('Connected to Firebase Realtime Database');
                // Verificar la base de datos
                checkDatabase();
            } else {
                console.log('Disconnected from Firebase Realtime Database');
                const errorMessage = document.getElementById('errorMessage');
                if (errorMessage) {
                    errorMessage.textContent = 'Conexión perdida. Reconectando...';
                    errorMessage.classList.remove('hidden');
                }
            }
        });
    } catch (error) {
        console.error('Error monitoring connection:', error);
    }
};

// Verificar estructura de la base de datos
const checkDatabase = async () => {
    try {
        const votesRef = database.ref('votes');
        const snapshot = await votesRef.once('value');
        console.log('Database check successful');
    } catch (error) {
        console.error('Error checking database:', error);
    }
};

// Iniciar monitoreo de conexión
if (database) {
    monitorConnection();
}

// Exportar para uso en otros archivos
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDatabase = database;
window.googleAuthProvider = provider;
