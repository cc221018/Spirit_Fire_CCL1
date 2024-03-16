
let gameManager = new GameManager();

let canvas = new Canvas("canvas");
let fox;


function setup(map) {
    setupWallMap(map);
    setupFlames(map);
    setupHorizontalWolves(map);
    setupVerticalWolves(map);
    setupSpawn(map);
    setupKeys(map);
    setupDoors(map);
    if (determineLevel >= 1 && determineLevel <= 5) {
        canvas.canvasElement.style.backgroundImage = "url('./images/extra/grass.png')";
    }
    else if (determineLevel >= 6 && determineLevel <= 10) {
        canvas.canvasElement.style.backgroundImage = "url('./images/purple_biome/purple_grass.png')";
    }
}

// -1 = spawn
// 1 = wall
// 2 = flame
// 3 = hori wolf
// 4 = verti wolf
// 5 = key
// 6 = door


function setupSpawn(map) {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 17; x++) {
            if (map[y][x] === -1) {
                fox = new Player("fox", x * 90, y *90, 64, 64, 64, 64);
                return;
            }
        }
    }
}


function setupWallMap(map) {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 17; x++) {
            if (map[y][x] === 1) {
                if (determineLevel >= 1 && determineLevel <= 5) {
                    new Wall("wall", x * 90, y * 90, 90, 90, 90, 90, "./images/extra/tree2.png");
                }
                else if (determineLevel >= 6 && determineLevel <= 10) {
                    new Wall("wall", x * 90, y * 90, 90, 90, 90, 90, "./images/purple_biome/blue_tree.png");
                }
            }
        }
    }
}


function setupFlames(map) {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 17; x++) {
            if (map[y][x] === 2) {
                new Flame("flame", 90 * x + 13, 90 * y + 13, 256, 256, 70, 70);
            }
        }
    }
}



function setupHorizontalWolves(map) {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 17; x++) {
            if (map[y][x] === 3) {
                if (determineLevel >= 1 && determineLevel <= 5) {
                    new HorizontalWolf("horizontal_wolf", 90 * x  + 10, 90 * y + 10, 64, 64, 64, 64, HorizontalWolf.Types.NORMAL);
                }
                else if (determineLevel >= 6 && determineLevel <= 10) {
                    new HorizontalWolf("horizontal_wolf", 90 * x  + 10, 90 * y + 10, 80, 64, 80, 64, HorizontalWolf.Types.PINK);
                }
            }
        }
    }
}


function setupVerticalWolves(map) {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 17; x++) {
            if (map[y][x] === 4) {
                if (determineLevel >= 1 && determineLevel <= 5) {
                    new VerticalWolf("vertical_wolf", 90 * x + 10, 90 * y + 10, 64, 80, 64, 80, VerticalWolf.Types.NORMAL);
                }
                else if (determineLevel >= 6 && determineLevel <= 10) {
                    new VerticalWolf("vertical_wolf", 90 * x + 10, 90 * y + 10, 64, 80, 64, 80, VerticalWolf.Types.PINK);
                }
            }
        }
    }
}

function setupKeys(map) {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 17; x++) {
            if (map[y][x] === 5) {
                new Key("key", 90 * x + 10, 90 * y + 10, 90, 90, 60, 60);
            }
        }
    }
}

function setupDoors(map) {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 17; x++) {
            if (map[y][x] === 6) {
                new Door("door", x * 90, y * 90, 90, 90, 90, 90, "./images/extra/spritesheet_door.png");
            }
        }
    }
}


requestAnimationFrame(gameManager.gameLoop);

