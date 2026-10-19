let currentPhase = 1;
let crystalsCollected = 0;
let playerX = 50;
let playerY = 20;

const phasesData = {
    1: {
        title: "Fase 1: A Crosta Terrestre",
        itemSymbol: "💎",
        targetCount: 3,
        question: "Qual é a camada mais fina e externa da Terra, onde vivemos?",
        options: ["Manto Terrestre", "Crosta Terrestre", "Núcleo Externo"],
        correct: 1
    },
    2: {
        title: "Fase 2: O Manto",
        itemSymbol: "🔥",
        targetCount: 3,
        question: "Como se chama o material rochoso derretido e pastoso localizado no manto?",
        options: ["Magma", "Granito Sólido", "Água Fervendo"],
        correct: 0
    },
    3: {
        title: "Fase 3: O Núcleo",
        itemSymbol: "⭐",
        targetCount: 3,
        question: "Quais são os dois principais metais que formam o núcleo da Terra?",
        options: ["Ouro e Prata", "Ferro e Níquel", "Cobre e Alumínio"],
        correct: 1
    }
};

function startGame() {
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    loadPhase(1);
}

function restartGame() {
    document.getElementById('win-screen').classList.remove('active');
    document.getElementById('start-screen').classList.add('active');
    currentPhase = 1;
    crystalsCollected = 0;
}

function loadPhase(phaseNum) {
    currentPhase = phaseNum;
    crystalsCollected = 0;
    document.getElementById('crystal-count').textContent = crystalsCollected;

    const data = phasesData[phaseNum];
    document.getElementById('phase-title').textContent = data.title;
    
    const arena = document.getElementById('game-arena');
    arena.className = "";
    arena.classList.add(phaseNum === 1 ? 'crosta' : phaseNum === 2 ? 'manto' : 'nucleo');
    
    document.getElementById('objective-item').textContent = data.itemSymbol;
    moveItemRandomly();
}

function moveItemRandomly() {
    const item = document.getElementById('objective-item');
    const randomX = Math.floor(Math.random() * 60) + 20;
    const randomY = Math.floor(Math.random() * 50) + 20;
    item.style.left = randomX + '%';
    item.style.top = randomY + '%';
    item.style.display = 'block';
}

window.addEventListener('keydown', (e) => {
    const gameScreen = document.getElementById('game-screen');
    const quizPanel = document.getElementById('quiz-panel');
    if (!gameScreen.classList.contains('active') || !quizPanel.classList.contains('hidden')) return;

    const player = document.getElementById('player');
    const step = 6;
    if (e.key === 'ArrowRight' && playerX < 90) playerX += step;
    if (e.key === 'ArrowLeft' && playerX > 5) playerX -= step;
    if (e.key === 'ArrowUp' && playerY < 75) playerY += step;
    if (e.key === 'ArrowDown' && playerY > 10) playerY -= step;

    player.style.left = playerX + '%';
    player.style.bottom = playerY + '%';
});

function collectItem() {
    crystalsCollected++;
    document.getElementById('crystal-count').textContent = crystalsCollected;

    if (crystalsCollected < phasesData[currentPhase].targetCount) {
        moveItemRandomly();
    } else {
        document.getElementById('objective-item').style.display = 'none';
        triggerQuiz(currentPhase);
    }
}

function triggerQuiz(phaseNum) {
    const data = phasesData[phaseNum];
    document.getElementById('question-text').textContent = data.question;
    const container = document.getElementById('options-container');
    container.innerHTML = '';

    data.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.textContent = optText;
        btn.className = 'option-btn';
        btn.onclick = () => checkAnswer(idx, data.correct);
        container.appendChild(btn);
    });

    document.getElementById('quiz-panel').classList.remove('hidden');
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        document.getElementById('quiz-panel').classList.add('hidden');
        if (currentPhase < 3) {
            alert("Correto! Descendo para a próxima camada...");
            loadPhase(currentPhase + 1);
        } else {
            document.getElementById('game-screen').classList.remove('active');
            document.getElementById('win-screen').classList.add('active');
        }
    } else {
        alert("Ops! Resposta incorreta. Tente novamente.");
    }
}
