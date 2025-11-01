// Educational app functionality for "Учимся с Зайкой Смешинкой"

// Progress tracking
let stars = 0;
const totalStars = 8;
let answeredQuestions = new Set();

// Load progress from localStorage
function loadProgress() {
    const savedStars = localStorage.getItem('bunnyStars');
    const savedAnswers = localStorage.getItem('bunnyAnswers');

    if (savedStars) {
        stars = parseInt(savedStars);
    }
    if (savedAnswers) {
        answeredQuestions = new Set(JSON.parse(savedAnswers));
    }
    updateUI();
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('bunnyStars', stars.toString());
    localStorage.setItem('bunnyAnswers', JSON.stringify([...answeredQuestions]));
}

// Update UI elements
function updateUI() {
    document.getElementById('star-count').textContent = stars;
    updateStarDisplay();
    updateAnsweredQuestions();
}

// Update star display
function updateStarDisplay() {
    const starRow = document.getElementById('star-row');
    starRow.innerHTML = '';

    for (let i = 0; i < totalStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = i < stars ? '⭐' : '☆';
        starRow.appendChild(star);
    }
}

// Update answered questions
function updateAnsweredQuestions() {
    document.querySelectorAll('.opt').forEach(btn => {
        const questionId = btn.closest('li').textContent.trim();
        if (answeredQuestions.has(questionId)) {
            btn.disabled = true;
        }
    });
}

// Check answer and award star
function checkAnswer(button, isCorrect) {
    const questionLi = button.closest('li');
    const questionId = questionLi.textContent.trim();

    // Prevent multiple answers for same question
    if (answeredQuestions.has(questionId)) {
        return;
    }

    // Disable all options for this question
    questionLi.querySelectorAll('.opt').forEach(btn => {
        btn.disabled = true;
    });

    // Visual feedback
    if (isCorrect) {
        button.style.background = '#4CAF50';
        button.style.color = 'white';
        stars++;
        answeredQuestions.add(questionId);
        saveProgress();
        updateUI();

        // Celebration effect
        createParticles(button);
        playSound('success');
    } else {
        button.style.background = '#f44336';
        button.style.color = 'white';

        // Show correct answer
        setTimeout(() => {
            questionLi.querySelectorAll('.opt').forEach(btn => {
                const isCorrectBtn = btn.onclick.toString().includes('true');
                if (isCorrectBtn) {
                    btn.style.background = '#4CAF50';
                    btn.style.color = 'white';
                }
            });
        }, 1000);
    }
}

// Mini-games functionality
function playGame(gameType) {
    let message = '';

    switch(gameType) {
        case 'carrot':
            message = '🥕 Найди 3 морковки на картинке!\n(Игра запускается...)';
            // Here you would implement the actual game
            break;
        case 'odd':
            message = '🤔 Что лишнее: яблоко, груша, машина?\n(Игра запускается...)';
            // Here you would implement the actual game
            break;
    }

    alert(message);
}

// Reset progress
function resetProgress() {
    if (confirm('Вы уверены, что хотите сбросить весь прогресс?')) {
        stars = 0;
        answeredQuestions.clear();
        saveProgress();
        updateUI();

        // Re-enable all buttons
        document.querySelectorAll('.opt').forEach(btn => {
            btn.disabled = false;
            btn.style.background = 'white';
            btn.style.color = 'inherit';
        });
    }
}

// Particle effect for correct answers
function createParticles(button) {
    const rect = button.getBoundingClientRect();

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: #FFD700;
            border-radius: 50%;
            pointer-events: none;
            animation: particle 1s ease-out forwards;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            z-index: 1000;
        `;

        document.body.appendChild(particle);

        // Random direction
        const angle = (Math.PI * 2 * i) / 8;
        const distance = 60 + Math.random() * 40;
        particle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');

        setTimeout(() => particle.remove(), 1000);
    }
}

// Sound effects (placeholder)
function playSound(type) {
    // In a real app, you would play actual sound files
    console.log(`🔊 Playing ${type} sound`);
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();

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

    console.log('🐰 Зайка Смешинка загружена! Приятного обучения!');
    console.log('💡 Отвечайте на вопросы и собирайте звёздочки!');
});
