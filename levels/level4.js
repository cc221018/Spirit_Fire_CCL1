let map4 = [
    [1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,4,0,0,0,0,1,-1,1,0,0,0,0,1],
    [1,0,3,1,0,1,0,1,0,1,0,1,0,1,1,0,1],
    [1,0,0,1,0,0,2,0,0,1,0,1,0,1,1,0,1],
    [1,3,0,1,0,1,0,1,4,0,0,1,0,0,3,0,1],
    [1,0,0,1,0,3,0,0,0,1,1,1,0,0,1,0,1],
    [1,0,3,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
    [1,0,1,2,1,0,0,4,0,0,0,4,1,0,1,0,1],
    [1,0,0,0,1,0,1,0,0,4,0,0,0,0,1,2,1],
    [1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1]
];

function startLevel4() {
    let level4 = new Level();
    level4.startlevel(4);
    setup(map4);
}