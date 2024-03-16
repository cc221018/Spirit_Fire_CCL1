class VerticalWolf extends ImageObject {

    moveVertically = 1.8;
    type;

    static Types = {
        NORMAL: 0,
        PINK: 1
    }

    constructor(name, x, y, width, height, scaledWidth, scaledHeight, type) {
        super(name, x, y, width, height, scaledWidth, scaledHeight);
        this.type = type;
        if (this.type === VerticalWolf.Types.NORMAL) {
            this.addAnimationInformation("wolf_down", 0, 5, 6, "./images/wolf/spritesheet_wolf_down.png");
            this.addAnimationInformation("wolf_up", 0, 5, 6, "./images/wolf/spritesheet_wolf_up.png");
            this.setBoundaryOffset(10, -10, -10, 10);
            if (this.moveVertically > 0) {
                this.setCurrentAnimationByName("wolf_down");
            }
            else if (this.moveVertically < 0) {
                this.setCurrentAnimationByName("wolf_up");
            }
        }
        else if (this.type === VerticalWolf.Types.PINK) {
            this.addAnimationInformation("wolf_down", 0, 5, 6, "./images/pink_wolf/spritesheet_pink_wolf_down.png");
            this.addAnimationInformation("wolf_up", 0, 5, 6, "./images/pink_wolf/spritesheet_pink_wolf_up.png");
            if (this.moveVertically > 0) {
                this.setCurrentAnimationByName("wolf_down");
                this.setBoundaryOffset(30, -10, -10, 10);
            }
            else if (this.moveVertically < 0) {
                this.setCurrentAnimationByName("wolf_up");
                this.setBoundaryOffset(10, -10, -30, 10);
            }
        }
    }

    update() {
        this.position.y += this.moveVertically;

        this.hitCanvasBoundary();
    }

    onCollision(otherObject) {
        if (otherObject.name === "wall") {
            this.moveVertically *= -1;
        }
        else return;

        if (this.moveVertically > 0) {
            this.setCurrentAnimationByName("wolf_down");
        }
        else if (this.moveVertically < 0) {
            this.setCurrentAnimationByName("wolf_up");
        }
    }

    hitCanvasBoundary() {
        if (this.boundaries.bottomBoundary() <= gameManager.canvas.canvasBoundaries.top) {
            this.position.y = gameManager.canvas.canvasBoundaries.bottom - this.offsets.top;
        }
        else if (this.boundaries.topBoundary() >= gameManager.canvas.canvasBoundaries.bottom) {
            this.position.y = gameManager.canvas.canvasBoundaries.top - this.dimensions.scaledHeight - this.offsets.bottom;
        }
    }
}