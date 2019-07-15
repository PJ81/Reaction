const BALLS = [{
        d: 1,
        b: 5
    }, {
        d: 2,
        b: 10
    }, {
        d: 4,
        b: 15
    }, {
        d: 6,
        b: 20
    }, {
        d: 10,
        b: 25
    }, {
        d: 15,
        b: 30
    }, {
        d: 18,
        b: 35
    }, {
        d: 22,
        b: 40
    }, {
        d: 30,
        b: 45
    }, {
        d: 37,
        b: 50
    }, {
        d: 48,
        b: 55
    }, {
        d: 55,
        b: 60
    }, {
        d: 63,
        b: 65
    }, {
        d: 68,
        b: 70
    }],
    TWO_PI = 2 * Math.PI,
    RADIUS = 8,
    PLAYER_RADIUS = RADIUS * 2,

    MOVING = 0,
    EXPLODE = 1,
    WAITING = 2,
    IMPLODE = 3,
    DEAD = 4,
    NEXTLEVEL = 5,

    WIDTH = 850,
    HEIGHT = 600,

    GAME = 1,
    MENU = 2,
    GAMEOVER = 3;