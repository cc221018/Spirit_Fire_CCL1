class Flame extends ImageObject {

    constructor(name, x, y, width, height, scaledWidth, scaledHeight) {
        super(name, x, y, width, height, scaledWidth, scaledHeight);
        this.addAnimationInformation("flame_idle", 0, 3, 2, "./images/extra/spritesheet_flames_bright.png");
        this.setBoundaryOffset(15, -15, -15, 15);
        this.setCurrentAnimationByName("flame_idle");
    }

    onCollision(otherObject) {
        if(otherObject.name === "fox") {
            this.isActive = false;
            gameManager.collectedFlames++;
            playFlameAudio();
        }

        if (gameManager.allObjects.filter(object => {
            return object instanceof Flame && object.isActive;      // if all flames collected --> win
        }).length === 0) {
            gameManager.gameState = gameManager.States.WIN;
            music.stop();
            fox.moveVelocity = 0;
            fox.move.horizontally = 0;
            fox.move.vertically = 0;
            fox.isAlive = false;
            playFlameAudio();
            fox.moveVelocity = 0;
            fox.setCurrentAnimationByName("poof");
            setTimeout(() => {
                fox.isActive = false;
            }, 400);
            setTimeout(() => {
                showWinScreen();
            }, 1200);
        }
    }
}

