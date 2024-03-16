class Canvas {
    
    canvasElement = null;
    drawingContext = null;
    canvasBoundaries = null;

    constructor(canvasName) {
        this.canvasElement = document.getElementById(canvasName);
        this.drawingContext = this.canvasElement.getContext("2d");
        this.canvasBoundaries = {
            bottom: this.canvasElement.height,
            right: this.canvasElement.width,
            left: 0,
            top: 0
        };

        gameManager.setCanvas(this);
    }
    
}