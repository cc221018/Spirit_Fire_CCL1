class Door extends ImageObject {

    constructor(name, x, y, width, height, scaledWidth, scaledHeight, src) {
        super(name, x, y, width, height, scaledWidth, scaledHeight, src);
        this.addAnimationInformation("open_door", 0, 5, 5, "./images/extra/spritesheet_door.png");
    }

    onCollision(otherObject) {
        if (otherObject.name === "fox" || otherObject.name === "wolf") {
            if (fox.hasKey === false) {
                otherObject.restorePosition();
            }
            else if (fox.hasKey === true) {         // open door if key has been collected before --> after that, fox has no key anymore
                fox.hasKey = false;
                otherObject.restorePosition();
                unlockDoorAudio.play();
                this.setCurrentAnimationByName("open_door");
                setTimeout(() => {
                    this.isActive = false;
                }, 480);
            }
        }
    }

}