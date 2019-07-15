class Player {
    constructor() {
        this.x, this.y, this.rad, this.state, this.state;
    }

    start(x, y) {
        this.x = x;
        this.y = y;
        this.time = 3;
        this.rad = PLAYER_RADIUS;
        this.state = MOVING;
    }

    input(x, y) {
        if (this.state !== MOVING) return;
        this.x = x;
        this.y = y;
    }

    update(dt) {
        switch (this.state) {
            case MOVING:
                break;
            case EXPLODE:
                this.rad += dt * (this.rad / 1.5);
                if (this.rad > 60) {
                    this.rad = 60;
                    this.time = 3;
                    this.state = WAITING;
                }
                break;
            case WAITING:
                if ((this.time -= dt) < 0) {
                    this.state = IMPLODE;
                }
                break;
            case IMPLODE:
                if ((this.rad -= dt * 64) < 0) {
                    this.rad = 0;
                    this.state = DEAD;
                }
                break;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, TWO_PI);
        ctx.fillStyle = "#555";
        ctx.fill();
        ctx.closePath();
    }
}