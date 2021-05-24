const canvas = document.querySelector("#viewport");
const ctx = canvas.getContext("2d");

let keysPressed = {};

canvas.width = 1280;
canvas.height = 720;

/*
Todo:

- Shooting
- Asteroid Generation and movement
- Score
- Main Menu
*/

let time = 0;

let player = {
    x: 256,
    y: 256,
    dir: 0,
    xv: 0,
    yv: 0
};

window.addEventListener('keydown', function (e) {
    keysPressed[e.keyCode] = true;
});

window.addEventListener('keyup', function (e) {
    keysPressed[e.keyCode] = false;
});

function DegToRad(degrees)
{
    return Math.PI / 180 * degrees;
}

const playerSize = 15;

const speedLimit = 4;
const brakeForce = 0.95;
const turnSpeed = 3.5;
const moveForce = 0.1;

function GameLoop()
{
    // game update loop

    player.x += player.xv;
    player.y += player.yv;

    // movement

    if (keysPressed[87])
    {
        player.xv += Math.sin(DegToRad(player.dir+180)) * moveForce;
        player.yv += Math.cos(DegToRad(player.dir+180)) * moveForce;
    }

    console.log("XV: " + player.xv);
    console.log("YV: " + player.yv);

    let velocity = Math.sqrt(player.xv*player.xv+player.yv*player.yv);

    if (Math.abs(velocity) > speedLimit)
    {
        console.log("Slowing");

        // get rid of half of the velocity over the speed limit
        let dampAmount = (Math.abs(velocity)-speedLimit)*0.5;

        player.xv -= ((Math.abs(velocity)-speedLimit)*dampAmount) * Math.sin(DegToRad(player.dir + 180));
        player.yv -= ((Math.abs(velocity)-speedLimit)*dampAmount) * Math.cos(DegToRad(player.dir + 180));

        // if (player.xv > 0)
        // {
        //     player.xv -= (Math.abs(velocity)-speedLimit)*dampAmount;
        // }
        // if (player.xv < 0)
        // {
        //     player.xv += (Math.abs(velocity)-speedLimit)*dampAmount;
        // }
        // if (player.yv > 0)
        // {
        //     player.yv -= (Math.abs(velocity)-speedLimit)*dampAmount;
        // }
        // if (player.yv < 0)
        // {
        //     player.yv += (Math.abs(velocity)-speedLimit)*dampAmount;
        // }
    }


    // braking

    if (keysPressed[16])
    {
        player.xv *= brakeForce;
        player.yv *= brakeForce;
    }
    
    // turning

    if (keysPressed[65])
    {
        player.dir += turnSpeed;
    }
    if (keysPressed[68])
    {
        player.dir -= turnSpeed;
    }

    // clear screen

    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // draw

    // draw player

    ctx.fillStyle = "#ff0000";
    ctx.strokeStyle = "#ffffff";

    ctx.beginPath();
    ctx.moveTo(player.x + playerSize*Math.sin(DegToRad(player.dir + 180)), player.y + playerSize*Math.cos(DegToRad(player.dir + 180)));
    ctx.lineTo(player.x + playerSize*Math.sin(DegToRad(player.dir + 45)), player.y + playerSize*Math.cos(DegToRad(player.dir + 45)));
    ctx.lineTo(player.x + playerSize*Math.sin(DegToRad(player.dir- 45)), player.y + playerSize*Math.cos(DegToRad(player.dir - 45)));
    // ctx.lineTo(player.x + playerSize*Math.sin(DegToRad(player.dir + 75)), playerSize*player.x + Math.cos(DegToRad(player.dir + 75)));
    // ctx.lineTo(player.x + playerSize*Math.sin(DegToRad(player.dir + 105)), playerSize*player.x + Math.cos(DegToRad(player.dir + 105)));
    // ctx.lineTo(400,256);
    // ctx.lineTo(256,400);
    ctx.closePath();
    ctx.stroke();

    time++;
}

let loopInterval = setInterval(GameLoop, 10);