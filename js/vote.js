// DOM Elements
const studentNameElement = document.getElementById('studentName');
const logoutButton = document.getElementById('logoutButton');
const candidatesContainer = document.getElementById('candidatesContainer');
const confirmationModal = document.getElementById('confirmationModal');
const confirmVoteButton = document.getElementById('confirmVoteButton');
const cancelVoteButton = document.getElementById('cancelVoteButton');
const voteDetails = document.getElementById('voteDetails');
const errorMessage = document.getElementById('errorMessage');

// Candidatos y sus propuestas
const candidates = [
    {
        id: 1,
        name: "Candidato 1",
        image: "https://images.pexels.com/photos/5905555/pexels-photo-5905555.jpeg",
        proposals: [
            "Mejorar las instalaciones deportivas",
            "Implementar programas de reciclaje",
            "Organizar más eventos culturales"
        ]
    },
    {
        id: 2,
        name: "Candidato 2",
        image: "https://images.pexels.com/photos/5905710/pexels-photo-5905710.jpeg",
        proposals: [
            "Crear clubes de debate",
            "Mejorar la cafetería escolar",
            "Implementar un sistema de tutoría entre estudiantes"
        ]
    },
    {
        id: 3,
        name: "Candidato 3",
        image: "https://images.pexels.com/photos/5905458/pexels-photo-5905458.jpeg",
        proposals: [
            "Organizar ferias de ciencias mensuales",
            "Implementar un programa de liderazgo estudiantil",
            "Mejorar las áreas de estudio"
        ]
    }
];

let selectedCandidate = null;
let selectedProposal = null;

// Función para mostrar mensajes de error
const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
};

// Función para crear tarjeta de candidato
const createCandidateCard = (candidate) => {
    const card = document.createElement('div');
    card.className = 'candidate-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1';
    card.innerHTML = `
        <img src="${candidate.image}" alt="${candidate.name}" class="w-full h-48 object-cover">
        <div class="p-6">
            <h3 class="text-xl font-semibold text-calatrava-dark mb-4">${candidate.name}</h3>
            <div class="space-y-4">
                ${candidate.proposals.map((proposal, index) => `
                    <div class="flex items-center">
                        <input type="radio" 
                               id="proposal-${candidate.id}-${index}"
                               name="proposals"
                               class="proposal-radio"
                               data-candidate="${candidate.id}"
                               data-proposal="${index}"
                               class="form-radio h-4 w-4 text-calatrava">
                        <label for="proposal-${candidate.id}-${index}"
                               class="ml-2 text-gray-700 cursor-pointer hover:text-calatrava-dark transition-colors">
                            ${proposal}
                        </label>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Event listeners para los radio buttons
    card.querySelectorAll('.proposal-radio').forEach(radio => {
        radio.addEventListener('change', () => {
            selectedCandidate = candidate;
            selectedProposal = candidate.proposals[parseInt(radio.dataset.proposal)];
            showConfirmationModal();
        });
    });

    return card;
};

// Función para mostrar el modal de confirmación
const showConfirmationModal = () => {
    voteDetails.innerHTML = `
        <p class="font-semibold text-calatrava-dark">Candidato:</p>
        <p class="mb-2">${selectedCandidate.name}</p>
        <p class="font-semibold text-calatrava-dark">Propuesta:</p>
        <p>${selectedProposal}</p>
    `;
    confirmationModal.classList.remove('hidden');
};

// Función para ocultar el modal de confirmación
const hideConfirmationModal = () => {
    confirmationModal.classList.add('hidden');
    document.querySelectorAll('.proposal-radio').forEach(radio => radio.checked = false);
    selectedCandidate = null;
    selectedProposal = null;
};

// Función para registrar el voto
const registerVote = () => {
    try {
        const userEmail = sessionStorage.getItem('userEmail');
        if (!userEmail) {
            showError('Debes iniciar sesión para votar');
            return;
        }

        const votes = JSON.parse(localStorage.getItem('votes') || '{}');
        
        // Registrar el voto
        votes[userEmail] = {
            candidateId: selectedCandidate.id,
            candidateName: selectedCandidate.name,
            proposal: selectedProposal,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('votes', JSON.stringify(votes));
        window.location.href = 'results.html';
    } catch (error) {
        console.error('Error al registrar el voto:', error);
        showError('Error al registrar el voto. Por favor, intenta nuevamente.');
    }
};

// Función para cerrar sesión
const handleLogout = () => {
    sessionStorage.removeItem('userEmail');
    window.location.href = 'index.html';
};

// Event Listeners
confirmVoteButton.addEventListener('click', registerVote);
cancelVoteButton.addEventListener('click', hideConfirmationModal);
logoutButton.addEventListener('click', handleLogout);

// Inicialización
const init = () => {
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
        window.location.href = 'index.html';
        return;
    }

    studentNameElement.textContent = userEmail;
    candidates.forEach(candidate => {
        candidatesContainer.appendChild(createCandidateCard(candidate));
    });
};

// Verificar autenticación y comenzar
init();
