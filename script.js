// Duolingo-style Educational App "Учимся с Зайкой Смешинкой"

// App state
let currentScreen = 'welcome';
let currentQuestionIndex = 0;
let stars = 0;
let correctAnswers = 0;
let answeredQuestions = new Set();

// Questions database
const questions = [
    // Colors and shapes
    { text: "Какого цвета яблоко?", icon: "🍎", options: ["красное", "синий"], correct: 0, category: "colors" },
    { text: "Какая форма — круг?", icon: "🔵", options: ["Да", "Нет"], correct: 0, category: "shapes" },
    { text: "Какого цвета мяч?", icon: "⚽", options: ["зелёный", "жёлтый"], correct: 1, category: "colors" },

    // Nature and environment
    { text: "Где растут деревья?", icon: "🌳", options: ["в лесу", "в воде"], correct: 0, category: "nature" },
    { text: "Кто даёт молоко?", icon: "🐄", options: ["корова", "рыба"], correct: 0, category: "animals" },
    { text: "Где живёт рыба?", icon: "🐠", options: ["в воде", "в небе"], correct: 0, category: "nature" },

    // Math
    { text: "Сколько пальцев на руке?", icon: "✋", options: ["3", "5"], correct: 1, category: "math" },
    { text: "1 + 1 = ?", icon: "🔢", options: ["2", "3"], correct: 0, category: "math" },
    { text: "Сколько у зайца ушей?", icon: "🐰", options: ["2", "4"], correct: 0, category: "math" },

    // Speech and language
    { text: "Как скажешь: \"мама\" — это кто?", icon: "👨‍👩‍👧", options: ["мама", "папа"], correct: 0, category: "speech" },
    { text: "Что делает кот?", icon: "🐱", options: ["мяукает", "лает"], correct: 0, category: "speech" },
    { text: "Подбери рифму к слову \"дом\":", icon: "🏠", options: ["чем", "сном"], correct: 1, category: "speech" },

    // Logic and thinking
    { text: "Что лишнее: яблоко, груша, стул?", icon: "🤔", options: ["стул", "яблоко"], correct: 0, category: "logic" },
    { text: "Какое животное летает?", icon: "🦅", options: ["птица", "корова"], correct: 0, category: "logic" },
    { text: "Какой предмет нужен, чтобы писать?", icon: "✏️", options: ["ложка", "карандаш"], correct: 1, category: "logic" },

    // Emotions and communication
    { text: "Если ты улыбаешься — ты:", icon: "😊", options: ["рад", "зол"], correct: 0, category: "emotions" },
    { text: "Если тебе грустно — ты можешь:", icon: "😢", options: ["поговорить", "кушать"], correct: 0, category: "emotions" },
    { text: "Что помогает дружить?", icon: "👫", options: ["доброта", "ссора"], correct: 0, category: "emotions" }
];

// Category icons mapping
const categoryIcons = {
    colors: "🎨",
    shapes: "🔵",
    nature: "🌿",
    animals: "🐾",
    math: "🔢",
    speech: "🗣️",
    logic: "🧠",
    emotions: "😊"
};

// Screen management
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;
}

// Start lesson
function startLesson() {
    loadProgress();
    currentQuestionIndex = 0;
    showScreen('question-screen');
    showQuestion();
}

// Show current question
function showQuestion() {
    const question = questions[currentQuestionIndex];
    const questionCard = document.getElementById('question-card');
    const optionsContainer = document.getElementById('options');

    // Update question content
    document.getElementById('question-icon').textContent = question.icon;
    document.getElementById('question-text').textContent = question.text;

    // Update progress
    document.getElementById('current-q').textContent = currentQuestionIndex + 1;
    document.getElementById('total-q').textContent = questions.length;
    document.getElementById('current-stars').textContent = stars;

    // Update progress bar
    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = progressPercent + '%';

    // Create options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectAnswer(index, question.correct);
        optionsContainer.appendChild(button);
    });

    // Update navigation buttons
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    document.getElementById('next-btn').disabled = true;
}

