

let inputs = ["w", "a", "s", "d", " ", "e"];

let inputMap = {};

let viewDirection = 4;      // startes off with looking to the right (= 4)


window.addEventListener("keydown", down);
window.addEventListener("keyup", up);


function up(e) {
    e.key = e.key.toLowerCase();
    if (!inputs.includes(e.key) || inputMap[e.key] === undefined) return;
    if (inputMap[e.key] !== false) {
        inputMap[e.key] = false;
        updateInput(e.key, false);
    }
}

function down(e) {
    e.key = e.key.toLowerCase();
    if (!inputs.includes(e.key)) return;
    if (inputMap[e.key] !== true) {         // if key is pressed continuously (key hasnt been released = no up event) value is set to true ONCE
        setInput(e.key);                    // --> function isnt being called over and over again
        updateInput(e.key, true);
    }
}


function setInput(key) {                // if W, A, S or D is pressed: only remembers last key input --> doesnt interrupt movement
    inputMap[key] = true;

    if(!["w", "a", "s", "d"].includes(key)) return;
    inputMap["w"] = false;
    inputMap["a"] = false;
    inputMap["s"] = false;
    inputMap["d"] = false;

    inputMap[key] = true;
}

function updateInput(key, state) {
    if (!fox || !fox.isAlive || gameManager.gameState !== gameManager.States.PLAYING) return;
    switch (key) {
        case "w":
        case "a":
        case "s":
        case "d":
            updateMovement(key, inputMap[key]);
            break;
        case " ":
            if (state) {
                dash();
            }
            break;
        case "e":
            if (state) {
                bark();
            }
            break;
    }
}





function handleMovement(verti, hori, ani, direc) {  
    fox.move.vertically = verti;
    fox.move.horizontally = hori;
    fox.setCurrentAnimationByName(ani);
    viewDirection = direc;
}

function updateMovement(key, state) {
    switch(key) {
        case "w":
            if (state) {
                handleMovement(-fox.moveVelocity, 0, "run_up", 1);      // move up
            } else {
                handleMovement(0, 0, "idle_up", 1);
            }
            break;
        case "a":
            if (state) {
                handleMovement(0, -fox.moveVelocity, "run_left", 2);     // move down
            } else {
                handleMovement(0, 0, "idle_left", 2);
            }
            break;
        case "s":
            if (state) {
                handleMovement(fox.moveVelocity, 0, "run_down", 3);       // move left
            } else {
                handleMovement(0, 0, "idle_down", 3);
            }
            break;
        case "d":
            if (state) {
                handleMovement(0, fox.moveVelocity, "run_right", 4);        // move right
            } else {
                handleMovement(0, 0, "idle_right", 4);
            }
            break;
    }
}






function bark() {
    if (fox.move.vertically !== 0 || fox.move.horizontally !== 0) return;
    foxAudio.play();
    
    switch (viewDirection) {
        case 1:
            fox.setCurrentAnimationByName("bark_up", () => fox.setCurrentAnimationByName("idle_up"));
            break;
        case 2: 
            fox.setCurrentAnimationByName("bark_left", () => fox.setCurrentAnimationByName("idle_left"));
            break;
        case 3:
            fox.setCurrentAnimationByName("bark_down", () => fox.setCurrentAnimationByName("idle_down"));
            break;
        case 4:
            fox.setCurrentAnimationByName("bark_right", () => fox.setCurrentAnimationByName("idle_right"));
            break;
    }
}






let dashOnCooldown = false;
const cooldown = 3000;
let cooldownPointer = 0;

function executeDash() {   
    dashAudio.play();         // puts dash on cooldown with the help of the variable dashOnCooldown
    dashOnCooldown = true;
    cooldownPointer = 3;
    showCooldown();
    setTimeout(() => {
        dashOnCooldown = false;
    }, cooldown);
}

function showCooldown() {
    setTimeout(() => {
        cooldownPointer -= 0.1;
        if (cooldownPointer > 0) showCooldown();
        else cooldownPointer = 0;
    }, 100);
}

function handleDash(verti, hori, ani, reset) {
    fox.move.vertically = verti;
    fox.move.horizontally = hori;
    fox.setCurrentAnimationByName("dash_" + ani, () => {
        if (fox.move.vertically !== 0 || fox.move.horizontally !== 0) {
            if (verti) {
                fox.move.vertically += reset;
            } else {
                fox.move.horizontally += reset;
            }
            fox.setCurrentAnimationByName("run_" + ani);
        }
        else {
            fox.move.vertically = 0;
            fox.move.horizontally = 0;
            fox.setCurrentAnimationByName("idle_" + ani);
        }
    });
    executeDash();
}

function dash() {
    if (dashOnCooldown || (fox.move.horizontally === 0 && fox.move.vertically === 0)) return;       // cant dash if standing still or if dash on cooldown
    switch (viewDirection) {
        case 1:
            handleDash(-fox.moveVelocity - fox.dashVelocity, 0, "up", fox.dashVelocity);
            break;
        case 2:
            handleDash(0, -fox.moveVelocity - fox.dashVelocity, "left", fox.dashVelocity);
            break;
        case 3:
            handleDash(fox.moveVelocity + fox.dashVelocity, 0, "down", -fox.dashVelocity);
            break;
        case 4:
            handleDash(0, fox.moveVelocity + fox.dashVelocity, "right", -fox.dashVelocity);
            break;
    }
}











// --------------------------- MOVEMENT HANDLING 2 (from 2DBGC) -------------------------------- //



