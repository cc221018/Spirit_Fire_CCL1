class GeneralObject {
    name = "";
    isActive = true;

    position = {
        "x": 90,
        "y": 90
    };

    prevPosition = {
        "x": 90,
        "y": 90
    };

    dimensions = {
        "width": 0,
        "height": 0,
        "scaledWidth": 0,
        "scaledHeight": 0
    };

    offsets = {
        "top": 0,
        "right": 0,
        "bottom": 0,
        "left": 0
    }

    boundaries = {
        "leftBoundary": () => {
            return this.position.x + this.offsets.left;
        },
        "rightBoundary": () => {
            if (this.dimensions.scaledWidth) {
                return this.position.x + this.dimensions.scaledWidth + this.offsets.right;
            }
            return this.position.x + this.dimensions.width + this.offsets.right;
        },
        "topBoundary": () => {
            return this.position.y + this.offsets.top;
        },
        "bottomBoundary": () => {
            if (this.dimensions.scaledHeight) {
                return this.position.y + this.dimensions.scaledHeight + this.offsets.bottom;
            }
            return this.position.y + this.dimensions.height + this.offsets.bottom;
        }
    }

    constructor(name, x, y, width, height) {
        this.name = name;
        this.position.x = x;
        this.position.y = y;
        this.dimensions.width = width;
        this.dimensions.height = height;
        gameManager.addGameObject(this);
    }

    storePosition() {
        this.prevPosition.x = this.position.x;   
        this.prevPosition.y = this.position.y;
    }

    restorePosition() {
        this.position.x = this.prevPosition.x;          // for onCollision into walls
        this.position.y = this.prevPosition.y;
    }

    setBoundaryOffset(top, right, bottom, left) {       // offsets must be calculated on widest/highest animation frames by hand
        this.offsets.top = top;
        this.offsets.bottom = bottom;
        this.offsets.right = right;
        this.offsets.left = left;
    }

    update() {}

    hitCanvasBoundary() {}

    onCollision(otherObject) {}

}