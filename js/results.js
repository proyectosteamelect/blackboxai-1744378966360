// DOM Elements
const studentNameElement = document.getElementById('studentName');
const logoutButton = document.getElementById('logoutButton');
const totalVotesElement = document.getElementById('totalVotes');
const participationElement = document.getElementById('participation');
const votingStatusElement = document.getElementById('votingStatus');
const detailedResultsContainer = document.getElementById('detailedResults');
const errorMessage = document.getElementById('errorMessage');

// Candidatos (debe coincidir con vote.js)
const candidates = [
    {
        id: 1,
        name: "Candidato 1",
        proposals: [
            "Mejorar las instalaciones deportivas",
            "Implementar programas de reciclaje",
            "Organizar más eventos culturales"
        ]
    },
    {
        id: 2,
        name: "Candidato 2",
        proposals: [
            "Crear clubes de debate",
            "Mejorar la cafetería escolar",
            "Implementar un sistema de tutoría entre estudiantes"
        ]
    },
    {
        id: 3,
        name: "Candidato 3",
        proposals: [
            "Organizar ferias de ciencias mensuales",
            "Implementar un programa de liderazgo estudiantil",
            "Mejorar las áreas de estudio"
        ]
    }
];

// Variables para los gráficos
let candidatesChart;
let proposalsChart;

// Función para mostrar mensajes de error
const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
};

// Función para inicializar los gráficos
const initializeCharts = () => {
    // Gráfico de candidatos
    const candidatesCtx = document.getElementById('candidatesChart').getContext('2d');
    candidatesChart = new Chart(candidatesCtx, {
        type: 'bar',
        data: {
            labels: candidates.map(c => c.name),
            datasets: [{
                label: 'Votos',
                data: new Array(candidates.length).fill(0),
                backgroundColor: [
                    'rgba(74, 144, 226, 0.8)',
                    'rgba(33, 113, 205, 0.8)',
                    'rgba(27, 79, 148, 0.8)'
                ],
                borderColor: [
                    'rgba(74, 144, 226, 1)',
                    'rgba(33, 113, 205, 1)',
                    'rgba(27, 79, 148, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Gráfico de propuestas
    const proposalsCtx = document.getElementById('proposalsChart').getContext('2d');
    proposalsChart = new Chart(proposalsCtx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    'rgba(74, 144, 226, 0.8)',
                    'rgba(33, 113, 205, 0.8)',
                    'rgba(27, 79, 148, 0.8)',
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(41, 128, 185, 0.8)'
                ],
                borderColor: [
                    'rgba(74, 144, 226, 1)',
                    'rgba(33, 113, 205, 1)',
                    'rgba(27, 79, 148, 1)',
                    'rgba(52, 152, 219, 1)',
                    'rgba(41, 128, 185, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 15,
                        padding: 15
                    }
                }
            }
        }
    });
};

// Función para actualizar los resultados
const updateResults = () => {
    const votes = JSON.parse(localStorage.getItem('votes') || '{}');
    const votesArray = Object.values(votes);
    const totalVotes = votesArray.length;
    
    // Actualizar total de votos
    totalVotesElement.textContent = totalVotes;
    
    // Calcular participación (14 estudiantes totales)
    const participation = ((totalVotes / 14) * 100).toFixed(1);
    participationElement.textContent = `${participation}%`;

    // Conteo de votos por candidato
    const candidateVotes = new Array(candidates.length).fill(0);
    const proposalVotes = {};

    votesArray.forEach(vote => {
        // Contar votos por candidato
        candidateVotes[vote.candidateId - 1]++;

        // Contar votos por propuesta
        if (!proposalVotes[vote.proposal]) {
            proposalVotes[vote.proposal] = 0;
        }
        proposalVotes[vote.proposal]++;
    });

    // Actualizar gráfico de candidatos
    candidatesChart.data.datasets[0].data = candidateVotes;
    candidatesChart.update();

    // Actualizar gráfico de propuestas
    const sortedProposals = Object.entries(proposalVotes)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);

    proposalsChart.data.labels = sortedProposals.map(([proposal]) => proposal);
    proposalsChart.data.datasets[0].data = sortedProposals.map(([,count]) => count);
    proposalsChart.update();

    // Actualizar resultados detallados
    updateDetailedResults(votesArray);
};

// Función para actualizar los resultados detallados
const updateDetailedResults = (votes) => {
    const candidateResults = candidates.map(candidate => ({
        ...candidate,
        votes: 0,
        proposalVotes: {}
    }));

    // Contar votos
    votes.forEach(vote => {
        const candidate = candidateResults[vote.candidateId - 1];
        candidate.votes++;
        
        if (!candidate.proposalVotes[vote.proposal]) {
            candidate.proposalVotes[vote.proposal] = 0;
        }
        candidate.proposalVotes[vote.proposal]++;
    });

    // Generar HTML
    detailedResultsContainer.innerHTML = candidateResults
        .map(candidate => `
            <div class="border-b border-gray-200 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
                <div class="flex justify-between items-center mb-4">
                    <h4 class="text-lg font-semibold text-calatrava-dark">
                        ${candidate.name}
                    </h4>
                    <span class="text-lg font-bold text-calatrava">
                        ${candidate.votes} votos
                    </span>
                </div>
                <div class="space-y-3">
                    ${Object.entries(candidate.proposalVotes)
                        .map(([proposal, count]) => `
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">${proposal}</span>
                                <span class="font-medium text-calatrava-dark">${count} votos</span>
                            </div>
                        `)
                        .join('')}
                </div>
            </div>
        `)
        .join('');
};

// Función para cerrar sesión
const handleLogout = () => {
    sessionStorage.removeItem('userEmail');
    window.location.href = 'index.html';
};

// Event Listeners
logoutButton.addEventListener('click', handleLogout);

// Función para actualizar automáticamente
const startAutoUpdate = () => {
    updateResults();
    setInterval(updateResults, 5000); // Actualizar cada 5 segundos
};

// Inicialización
const init = () => {
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
        window.location.href = 'index.html';
        return;
    }

    studentNameElement.textContent = userEmail;
    initializeCharts();
    startAutoUpdate();
};

// Comenzar
init();
