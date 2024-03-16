class ImageObject extends GeneralObject {

    image;
    isloaded = false;

    animations = {};
    columns = 0;
    rows = 0;
    currentSourceX = 0;
    currentSourceY = 0;
    currentStartFrame = 0;
    currentEndFrame = 0;
    currentAnimationFrame = 0;
    currentAnimationName;
    fps = 0;
    frameCount = 0;
    callback;


    constructor(name, x, y, width, height, scaledWidth, scaledHeight, src) {
        super(name, x, y, width, height);
        this.dimensions.scaledWidth = scaledWidth;
        this.dimensions.scaledHeight = scaledHeight;
        this.image = new Image();
        
        this.image.addEventListener("load", () => {             // only for walls (they have no animations)
            this.isLoaded = true;
        });
        
        if (src) {
            this.image.src = src;
        }
    }

    
    draw() {
        if(this.isLoaded) {
            this.changeFrameOfCurrentAnimation();
            gameManager.canvas.drawingContext.beginPath();
            gameManager.canvas.drawingContext.drawImage(this.image, this.currentSourceX, this.currentSourceY, this.dimensions.width, this.dimensions.height, this.position.x, this.position.y, this.dimensions.scaledWidth, this.dimensions.scaledHeight);
            
            // // check hitbox for bug fixing:
            // gameManager.canvas.drawingContext.strokeStyle = "white";
            // gameManager.canvas.drawingContext.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
            // gameManager.canvas.drawingContext.stroke();
            
            gameManager.canvas.drawingContext.closePath();
        }
    }
    
    updateAnimation() {
        if (this.rows === 1 && this.columns === 1) {                        // for objects who dont update their animations in the beginning (cos eg no collisions or keys pressed yet)
            this.setCurrentAnimationByName(this.currentAnimationName);      // --> standard values (= 1) for columns/rows will be overriten a bit later --> standard animation is still set
        }
    }


    changeFrameOfCurrentAnimation() {
        this.updateAnimation();                                   
        this.frameCount++;
        if (this.frameCount < 60 / this.fps) { 
            return;
        }
        this.frameCount = 0;
        if (this.currentAnimationFrame > this.currentEndFrame) {        // if animation loop is at the end, start over from the start frame again
            this.currentAnimationFrame = this.currentStartFrame;
            if (this.callback) this.callback();
            if (this.isActive) return;
        }
    
        let currentRow = Math.floor(this.currentAnimationFrame / this.columns);         // calculates current row/column to know which animation/frame to currently display
        let currentColumn = this.currentAnimationFrame % this.columns;
        this.currentSourceY = currentRow * this.dimensions.height;
        this.currentSourceX = currentColumn * this.dimensions.width;
        
        this.currentAnimationFrame++;      
    }

    addAnimationInformation(name, startFrame, endFrame, fps, src) {
        let image = new Image();                                            // saves images of animations in cache --> doesnt have to load new image every single time
        image.src = src;
        image.addEventListener("load", () => {
            this.isLoaded = true;
            this.animations[name].columns = image.naturalWidth / this.dimensions.width;
            this.animations[name].image = image;
            this.animations[name].rows = image.naturalHeight / this.dimensions.height;
        });
        let animationInformation = {
            "startFrame": startFrame,
            "endFrame": endFrame,
            "fps": fps,
            "image": this.image,
            "columns": 1,                   // standard value --> will be overriten as soon as objects are updated (eg on collision, key input, etc)
            "rows": 1                       // cant be 0 --> division by 0 in 'changeFrameOfCurrentAnimaiton()' when calculating 'currentRow'
        };
        this.animations[name] = animationInformation;
    }

    setCurrentAnimationByName(name, callback) {
        this.currentStartFrame = this.animations[name].startFrame;
        this.currentEndFrame = this.animations[name].endFrame;
        this.currentAnimationFrame = this.animations[name].startFrame;
        this.fps = this.animations[name].fps;
        this.image = this.animations[name].image;
        this.callback = callback;
        this.columns = this.animations[name].columns;
        this.rows = this.animations[name].rows;
        this.currentAnimationName = name;                   // name is saved so we can use later in 'updateAnimation()' --> so we know which standard animation is needed
        this.frameCount = Number.MAX_VALUE;
    }

}