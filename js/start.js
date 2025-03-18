function startGame() {
    let startSound = document.getElementById('start-sound');
    startSound.play(); // Sonido al iniciar el juego

    let progress = document.getElementById('progress');
    let width = 0;
    let interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            window.location.href = "index1.html"; // Redirige al juego
        } else {
            width += 10;
            progress.style.width = width + '%';
        }
    }, 500);
}

function showInstructions() {
    let instructionsSound = document.getElementById('instructions-sound');
    instructionsSound.play(); // Sonido al abrir las instrucciones

    let modal = new bootstrap.Modal(document.getElementById('instructions-modal'));
    modal.show();
}
