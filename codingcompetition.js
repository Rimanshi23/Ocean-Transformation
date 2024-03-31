const canvas = document.getElementById("gamecanvas");
const gamecanvas = canvas.getContext("2d");
const dustbin = {
    x:canvas.width / 2,
    y:canvas.height - 50,
    width: 70,
    speed: 5,
    height: 50,
    dx: 0,
    dy: 0,
    image: new Image()
}
dustbin.image.src = "dustbin-removebg-preview.png";
dustbin.image.onload = function(){
    gamecanvas.drawImage(dustbin.image, dustbin.x, dustbin.y, dustbin.width, dustbin.height);
}
const trash = ["trash_1-removebg-preview.png", "trashbag.png", "trash 3.png"];
const score = document.getElementById("score");
const obstacles = [];
let points = 0;
let gamestatus = false;

function challenges(){
    const imagenumber = Math.floor(Math.random()*trash.length);
    const newchallenge = {
        x: Math.random()*(canvas.width-30),
        y: 0,
        width: 30,
        height: 30,
        speed: 2,
        image: new Image()
    };
    newchallenge.image.src = trash[imagenumber];
    obstacles.push(newchallenge);
}

document.addEventListener("keydown", function(event){
    event.preventDefault();
    if (event.key === "ArrowLeft"){
        dustbin.dx=-dustbin.speed;
    }
    else if (event.key === "ArrowRight"){
        dustbin.dx=dustbin.speed;
    }
    else if (event.key === "ArrowDown"){
        dustbin.dy=dustbin.speed;
    }
    else if (event.key === "ArrowUp"){
        dustbin.dy=-dustbin.speed;
    }
}
);

document.addEventListener("keyup", function(event){
    if (event.key === "ArrowLeft"){
        dustbin.dx=0;
    }
    else if (event.key === "ArrowRight"){
        dustbin.dx=0;
    }
    else if (event.key === "ArrowDown"){
        dustbin.dy=0;
    }
    else if (event.key === "ArrowUp"){
        dustbin.dy=0;
    }
}
);

function draw(){
    gamecanvas.clearRect(0, 0, canvas.width, canvas.height);
    if(gamestatus){
        return;
    }
    dustbin.x += dustbin.dx;
    dustbin.y += dustbin.dy;
    if (dustbin.x < 0){
        dustbin.x = 0;
    }
    else if (dustbin.x + dustbin.width > canvas.width){
        dustbin.x = canvas.width - dustbin.width;
    }
    if (dustbin.y < 0){
        dustbin.y = 0;
    }
    else if (dustbin.y + dustbin.height > canvas.height){
        dustbin.y = canvas.height - dustbin.height;
    }
    gamecanvas.drawImage(dustbin.image, dustbin.x, dustbin.y, dustbin.width, dustbin.height);
    obstacles.forEach((img, index) => {
        img.y += img.speed;
        if (
            dustbin.x < img.x + img.width &&
            dustbin.x + dustbin.width > img.x &&
            dustbin.y < img.y + img.height &&
            dustbin.y + dustbin.height > img.y
        ){
            points += 1;
            score.textContent = points;
            obstacles.splice(index, 1);
        }
        gamecanvas.drawImage(img.image, img.x, img.y, img.width, img.height);
        if (img.y > canvas.height){
            gamestatus = true;
            alert("Game over. The score you obtained is " + points);
            return;
        }
    }
    );
    requestAnimationFrame(draw);
}

setInterval(challenges, 1000);

dustbin.image.onload = function(){
    draw();
};