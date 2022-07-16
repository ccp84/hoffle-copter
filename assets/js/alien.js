import k from "./kaboom.js"

loadSprite("alien", "./assets/sprites/alien.png", {


    anims: {
        "float": {
            // Starts from frame 0, ends at frame 1 then loops
            from: 0,
            to: 1,
            // Frame per second
            speed: 8,
            loop: true
        },
    }
});



class alien {

    constructor(xPos, yPos, xSpeed, ySpeed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.wave = rand(50, 100);

        this.spr = k.add([
            k.sprite("alien"),
            k.area(),
            k.pos(this.xPos, this.yPos),
            "blimp"
        ]);

        this.spr.play("float")
    }

    move() {
        this.spr.move(this.xSpeed, this.ySpeed);
        this.wave -= 1;

        if (this.wave <= 0) {
            this.wave = rand(50, 100);
            this.ySpeed = this.ySpeed * -1;
        }

        if (this.spr.screenPos().x >= 900) {
            this.spr.moveTo(rand(200, 500), rand(50, 500));
        }
    };
    
}

export default alien;