// Select answer
function selectAnswer(selectedIndex, correctIndex) {
    const buttons = document.querySelectorAll('.option-btn');

    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);

    // Show feedback
    if (selectedIndex === correctIndex) {
        buttons[selectedIndex].classList.add('correct');
        stars++;
        correctAnswers++;
        createParticles(buttons[selectedIndex]);
        playSound('correct');
    } else {
        buttons[selectedIndex].classList.add('incorrect');
        buttons[correctIndex].classList.add('correct');
        playSound('incorrect');
    }

    // Enable next button
    document.getElementById('next-btn').disabled = false;
}

// Next question
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        // Show results
        showResults();
    } else {
        // Show next question
        showQuestion();
    }
}

// Previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

// Show results screen
function showResults() {
    showScreen('results-screen');

    // Update results
    document.getElementById('final-stars').textContent = stars;
    document.getElementById('final-correct').textContent = correctAnswers;
    document.getElementById('final-percentage').textContent = Math.round((correctAnswers / questions.length) * 100) + '%';

    // Generate result message
    let message = '';
    const percentage = (correctAnswers / questions.length) * 100;

    if (percentage >= 90) {
        message = 'Отлично! Ты настоящий молодец! 🎉';
    } else if (percentage >= 70) {
        message = 'Хорошо! Продолжай в том же духе! 👍';
    } else if (percentage >= 50) {
        message = 'Неплохо! Попробуй ещё раз! 💪';
    } else {
        message = 'Ничего страшного! Повторение - мать учения! 📚';
    }

    document.getElementById('result-message').textContent = message;

    // Show stars
    const starRow = document.getElementById('final-star-row');
    starRow.innerHTML = '';
    for (let i = 0; i < Math.min(stars, 8); i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = '⭐';
        starRow.appendChild(star);
    }

    // Save progress
    saveProgress();
}

// Reset progress
function resetProgress() {
    if (confirm('Вы уверены, что хотите сбросить весь прогресс и начать заново?')) {
        stars = 0;
        correctAnswers = 0;
        currentQuestionIndex = 0;
        answeredQuestions.clear();
        saveProgress();
        showScreen('welcome-screen');
    }
}

// Share results
function shareResults() {
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    const message = `Я прошел урок "Учимся с Зайкой Смешинкой"! Правильных ответов: ${correctAnswers}/${questions.length} (${percentage}%) ⭐${stars}`;

    if (navigator.share) {
        navigator.share({
            title: 'Учимся с Зайкой Смешинкой',
            text: message,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(message + '\n' + window.location.href).then(() => {
            alert('Результаты скопированы в буфер обмена!');
        });
    }
}

// Progress management
function loadProgress() {
    const saved = localStorage.getItem('bunnyLessonProgress');
    if (saved) {
        const data = JSON.parse(saved);
        stars = data.stars || 0;
        correctAnswers = data.correctAnswers || 0;
        answeredQuestions = new Set(data.answeredQuestions || []);
    }
}

function saveProgress() {
    const data = {
        stars,
        correctAnswers,
        answeredQuestions: [...answeredQuestions],
        lastCompleted: new Date().toISOString()
    };
    localStorage.setItem('bunnyLessonProgress', JSON.stringify(data));
}

// Particle effects
function createParticles(button) {
    const rect = button.getBoundingClientRect();

    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: #FFD700;
            border-radius: 50%;
            pointer-events: none;
            animation: particle 1.2s ease-out forwards;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            z-index: 1000;
        `;

        document.body.appendChild(particle);

        // Random direction
        const angle = (Math.PI * 2 * i) / 12;
        const distance = 80 + Math.random() * 60;
        particle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');

        setTimeout(() => particle.remove(), 1200);
    }
}

// Sound effects
function playSound(type) {
    // Create audio context for sound effects
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        if (type === 'correct') {
            // Play success sound
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } else if (type === 'incorrect') {
            // Play error sound
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.2);

            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.4);
        }
    } catch (e) {
        // Fallback: no sound
        console.log('🔊 Sound effect:', type);
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Add particle animation styles
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particle {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(var(--x), var(--y)) scale(0);
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Load progress and show welcome screen
    loadProgress();
    showScreen('welcome-screen');

    console.log('🐰 Зайка Смешинка готова к обучению!');
    console.log('🎯 Duolingo-style интерфейс загружен!');
});
