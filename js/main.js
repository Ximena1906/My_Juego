const light = document.getElementById('light');
const levelDisplay = document.getElementById('level');
const starsDisplay = document.getElementById('stars');
const scoreDisplay = document.getElementById('score');

let stars = 0;
let level = 1;
let batSpeed = 2;
let batCount = 10;
let bats = [];
let gameOver = false;
let playerName = localStorage.getItem('playerName') || ''; 
let maxLevel = localStorage.getItem('maxLevel') || 1;

if (!playerName) {
    playerName = prompt('Ingresa tu nombre:');
    localStorage.setItem('playerName', playerName);
}

scoreDisplay.textContent = `Mejor Puntaje: ${playerName} - Nivel ${maxLevel}`;

const backgroundMusic = new Audio('./Sonido/Zelda 020.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

// Inicia la música de fondo con un clic en la página
document.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(error => console.log('Error al reproducir audio:', error));
    }
}, { once: true });

// Intenta reproducir la música tras cargar la página
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        backgroundMusic.play().catch(error => console.log('Error al reproducir audio:', error));
    }, 1000);
});

document.addEventListener('mousemove', (e) => {
    light.style.left = `${e.clientX - 100}px`;
    light.style.top = `${e.clientY - 100}px`;
});

function createBat() {
    const bat = document.createElement('div');
    bat.classList.add('bat');
    document.querySelector('.game-container').appendChild(bat);
    
    let x = Math.random() * (document.querySelector('.game-container').clientWidth - 50);
    let y = Math.random() * (document.querySelector('.game-container').clientHeight - 50);
    bat.style.left = `${x}px`;
    bat.style.top = `${y}px`;
    
    bats.push({ element: bat, x, y });
}

function moveBats() {
    if (gameOver) return;

    const playerX = light.offsetLeft + 100;
    const playerY = light.offsetTop + 100;

    bats.forEach(bat => {
        let dx = playerX - bat.x;
        let dy = playerY - bat.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 5) {
            bat.x += (dx / dist) * batSpeed;
            bat.y += (dy / dist) * batSpeed;
            bat.element.style.left = `${bat.x}px`;
            bat.element.style.top = `${bat.y}px`;
        } else {
            endGame();
        }
    });

    requestAnimationFrame(moveBats);
}

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    document.querySelector('.game-container').appendChild(star);
    
    let x = Math.random() * (document.querySelector('.game-container').clientWidth - 50);
    let y = Math.random() * (document.querySelector('.game-container').clientHeight - 50);
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    
    star.addEventListener('click', () => {
        const sound = new Audio('./Sonido/Cute sound.mp3');
        sound.play();
        
        stars++;
        starsDisplay.textContent = `Estrellas: ${stars}`;
        star.remove();
        if (stars % 10 === 0) {
            nextLevel();
        }
        createStar();
    });
}

function nextLevel() {
    level++;
    levelDisplay.textContent = `Nivel: ${level}`;
    batSpeed += 1;
    batCount += 5;

    if (level > maxLevel) {
        maxLevel = level;
        localStorage.setItem('maxLevel', maxLevel);
        scoreDisplay.textContent = `Mejor Puntaje: ${playerName} - Nivel ${maxLevel}`;
    }

    alert(`¡Felicidades! Has alcanzado el nivel ${level}.`);
    resetGame();
}

function resetGame() {
    document.querySelectorAll('.bat').forEach(bat => bat.remove());
    bats = [];
    for (let i = 0; i < batCount; i++) {
        createBat();
    }
}

function endGame() {
    gameOver = true;
    alert('¡Un murciélago te ha atrapado! Juego terminado.');

    if (confirm('¿Quieres jugar de nuevo?')) {
        gameOver = false;
        stars = 0;
        level = 1;
        batSpeed = 2;
        batCount = 10;
        starsDisplay.textContent = 'Estrellas: 0';
        levelDisplay.textContent = 'Nivel: 1';
        resetGame();
        createStar();
        moveBats();
    }
}

resetGame();
createStar();
moveBats();
