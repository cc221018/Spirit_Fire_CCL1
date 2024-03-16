
const startScreen = document.querySelector('.startScreen');
const canvasScreen = document.querySelector('.canvas');
const deathScreen = document.querySelector('.deathScreen');
const winScreen = document.querySelector('.winScreen');
const biomes = document.querySelector('.biomes');
const level1to5 = document.querySelector('.level1to5');
const level6to10 = document.querySelector('.level6to10');
const pauseScreen = document.querySelector('.pauseScreen');

let determineLevel = 0;


function showStartScreen() {
    gameManager.gameState = gameManager.States.HOME;
    buttonAudio.play();
    startScreen.style.display = 'block';
    canvasScreen.style.display = 'none';
    deathScreen.style.display = 'none';
    winScreen.style.display = 'none';
    pauseScreen.style.display = 'none';
    level1to5.style.display = 'none';
    level6to10.style.display = 'none';
    biomes.style.display = 'block';
}

function showDeathScreen() {
    gameManager.gameState = gameManager.States.DEAD;
    canvasScreen.style.display = 'none';
    deathScreen.style.display = 'block';
}

function showWinScreen() {
    gameManager.gameState = gameManager.States.HOME;
    canvasScreen.style.display = 'none';
    winScreen.style.display = 'block';
    deathScreen.style.display = 'none';

    if (determineLevel === 1) {
        next.innerHTML = "Next Level (2)";
    }
    else if (determineLevel === 2) {
        next.innerHTML = "Next Level (3)";
    }
    else if (determineLevel === 3) {
        next.innerHTML = "Next Level (4)";
    }
    else if (determineLevel === 4) {
        next.innerHTML = "Next Level (5)";
    }
    else if (determineLevel === 5) {
        next.innerHTML = "Next Level (6)";
    }
    else if (determineLevel === 6) {
        next.innerHTML = "Next Level (7)";
    }
    else if (determineLevel === 7) {
        next.innerHTML = "Next Level (8)";
    }
    else if (determineLevel === 8) {
        next.innerHTML = "Next Level (9)";
    }
    else if (determineLevel === 9) {
        next.innerHTML = "Next Level (10)";
    }
    else if (determineLevel === 10) {
        next.innerHTML = "Next Level (coming Soon)";
    }
}

function cooldownHUD(cooldown) {
    gameManager.canvas.drawingContext.font = "30px pixel";
    gameManager.canvas.drawingContext.fillStyle = "#D2FEFF";
    gameManager.canvas.drawingContext.fillText(`Dash: ${cooldown}s`, 30, 100); 
}

function flamesHUD() {
    gameManager.canvas.drawingContext.font = "30px pixel";
    gameManager.canvas.drawingContext.fillStyle = "#D2FEFF";
    gameManager.canvas.drawingContext.fillText(`Flames: ${gameManager.collectedFlames}/${gameManager.allObjects.filter(object => object instanceof Flame).length}`, 30, 50); 
}

function retryLevel() {
    gameManager.gameState = gameManager.States.PLAYING;
    levelButtonAudio.play();
    if (determineLevel === 1) startLevel1();
    else if (determineLevel === 2) startLevel2();
    else if (determineLevel === 3) startLevel3();
    else if (determineLevel === 4) startLevel4();
    else if (determineLevel === 5) startLevel5();
    else if (determineLevel === 6) startLevel6();
    else if (determineLevel === 7) startLevel7();
    else if (determineLevel === 8) startLevel8();
    else if (determineLevel === 9) startLevel9();
    else if (determineLevel === 10) startLevel10();
}

function tryNextLevel() {
    gameManager.gameState = gameManager.States.PLAYING;
    levelButtonAudio.play();
    if (determineLevel === 1) {
        startLevel2();
    }
    else if (determineLevel === 2) {
        startLevel3();
    }
    else if (determineLevel === 3) {
        startLevel4();
    }
    else if (determineLevel === 4) {
        startLevel5();
    }
    else if (determineLevel === 5) {
        startLevel6();
    }
    else if (determineLevel === 6) {
        startLevel7();
    }
    else if (determineLevel === 7) {
        startLevel8();
    }
    else if (determineLevel === 8) {
        startLevel9();
    }
    else if (determineLevel === 9) {
        startLevel10();
    }
    else if (determineLevel === 10) {
    }
}

function showLevel1to5() {
    buttonAudio.play();
    biomes.style.display = 'none';
    level1to5.style.display = 'block';
}

function showLevel6to10() {
    buttonAudio.play();
    biomes.style.display = 'none';
    level6to10.style.display = 'block';
}

function showBiomes() {
    buttonAudio.play();
    biomes.style.display = 'block';
    level1to5.style.display = 'none';
    level6to10.style.display = 'none';
}

function showPauseScreen(e) {
    if(e.which === 27) {
        if(gameManager.gameState === gameManager.States.PAUSE) {
            showCanvasScreen();
        }
        else if(gameManager.gameState === gameManager.States.PLAYING) {
            gameManager.gameState = gameManager.States.PAUSE;
            buttonAudio.play();
            music.pause();
            pauseScreen.style.display = 'block';
            canvasScreen.style.display = 'none';
        }
    }
}

function showCanvasScreen() {
    gameManager.gameState = gameManager.States.PLAYING;
    levelButtonAudio.play();
    music.play();
    pauseScreen.style.display = 'none';
    canvasScreen.style.display = 'block';
}

window.addEventListener("keydown", showPauseScreen);