// function move(eventInformation) {
//     if (!fox || eventInformation.repeat || !fox.isAlive) return;
//     switch(eventInformation.key.toLowerCase()) {
//         case "w":
//             fox.move.vertically = -fox.moveVelocity;     //move up
//             fox.move.horizontally = 0;
//             fox.setCurrentAnimationByName("run_up");
//             viewDirection = 0;
//             break;
//         case "s":
//             fox.move.vertically = fox.moveVelocity;       //move down
//             fox.move.horizontally = 0;
//             fox.setCurrentAnimationByName("run_down");
//             viewDirection = 0;
//             break;
//         case "a":
//             fox.move.vertically = 0;                    //move left
//             fox.move.horizontally = -fox.moveVelocity;
//             fox.setCurrentAnimationByName("run_left");
//             viewDirection = 0;
//             break;
//         case "d":
//             fox.move.vertically = 0;                    //move right
//             fox.move.horizontally = fox.moveVelocity;
//             fox.setCurrentAnimationByName("run_right");
//             viewDirection = 0;
//             break;
//     }
// }

// function stand(eventInformation) {
//     if (!fox || !fox.isAlive) return;         
//     switch (eventInformation.key.toLowerCase()) {
//         case "w":
//             fox.move.vertically = 0;        //stop moving up
//             fox.move.horizontally = 0;
//             fox.setCurrentAnimationByName("idle_up");
//             viewDirection = 1;
//             break;
//         case "a":
//             fox.move.vertically = 0;        //stop moving left
//             fox.move.horizontally = 0;
//             fox.setCurrentAnimationByName("idle_left");
//             viewDirection = 2;
//             break;
//         case "s":
//             fox.move.vertically = 0;        //stop moving down
//             fox.move.horizontally = 0;
//             fox.setCurrentAnimationByName("idle_down");
//             viewDirection = 3;
//             break;
//         case "d":
//             fox.move.vertically = 0;         //stop moving right
//             fox.move.horizontally = 0;
//             fox.setCurrentAnimationByName("idle_right");
//             viewDirection = 4;
//             break;
//     }
// }


// let viewDirection = 4;

// function bark(eventInformation) {
//     if (!fox || eventInformation.repeat || !fox.isAlive) return;                // can press again / only do animation once
//     if (eventInformation.key.toLowerCase() === "e" && viewDirection === 1) {
//         fox.setCurrentAnimationByName("bark_up", () => fox.setCurrentAnimationByName("idle_up"));
//         foxAudio.play();
//     }
//     else if (eventInformation.key.toLowerCase() === "e" && viewDirection === 2) {
//         fox.setCurrentAnimationByName("bark_left", () => fox.setCurrentAnimationByName("idle_left"));
//         foxAudio.play();
//     }
//     else if (eventInformation.key.toLowerCase() === "e" && viewDirection === 3) {
//         fox.setCurrentAnimationByName("bark_down", () => fox.setCurrentAnimationByName("idle_down"));
//         foxAudio.play();
//     }
//     else if (eventInformation.key.toLowerCase() === "e" && viewDirection === 4) {
//         fox.setCurrentAnimationByName("bark_right", () => fox.setCurrentAnimationByName("idle_right"));
//         foxAudio.play();
//     }
// }




// function dash(eventInformation) {
//     if(!fox || dashOnCooldown  || !fox.isAlive) return;
//     switch(eventInformation.key) {
//         case " ":
//             viewDirection = 0;
//             if (fox.move.vertically === -fox.moveVelocity) {
//                 fox.move.vertically = -fox.moveVelocity - fox.dashVelocity;
//                 fox.move.horizontally = 0;
//                 executeDash();
//                 setTimeout(() => {
//                     if (fox.move.vertically !== 0) {
//                         fox.move.vertically += fox.dashVelocity;
//                         fox.setCurrentAnimationByName("run_up");
//                     }
//                     else {
//                         fox.move.vertically = 0;
//                         fox.setCurrentAnimationByName("idle_up");
//                     }
//                 }, 200);
//                 fox.setCurrentAnimationByName("dash_up");
//                 break;
//             }
//             if (fox.move.vertically === fox.moveVelocity) {
//                 fox.move.vertically = fox.moveVelocity + fox.dashVelocity;
//                 executeDash();
//                 setTimeout(() => {
//                     if (fox.move.vertically !== 0) {
//                         fox.move.vertically -= fox.dashVelocity;
//                         fox.setCurrentAnimationByName("run_down");
//                     }
//                     else {
//                         fox.move.vertically = 0;
//                         fox.setCurrentAnimationByName("idle_down");
//                     }
//                 }, 200);
//                 fox.setCurrentAnimationByName("dash_down");
//                 break;
//             }
//             if (fox.move.horizontally === -fox.moveVelocity) {
//                 fox.move.horizontally = -fox.moveVelocity - fox.dashVelocity;
//                 executeDash();
//                 setTimeout(() => {
//                     if (fox.move.horizontally !== 0) {
//                         fox.move.horizontally += fox.dashVelocity;
//                         fox.setCurrentAnimationByName("run_left");
//                     }
//                     else {
//                         fox.move.vertically = 0;
//                         fox.setCurrentAnimationByName("idle_left");
//                     }
//                 }, 200);
//                 fox.setCurrentAnimationByName("dash_left");
//                 break;
//             }
//             if (fox.move.horizontally === fox.moveVelocity) {
//                 fox.move.horizontally = fox.moveVelocity + fox.dashVelocity;
//                 executeDash();
//                 setTimeout(() => {
//                     if (fox.move.horizontally !== 0) {
//                         fox.move.horizontally -= fox.dashVelocity;
//                         fox.setCurrentAnimationByName("run_right");
//                     }
//                     else {
//                         fox.move.vertically = 0;
//                         fox.setCurrentAnimationByName("idle_right");
//                     }
//                 }, 200);
//                 fox.setCurrentAnimationByName("dash_right");
//                 break;
//             }
//     }
// }