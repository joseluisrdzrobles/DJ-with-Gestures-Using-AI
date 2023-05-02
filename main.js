var rightWristy = 0;
var leftWristy = 0;
var rightWristx = 0;
var leftWristx = 0;

var volume = 1;
var speed = 1;

var music = "";

function preload() {
    music = loadSound("ahora_te_puedes_marchar.mp3");
}

function setup() {
    canvas = createCanvas(780, 580);
    canvas.center()

    video = createCapture(VIDEO);
    video.size(780, 480);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", obtainedPoses);
}

function draw() {
    translate(canvas.width, 0);
    scale(-1, 1);
    image(video, 0, 0, 780, 580);
    

    noStroke();

    fill("lime");
    circle(leftWristx, leftWristy, 25);

    fill("red")
    circle(rightWristx, rightWristy, 25);

    //Speed
    if(rightWristy < 100) {
        speed = 2.5;
    } else if (rightWristy < 150) {
        speed = 2.25;
    } else if (rightWristy < 200) {
        speed = 2;
    } else if (rightWristy < 250) {
        speed = 1.75;
    } else if (rightWristy < 300) {
        speed = 1.5;
    } else if (rightWristy < 350) {
        speed = 1.25;
    } else if (rightWristy < 400) {
        speed = 1;
    } else if (rightWristy < 450) {
        speed = 0.75;
    } else if (rightWristy < 500) {
        speed = 0.5;
    }
    music.rate(speed);

    volume = leftWristy / 580;
    volume = 1 - volume;
    volume = Math.round(volume * 10) / 10;
    console.log(volume);

    document.getElementsByClassName("volume")[0].innerText = "Volumen " + volume;
    document.getElementsByClassName("speed")[0].innerText = "Velocidad " + speed;
    
    //Volume
    music.setVolume(volume);
}

function modelLoaded() {
    console.log("Model succesfuly loaded!");
}

function obtainedPoses(results) {
    if (results.length > 0) {
        console.log(results);

        rightWristy = results[0].pose.rightWrist.y;
        leftWristy = results[0].pose.leftWrist.y;

        rightWristx = results[0].pose.rightWrist.x;
        leftWristx = results[0].pose.leftWrist.x;

    }
}

function playMusic() {
    music.stop();
    music.play();

}