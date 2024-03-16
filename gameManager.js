class GameManager {

    collectedFlames = 0;
    allObjects = [];
    canvas = null;

    States = {
        HOME: 0,
        PAUSE: 1,
        PLAYING: 2,
        DEAD: 3,
        WIN: 4
    }

    gameState = this.States.HOME;

    constructor() {
        console.log("Thanks to all the people who helped me make this project possible!");
        console.log("Special thanks to Tom 🦊, Marco and Manuel!");
    }

    gameLoop() {
        requestAnimationFrame(gameManager.gameLoop);

        canvas.drawingContext.clearRect(0, 0, canvas.canvasElement.width, canvas.canvasElement.height);
        gameManager.allObjects.forEach((generalObject) => {
            if (generalObject.isActive) {  
                generalObject.storePosition();
                generalObject.update();
                gameManager.checkForCollision(generalObject);
                generalObject.draw();
            }
        });
        cooldownHUD(cooldownPointer.toFixed(1));            // toFixed: how many digits after the . need to be displayed (here: 1)
        flamesHUD();
    }

    checkForCollision(object1) {
        for (let i = object1.generalObjectIndex + 1; i < gameManager.allObjects.length; i++) {
            let object2 = gameManager.allObjects[i];
            if(object2.isActive) {
                if (object1.boundaries.leftBoundary() <= object2.boundaries.rightBoundary() &&
                    object1.boundaries.rightBoundary() >= object2.boundaries.leftBoundary()) {
                        if (object1.boundaries.topBoundary() <= object2.boundaries.bottomBoundary() &&
                            object1.boundaries.bottomBoundary() >= object2.boundaries.topBoundary()) {
                                object1.onCollision(object2);
                                object2.onCollision(object1);
                        }
                }
            }
        }
    }

    
    addGameObject(objectToAdd) {
        this.allObjects.push(objectToAdd);
        objectToAdd.generalObjectIndex = this.allObjects.length - 1;  // tells objectToAdd is last position --> do this so we can later find them again in array
    }

    setCanvas(canvas) {
        this.canvas = canvas;
    }
}