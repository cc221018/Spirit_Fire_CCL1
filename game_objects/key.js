class Key extends ImageObject {

    constructor(name, x, y, width, height, scaledWidth, scaledHeight) {
        super(name, x, y, width, height, scaledWidth, scaledHeight);
        this.addAnimationInformation("key_idle", 0, 3, 2, "./images/extra/spritesheet_key.png");
        this.setBoundaryOffset(15, -15, -15, 15);
        this.setCurrentAnimationByName("key_idle");
    }

    onCollision(otherObject) {
        if(otherObject.name === "fox") {
            this.isActive = false;
            fox.hasKey = true;
            keyAudio.play();
        }
    }
}