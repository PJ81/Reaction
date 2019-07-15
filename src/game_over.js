class GameOver extends State {
    constructor() {
        super();
        this.state;
        this.score;
        this.kills;
        this.balls;
    }

    draw(ctx) {
        let txt, txt2;
        switch (this.state) {
            case GAMEOVER:
                txt = "YOU DIDN'T MAKE IT!";
                txt2 = "AGAIN.";
                break;
            case NEXTLEVEL:
                txt = "CONGRATULATIONS!"
                txt2 = "THE NEXT LEVEL.";
                break;
        }

        ctx.fillStyle = "#ddd";
        ctx.textAlign = "center";
        ctx.font = "54px 'Montserrat'";
        ctx.fillText(txt, WIDTH >> 1, HEIGHT * .32);
        ctx.font = "40px 'Montserrat'";
        ctx.fillText("CLICK TO PLAY " + txt2, WIDTH >> 1, HEIGHT * .52);
        ctx.font = "30px 'Montserrat'";
        ctx.fillText("YOUR SCORE: " + this.score, WIDTH >> 1, HEIGHT * .7);
    }

    input(w, i) {
        if (w < 2) {
            window.dispatchEvent(new CustomEvent("stateChange", {
                detail: {
                    state: GAME,
                    action: this.state === NEXTLEVEL
                }
            }));
        }
    }

    update(dt) {
        switch (this.state) {
            case GAMEOVER:
                break;
            case NEXTLEVEL:
                break;
        }
    }

    start(details) {
        this.kills = details.kills;
        this.balls = details.balls;
        this.score = details.score;

        if (this.kills < this.balls) {
            this.state = GAMEOVER;
        } else {
            this.state = NEXTLEVEL;
        }
    }
}