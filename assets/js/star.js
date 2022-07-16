import k from "./kaboom.js"

loadSprite("star", "./assets/sprites/star.png");

class cloud {

    constructor(xPos, yPos, speed, size) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;
        this.size = size;

        this.spr = k.add([
            k.sprite("star"),
            k.area(),
            k.pos(this.xPos, this.yPos),
            "star"
        ]);
    }

    move() {
        this.spr.move(this.speed, 0);

    };
}

export default star;
