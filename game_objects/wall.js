class Wall extends ImageObject {

    constructor(name, x, y, width, height, scaledWidth, scaledHeight, src) {
        super(name, x, y, width, height, scaledWidth, scaledHeight, src);
    }

    onCollision(otherObject) {
        if (otherObject.name === "fox" || otherObject.name === "wolf") {
            otherObject.restorePosition();
        }
    }
}