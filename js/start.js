function startGame() {
    // Obtiene el elemento de audio para el sonido de inicio
    let startSound = document.getElementById('start-sound');
    startSound.play(); // Reproduce el sonido al iniciar el juego

    // Obtiene la barra de progreso
    let progress = document.getElementById('progress');
    let width = 0;
    
    // Inicia un intervalo para aumentar la barra de progreso
    let interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval); // Detiene el intervalo cuando llega al 100%
            window.location.href = "index1.html"; // Redirige al juego principal
        } else {
            width += 10; // Incrementa la barra de progreso en un 10%
            progress.style.width = width + '%'; // Actualiza el ancho de la barra
        }
    }, 500); // Cada medio segundo
}

function showInstructions() {
    // Obtiene el elemento de audio para el sonido de instrucciones
    let instructionsSound = document.getElementById('instructions-sound');
    instructionsSound.play(); // Reproduce el sonido al abrir las instrucciones

    // Muestra el modal de instrucciones usando Bootstrap
    let modal = new bootstrap.Modal(document.getElementById('instructions-modal'));
    modal.show();
}
