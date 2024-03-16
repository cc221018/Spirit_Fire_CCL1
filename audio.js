class Sound {

    src;
    audio;
    volume;
    loop;

    constructor(src) {
        this.src = src;
        this.audio = new Audio(src);
        this.setVolume(getStoredVolume());
        this.setLoop(false);
        audioArray.push(this);
    }

    setLoop(state) {
        this.loop = state;
        this.audio.loop = state;
    }

    play() {
        this.audio.load();
        this.audio.play();
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }
    
    pause() {
        this.audio.pause();
    }

    setVolume(volume) {
        this.volume = volume;
        this.audio.volume = volume;
    }
}

let audioArray = [];

let flameAudio = new Sound("./audio/FLAME.mp3");
let winAudio = new Sound("./audio/win.wav");
let deathAudio = new Sound("./audio/death.mp3");
let buttonAudio = new Sound("./audio/BUTTON.mp3");
let levelButtonAudio = new Sound("./audio/LEVEL_BUTTON.mp3");
let dashAudio = new Sound("./audio/DASH.wav");
let foxAudio = new Sound("./audio/FOX_WOOF.mp3");
// background music: When Strangers Meet - by Drax (Thomas Mogensen) 
let music = new Sound("./audio/music.mp3");
let keyAudio = new Sound("./audio/KEY.wav");
let unlockDoorAudio = new Sound ("./audio/door.mp3")

music.setLoop(true);

function getStoredVolume() {
    let volume = window.localStorage.getItem("volume");
    
    if(volume) {
        return volume;
    }

    return 0.2;
}

function playFlameAudio() {
    if (gameManager.allObjects.filter(object => object instanceof Flame && object.isActive).length === 0) winAudio.play();
    else flameAudio.play();                                                      // if 0 flames left, play win audio instead of flame audio
}



let slider = document.getElementById("volume");
slider.value = getStoredVolume() * 100;

slider.addEventListener("input", (e) => {
    audioArray.forEach(element => {
        window.localStorage.setItem("volume", e.target.value/100);      // saves current volume in local storage --> doesnt reset after every new level etc
        element.setVolume(e.target.value/100);
    });
});