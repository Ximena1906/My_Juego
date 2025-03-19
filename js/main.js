const light = document.getElementById('light'); // Elemento de luz (puntero del jugador)
const levelDisplay = document.getElementById('level'); // Muestra el nivel actual
const starsDisplay = document.getElementById('stars'); // Muestra la cantidad de estrellas recogidas
const scoreDisplay = document.getElementById('score'); // Muestra el mejor puntaje

// Variables del juego
let stars = 0; // Contador de estrellas recogidas
let level = 1; // Nivel actual
let batSpeed = 2; // Velocidad inicial de los murciélagos
let batCount = 10; // Cantidad inicial de murciélagos
let bats = []; // Lista de murciélagos
let gameOver = false; // Estado del juego
let playerName = localStorage.getItem('playerName') || ''; // Obtiene el nombre del jugador o lo pide
let maxLevel = localStorage.getItem('maxLevel') || 1; // Obtiene el nivel máximo alcanzado

// Solicita el nombre del jugador si no está guardado
if (!playerName) {
    playerName = prompt('Ingresa tu nombre:');
    localStorage.setItem('playerName', playerName);
}

// Muestra el mejor puntaje en pantalla
scoreDisplay.textContent = `Mejor Puntaje: ${playerName} - Nivel ${maxLevel}`;

// Música de fondo del juego
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

// Movimiento de la luz según el puntero del ratón
document.addEventListener('mousemove', (e) => {
    light.style.left = `${e.clientX - 100}px`;
    light.style.top = `${e.clientY - 100}px`;
});

// Crea un murciélago en una posición aleatoria
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

// Mueve los murciélagos hacia el jugador
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
            endGame(); // Termina el juego si un murciélago atrapa al jugador
        }
    });

    requestAnimationFrame(moveBats);
}

// Crea una estrella en una posición aleatoria
function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    document.querySelector('.game-container').appendChild(star);
    
    let x = Math.random() * (document.querySelector('.game-container').clientWidth - 50);
    let y = Math.random() * (document.querySelector('.game-container').clientHeight - 50);
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    
    // Evento de recogida de estrella
    star.addEventListener('click', () => {
        const sound = new Audio('./Sonido/Cute sound.mp3');
        sound.play();
        
        stars++;
        starsDisplay.textContent = `Estrellas: ${stars}`;
        star.remove();
        if (stars % 10 === 0) {
            nextLevel(); // Sube de nivel tras recoger 10 estrellas
        }
        createStar();
    });
}

// Función para avanzar al siguiente nivel
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

// Reinicia el estado del juego para el siguiente nivel
function resetGame() {
    document.querySelectorAll('.bat').forEach(bat => bat.remove());
    bats = [];
    for (let i = 0; i < batCount; i++) {
        createBat();
    }
}

// Termina el juego si el jugador es atrapado por un murciélago
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

// Inicia el juego
resetGame();
createStar();
moveBats();