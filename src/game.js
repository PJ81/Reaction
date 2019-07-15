class State {
    constructor() {}
    update(dt) {}
    draw(ctx) {}
    input(i) {}
    start() {}
    stats(ctx) {}
}

class Game {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);

        this.game = new Chain();
        this.gameOver = new GameOver();

        this.lastTime = 0;
        this.accumulator = 0;
        this.deltaTime = 1 / 60;

        this.loop = (time) => {
            this.accumulator += (time - this.lastTime) / 1000;
            while (this.accumulator > this.deltaTime) {
                this.accumulator -= this.deltaTime;
                this.state.update(Math.min(this.deltaTime, .5));
            }
            this.lastTime = time;

            this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
            this.state.draw(this.ctx);
            requestAnimationFrame(this.loop);
        }

        this.canvas.addEventListener("mousemove", (e) => {
            this.state.input(2, e);
        })
        this.canvas.addEventListener("mousedown", (e) => {
            this.state.input(1, e.clientX);
        });
        this.canvas.addEventListener("touchstart", (e) => {
            this.state.input(0, e.touches[0].screenX);
        });

        this.state = this.game;
        this.state.start(false);

        window.addEventListener("stateChange", (e) => {
            switch (e.detail.state) {
                case GAME:
                    this.state = this.game;
                    break;
                case MENU:
                    this.state = this.menu;
                    break;
                case GAMEOVER:
                    this.state = this.gameOver;
                    break;
            }
            this.state.start(e.detail);
        });

        this.loop(0);
    }
}