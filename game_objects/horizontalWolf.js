class HorizontalWolf extends ImageObject {

    moveHorizontally = 1.8;
    type;

    static Types = {
        NORMAL: 0,
        PINK: 1
    }


    constructor(name, x, y, width, height, scaledWidth, scaledHeight, type) {
        super(name, x, y, width, height, scaledWidth, scaledHeight);
        this.type = type;
        if (this.type === HorizontalWolf.Types.NORMAL) {
            this.addAnimationInformation("wolf_right", 0, 6, 7, "./images/wolf/spritesheet_wolf_right.png");
            this.addAnimationInformation("wolf_left", 0, 6, 7, "./images/wolf/spritesheet_wolf_left.png");
            this.setBoundaryOffset(10, -10, -10, 10);
            if (this.moveHorizontally > 0) {
                this.setCurrentAnimationByName("wolf_right");
            }
            else if (this.moveHorizontally < 0) {
                this.setCurrentAnimationByName("wolf_left");
            }
        }
        else if (this.type === HorizontalWolf.Types.PINK) {
            this.addAnimationInformation("wolf_right", 0, 6, 7, "./images/pink_wolf/spritesheet_pink_wolf_right.png");
            this.addAnimationInformation("wolf_left", 0, 6, 7, "./images/pink_wolf/spritesheet_pink_wolf_left.png");
            if (this.moveHorizontally > 0) {
                this.setCurrentAnimationByName("wolf_right");
                this.setBoundaryOffset(10, -10, -10, 30);
            }
            else if (this.moveHorizontally < 0) {
                this.setCurrentAnimationByName("wolf_left");
                this.setBoundaryOffset(10, -30, -10, 10);
            }
        }
    }

    update() {
        this.position.x += this.moveHorizontally;

        this.hitCanvasBoundary();
    }

    onCollision(otherObject) {
        if(otherObject.name === "wall") {
            this.moveHorizontally *= -1;
        }
        else return;


        if (this.moveHorizontally > 0) {
            this.setCurrentAnimationByName("wolf_right");
        }
        else if (this.moveHorizontally < 0) {
            this.setCurrentAnimationByName("wolf_left");
        }
    }

    hitCanvasBoundary() {
        if (this.boundaries.rightBoundary() <= gameManager.canvas.canvasBoundaries.left) {
            this.position.x = gameManager.canvas.canvasBoundaries.right - this.offsets.left;
        }
        else if (this.boundaries.leftBoundary() >= gameManager.canvas.canvasBoundaries.right) {
            this.position.x = gameManager.canvas.canvasBoundaries.left - this.dimensions.scaledWidth - this.offsets.right;
        }
    }

}