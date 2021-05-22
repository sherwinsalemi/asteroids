const canvas = document.querySelector("#viewport");
const ctx = canvas.getContext("2d");

canvas.width = 512;
canvas.height = 512;

let time = 0;

function DegToRad(degrees)
{
    return Math.PI / 180 * degrees;
}

function GameLoop()
{
    // game update loop

    // clear screen

    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // draw

    ctx.fillStyle = "#ff8800";
    ctx.fillRect(256 + (Math.sin(DegToRad(time))*128), 256, 10, 10);

    time++;
}

let loopInterval = setInterval(GameLoop, 16);