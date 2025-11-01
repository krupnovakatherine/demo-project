// Interactive functionality for the demo project

// Function to show a random message when button is clicked
function showMessage() {
    const messages = [
        "🎉 Wow! You clicked the button!",
        "🚀 Amazing! Keep exploring!",
        "💡 Great choice! Technology is fun!",
        "🌟 You're awesome! Thanks for trying!",
        "🎨 Creativity is in the air!",
        "💪 Keep up the great work!"
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const messageElement = document.getElementById('message');

    messageElement.textContent = randomMessage;
    messageElement.classList.add('show');

    // Hide message after 3 seconds
    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 3000);
}

// Add click effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });

        // Add keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        card.setAttribute('tabindex', '0');
    });

    // Add some fun animations on load
    setTimeout(() => {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'bounce 0.6s ease';
            }, index * 100);
        });
    }, 1000);
});

// Add bounce animation
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
`;
document.head.appendChild(style);

// Add particle effect on button click
function createParticles() {
    const button = document.querySelector('.action-btn');
    const rect = button.getBoundingClientRect();

    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #ffd700;
            border-radius: 50%;
            pointer-events: none;
            animation: particle 1s ease-out forwards;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
        `;

        document.body.appendChild(particle);

        // Random direction
        const angle = (Math.PI * 2 * i) / 10;
        const distance = 50 + Math.random() * 50;
        particle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');

        setTimeout(() => particle.remove(), 1000);
    }
}

// Update button click to include particles
document.addEventListener('DOMContentLoaded', function() {
    const originalButton = document.querySelector('.action-btn');
    if (originalButton) {
        originalButton.addEventListener('click', createParticles);
    }
});

// Add particle animation
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

// Console message for developers
console.log('🎨 Demo project loaded! Check out the interactive features.');
console.log('💡 Pro tip: Try clicking the cards and the button for different effects!');
