
let map3 = [
    [1,0,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1],
    [1,0,3,0,0,1,0,1,0,1,0,0,0,0,3,0,1],
    [1,1,0,0,1,1,0,0,0,1,2,1,0,1,1,0,1],
    [1,1,1,1,1,1,1,1,4,1,1,1,0,0,0,3,1],
    [1,0,2,1,0,2,0,1,0,1,-1,1,0,1,1,0,1],
    [1,0,1,1,0,1,0,1,0,1,0,1,0,0,3,0,1],
    [1,0,1,0,0,3,0,1,0,0,0,1,1,0,1,0,1],
    [1,0,1,0,1,1,0,1,1,1,1,1,1,0,1,0,1],
    [1,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1]
];

function startLevel3() {
    let level3 = new Level();
    level3.startlevel(3);
    setup(map3);
}