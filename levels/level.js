class Level {

    constructor() {
        gameManager.collectedFlames = 0;
        gameManager.allObjects = [];
    }

    startlevel(level) {
        gameManager.gameState = gameManager.States.PLAYING;
        levelButtonAudio.play();
        music.currentTime = 0;
        music.play();
        startScreen.style.display = 'none';
        canvasScreen.style.display = 'block';
        deathScreen.style.display = 'none';
        winScreen.style.display = 'none';
        determineLevel = level;
    }
}