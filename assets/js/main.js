import k from "./kaboom.js"
import enemy from "./enemy.js"
import blimp from "./blimp.js";
import bullet from "./bullet.js"
import cityScape from "./cityscape.js"
import cloud from "./cloud.js"





loadSprite("heli", "./assets/sprites/heli.png", {
    sliceX: 2,
    // Define animations
    anims: {
        "fly": {
            // Starts from frame 0, ends at frame 1 then loops
            from: 0,
            to: 1,
            // Frame per second
            speed: 18,
            loop: true
        },
    }
});


/* Backround assets loaded here */

// City Skyline 

let cityScapeColl = new Set();

// Skyline initial state
cityScapeColl.add(new cityScape(512, 384, -20));


// Clouds 

let cloudColl = new Set();

// Different cloud initial states

for (let i = 0; i < 4; i++) {
    cloudColl.add(new cloud(rand(500, 850), rand(0, 100), rand(-2, -10), rand(40, 90)))
}


/* Sprite assets loaded here */

const HELI_SPEED = 300;

const heli = add([
    sprite("heli"),
    area(),
    pos(400, 300),
    "heli"
]);

heli.play("fly");

loadSound("shoot", "./assets/sfx/shoot.wav");
loadSound("explosion", "./assets/sfx/explosion.wav");

// controls
keyDown("up", () => {
    if (heli.pos.y > 0) {
        heli.move(0, -HELI_SPEED);
    }
});

keyDown("down", () => {
    heli.move(0, HELI_SPEED);
});

keyDown("left", () => {
    if (heli.pos.x > 0) {
        heli.move(-HELI_SPEED, 0);
    }
});

keyDown("right", () => {
    heli.move(HELI_SPEED, 0);
});

//set up the game screen area
keyPress("f", () => {
    fullscreen(!isFullscreen())
});





//shoot

let bullets = new Set();

keyPress("z", () => {
    bullets.add(new bullet(heli.screenPos().x + 170, heli.screenPos().y + 70, 900));
    play("shoot");
});

let colls = new Set();

for (let i = 0; i < 4; i++) {
    colls.add(new enemy(rand(0, 700), rand(0, 500), rand(10, 530)));
};

collides("bullet", "enemy", (bullet, enemy) => {
    play("explosion");
    bullet.moveTo(1500, 1500);
    enemy.moveTo(2500, 1500);
});

for (let i = 0; i < 4; i++) {
    colls.add(new blimp(rand(200, 500), rand(50, 500), rand(50, 230), rand(-50, -300)));
};

collides("bullet", "blimp", (bullet, blimp) => {
    play("explosion");
    bullet.moveTo(1500, 1500);
    blimp.moveTo(2500, 1500);
});

loop(2, () => {
    console.log("level script call")
});


action(() => {

    colls.forEach(coll => {
        coll.move();
    });

    bullets.forEach(bullet => {
        bullet.move();
    });

    // Moving Cityscape 
    cityScapeColl.forEach(cityScape => {
        cityScape.move();
    });

    // Moving Clouds in background
    cloudColl.forEach(cloud => {
        cloud.move();
    });



});



