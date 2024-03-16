class Player extends ImageObject {

    moveVelocity = 2;
    dashVelocity = 5;
    isAlive = true;

    hasKey = false;

    move = {
        "horizontally": 0,
        "vertically": 0
    };

    constructor(name, x, y, width, height, scaledWidth, scaledHeight) {
        super(name, x, y, width, height, scaledWidth, scaledHeight);

        // this.setBoundaryOffset(12, -5, -12, 8);
        this.setBoundaryOffset(16, -10, -16, 12);

        this.addAnimationInformation("idle_left", 0, 4, 3, "./images/fox/fox_idle_left.png");
        this.addAnimationInformation("idle_right", 0, 4, 3, "./images/fox/spritesheet_idle_fox_right.png");
        this.addAnimationInformation("idle_up", 0, 4, 3, "./images/fox/spritesheet_idle_fox_up.png");
        this.addAnimationInformation("idle_down", 0, 4, 3, "./images/fox/spritesheet_idle_fox_down.png");
        
        this.addAnimationInformation("run_left", 0, 6, 7, "./images/fox/spritesheet_fox_left.png");
        this.addAnimationInformation("run_right", 0, 6, 7, "./images/fox/spritesheet_fox_right.png");
        this.addAnimationInformation("run_up", 0, 5, 6, "./images/fox/spritesheet_fox_up.png");
        this.addAnimationInformation("run_down", 0, 5, 6, "./images/fox/spritesheet_fox_down.png");

        this.addAnimationInformation("dash_left", 0, 4, 10, "./images/fox/spritesheet_dash_left.png");
        this.addAnimationInformation("dash_right", 0, 4, 10, "./images/fox/spritesheet_dash_right.png");
        this.addAnimationInformation("dash_up", 0, 5, 10, "./images/fox/spritesheet_dash_up.png");
        this.addAnimationInformation("dash_down", 0, 5, 10, "./images/fox/spritesheet_dash_down.png");

        this.addAnimationInformation("bark_left", 0, 4, 5, "./images/fox/spritesheet_woof_left.png");
        this.addAnimationInformation("bark_right", 0, 4, 5, "./images/fox/spritesheet_woof_right.png");
        this.addAnimationInformation("bark_up", 0, 4, 5, "./images/fox/spritesheet_bark_up.png");
        this.addAnimationInformation("bark_down", 0, 4, 5, "./images/fox/spritesheet_bark_down.png");

        this.addAnimationInformation("poof", 0, 8, 9, "./images/extra/spritesheet_poof.png");

        this.setCurrentAnimationByName("idle_right");
    }

    update() {
        this.position.x += this.move.horizontally;
        this.position.y += this.move.vertically;

        this.hitCanvasBoundary();
    }

    hitCanvasBoundary() {
        if (this.boundaries.bottomBoundary() <= gameManager.canvas.canvasBoundaries.top) {
            this.position.y = gameManager.canvas.canvasBoundaries.bottom - this.offsets.top;
        }
        else if (this.boundaries.topBoundary() >= gameManager.canvas.canvasBoundaries.bottom) {
            this.position.y = gameManager.canvas.canvasBoundaries.top - this.dimensions.scaledHeight - this.offsets.bottom;
        }
        else if (this.boundaries.rightBoundary() <= gameManager.canvas.canvasBoundaries.left) {
            this.position.x = gameManager.canvas.canvasBoundaries.right - this.offsets.left;
        }
        else if (this.boundaries.leftBoundary() >= gameManager.canvas.canvasBoundaries.right) {
            this.position.x = gameManager.canvas.canvasBoundaries.left - this.dimensions.scaledWidth - this.offsets.right;
        }
    }

    onCollision(otherObject) {
        if (gameManager.gameState !== gameManager.States.PLAYING) return;        // no Collisions in background of death/win screen
        if (otherObject.name === "horizontal_wolf" || otherObject.name === "vertical_wolf") {
            gameManager.gameState = gameManager.States.DEAD;
            music.stop();
            deathAudio.play();
            fox.moveVelocity = 0;
            fox.move.horizontally = 0;
            fox.move.vertically = 0;
            fox.isAlive = false;
            fox.setCurrentAnimationByName("poof");
            setTimeout(() => {
                fox.isActive = false;
            }, 400);
            setTimeout(() => {
                showDeathScreen();
            }, 1800);
        }
    }


}