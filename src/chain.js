class Chain extends State {
    constructor() {
        super();
        this.balls;
        this.kills;
        this.score;
        this.ballsPos;
        this.player = new Player();
    }

    createBalls() {
        this.ballsPos = [];
        for (let r = 0; r < BALLS[this.balls].b; r++) {
            const a = Math.random() * TWO_PI;
            this.ballsPos.push({
                x: Math.floor(Math.random() * (WIDTH - 20)) + 10,
                y: Math.floor(Math.random() * (HEIGHT - 20)) + 10,
                dx: (Math.random() * 2 + 1) * Math.cos(a),
                dy: (Math.random() * 2 + 1) * Math.sin(a),
                st: MOVING,
                rad: RADIUS,
                time: 5,
                clr: `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random()*50) + 30}%, ${Math.floor(Math.random() * 40 + 60)}%)`
            });
        }
    }

    start(nextLvl) {
        this.player.start(WIDTH >> 1, HEIGHT >> 1);

        if (nextLvl.action) {
            this.balls = (this.balls + 1) % BALLS.length;
            this.kills = 0;
        } else {
            this.balls = 0;
            this.kills = 0;
            this.score = 0;
        }
        this.createBalls();
    }

    draw(ctx) {
        ctx.globalAlpha = .7;

        for (let r = 0; r < this.ballsPos.length; r++) {
            const b = this.ballsPos[r];
            if (b.st === DEAD) continue;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.rad, 0, TWO_PI);
            ctx.fillStyle = b.clr;
            ctx.fill();
            ctx.closePath();
        }

        this.player.draw(ctx);
        ctx.globalAlpha = 1;

        ctx.fillStyle = "#ddd";
        ctx.textAlign = "left";
        ctx.font = "14px 'Montserrat'";
        ctx.fillText("SCORE: " + this.score, 8, 22);
        ctx.textAlign = "right";
        ctx.fillText("KILLS: " + this.kills, WIDTH - 8, 22);
        ctx.fillText("NEED: " + BALLS[this.balls].d, WIDTH - 8, 44);
    }

    input(w, e) {
        switch (w) {
            case 0:
            case 1:
                if (this.player.state === MOVING)
                    this.player.state = EXPLODE;
                break;
            case 2:
                this.player.input(e.clientX - e.srcElement.offsetLeft, e.clientY - e.srcElement.offsetTop);
                break;
        }
    }

    update(dt) {
        this.player.update(dt);
        let ballDone = true;
        for (let r = 0; r < this.ballsPos.length; r++) {
            const b = this.ballsPos[r];
            switch (b.st) {
                case MOVING:
                    if (b.x + b.rad + b.dx > WIDTH || b.x - b.rad + b.dx < 0) b.dx = -b.dx;
                    if (b.y + b.rad + b.dy > HEIGHT || b.y - b.rad + b.dy < 0) b.dy = -b.dy;
                    b.x += b.dx;
                    b.y += b.dy;
                    break;
                case EXPLODE:
                    ballDone = false;
                    if ((b.rad += dt * (b.rad * 1.5)) > 60) {
                        b.rad = 60;
                        b.time = 3;
                        b.st = WAITING;
                    }
                    break;
                case WAITING:
                    ballDone = false;
                    if ((b.time -= dt) < 0) {
                        b.st = IMPLODE;
                    }
                    break;
                case IMPLODE:
                    ballDone = false;
                    if ((b.rad -= dt * 64) < 0) {
                        b.rad = 0;
                        b.st = DEAD;
                    }
                    break;
            }
        }

        if (this.player.state !== MOVING) {
            let radii, dx, dy, b, a;

            for (let r = 0; r < this.ballsPos.length; r++) {
                b = this.ballsPos[r];
                if (b.st !== MOVING) continue;
                radii = this.player.rad + b.rad;
                radii *= radii;
                dx = b.x - this.player.x;
                dx *= dx;
                dy = b.y - this.player.y;
                dy *= dy;
                if (radii > dx + dy) {
                    this.kills++;
                    this.score += 10 + this.kills * 3;
                    b.st = EXPLODE;
                }
            }

            for (let r = 0; r < this.ballsPos.length; r++) {
                b = this.ballsPos[r];
                if (b.st === DEAD) continue;
                for (let s = 0; s < this.ballsPos.length; s++) {
                    if (r === s) continue;
                    a = this.ballsPos[s];
                    if (a.st === DEAD) continue;

                    if (a.st !== b.st && (a.st === MOVING || b.st === MOVING)) {
                        radii = a.rad + b.rad;
                        radii *= radii;
                        dx = b.x - a.x;
                        dx *= dx;
                        dy = b.y - a.y;
                        dy *= dy;
                        if (radii > dx + dy) {
                            this.kills++;
                            this.score += 10 + this.kills * 3;
                            if (b.st === MOVING) b.st = EXPLODE;
                            else a.st = EXPLODE;
                        }
                    }
                }
            }
        }

        if (this.player.state === DEAD && ballDone) {
            window.dispatchEvent(new CustomEvent("stateChange", {
                detail: {
                    state: GAMEOVER,
                    kills: this.kills,
                    balls: BALLS[this.balls].d,
                    score: this.score
                }
            }));
        }
    }
}