//-------------------------------
//--- begin  variable init ------
//-------------------------------

    //element selectors
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext("2d");
    let gameMsg = document.getElementById("gameMsg");
    let bigGameMsg = document.getElementById("bigGameMsg");

    //counters
    let levelCounter = 0;
    let scoreCounter = 0;

    //flags - toggleable options
    let recentFlag = false;
    let browserResizeFlag = false;
    let tooSmallFlag = false;
    let startFlag = false;
    let xBoundsFlag = false;
    let yBoundsFlag = false;
    let debugFlag = true;
    let brokenCornerFlag = false;
    debugFlag === true && console.log("Known Issues with Debugging: \ndrawConfetti() will log the wrong quad on the first corner hit you do, \njust do another one");

    //array of dvd logo img's (experimenting with storing in data uri right now)
    let currentLogo = new Image();
    let arrLogoImages = ["dvdLogo1.png", "dvdLogo2.png", "dvdLogo3.png", "dvdLogo4.png", "dvdLogo5.png"]
    currentLogo.src = arrLogoImages[(Math.floor(Math.random() * 4 + 1))]; //gets random color to start game with

    //logo size
    let logoWidth = 300;
    let logoHeight = 157;

    //logo position x, y
    let logoPositionX, logoPositionY;

    //logo velocity x, y
    let logoVelocityX, logoVelocityY;

//-------------------------
//---- end variables ------
//-------------------------




//-------------------------
//-- begin game init ------
//-------------------------

    //sets logo position to middle of canvas
    //using the documents width/height because canvas height and width is inaccurate when this is set
    logoPositionX = document.body.clientWidth / 2;
    logoPositionY = document.body.clientHeight / 2;

    //random logo starting speed (between 50 and 100 pixels per a second)
    logoVelocityX = 1;
    logoVelocityY = 1;

    //random logo direction
    if (Math.floor(Math.random() * 2) === 0) {
        logoVelocityX = -logoVelocityX;
    }
    if (Math.floor(Math.random() * 2) === 0) {
        logoVelocityY = -logoVelocityY;
    }

//-------------------------
//-- end game init --
//-------------------------








//--------------------
//-- begin controls --
//--------------------

    document.addEventListener('keydown', function (event) {
        if (startFlag === true) {
            if (browserResizeFlag === false) {
                if (recentFlag === false) {
                    switch (event.code) {
                        case "KeyS":
                        case "ArrowDown":
                            //Make logo change direction to downwards, if the logo is moving upwards
                            if (logoVelocityY < 0) {
                                scoreCounter += 1;
                                recentFlag = true;
                                setTimeout(function () {
                                    recentFlag = false;
                                }, 1000);
                                logoVelocityY = Math.abs(logoVelocityY);
                                break;
                            } else {
                                break;
                            }
                        case "KeyW":
                        case "ArrowUp":
                            //Make logo change direction to upwards, if the logo is moving downwards
                            if (logoVelocityY > 0) {
                                scoreCounter += 1;
                                recentFlag = true;
                                setTimeout(function () {
                                    recentFlag = false;
                                }, 1000);
                                logoVelocityY = -logoVelocityY;
                                break;
                            } else {
                                break;
                            }
                        case "KeyA":
                        case "ArrowLeft":
                            //Make logo change direction to left, if the logo is moving right
                            if (logoVelocityX > 0) {
                                scoreCounter += 1;
                                recentFlag = true;
                                setTimeout(function () {
                                    recentFlag = false;
                                }, 1000);
                                logoVelocityX = -logoVelocityX;
                                break;
                            } else {
                                break;
                            }
                        case "KeyD":
                        case "ArrowRight":
                            //Make logo change direction to right, if the logo is moving left
                            if (logoVelocityX < 0) {
                                scoreCounter += 1;
                                recentFlag = true;
                                setTimeout(function () {
                                    recentFlag = false;
                                }, 1000);
                                logoVelocityX = Math.abs(logoVelocityX);
                                break;
                            } else {
                                break;
                            }
                    }
                } else {
                    gameMsg.innerHTML = "You can only move once per a second."
                    gameMsg.style.display = "block";
                    gameMsg.style.opacity = "100%";
                    setTimeout(function () {
                        gameMsg.style.opacity = "0%";
                    }, 500)
                }
            } else {
                gameMsg.innerHTML = "You cannot resize the window while the game is running. Refresh your browser to restartFlag."
                gameMsg.style.display = "block";
                gameMsg.style.opacity = "100%";
            }
        }
    });

//------------------
//-- end controls --
//------------------







//----------------------------
//-- begin helper functions --
//----------------------------

    //confetti effect and win sequence
    function drawConfetti(arg) {
        if (debugFlag === true) {
            switch (arg) {
                case 1:
                    console.log("quad 1");
                    break;
                case 2:
                    console.log("quad 2");
                    break;
                case 3:
                    console.log("quad 3");
                    break;
                case 4:
                    console.log("quad 4");
                    break;
            }
        }
        if (startFlag !== false) {
            if (party) {
                //create confetti effect using party.js
                party.confetti(party.Rect.fromScreen(), {
                        count: 300 * (window.innerWidth / 1980),
                        countVariation: 0.5,
                        angleSpan: 0,
                        logoVelocityYelocity: -100,
                        logoVelocityYelocitlogoVelocityYariation: 2,
                        rotationVelocityLimit: 6,
                        scaleVariation: 0.8
                    }
                );
                gameMsg.innerHTML = "Congrats! The more levels you complete the faster the logo moves."
                gameMsg.style.display = "block";
                gameMsg.style.opacity = "100%";
                setTimeout(function () {
                    gameMsg.style.opacity = "0%";
                }, 2000)

                levelCounter += 1;
                if(levelCounter >= 5){
                    //new feature, will be buggie
                    //adding no hit corners to increase difficulty and prevent afking

                    //worry about adding a fancy visual cue for the glitched corner later
                    brokenCornerFlag = true;
                    bigGameMsg.innerHTML = "Congrats! The more levels you complete the faster the logo moves."
                    bigGameMsg.style.display = "block";
                    bigGameMsg.style.opacity = "100%";
                }
                logoVelocityX = logoVelocityX * 1.1;
                logoVelocityY = logoVelocityY * 1.1;

                //resets dvdLogo position so you can't spam it
                logoPositionX = canvas.width / 2;
                logoPositionY = canvas.height / 2;
            } else {
                setTimeout(drawConfetti, 50)
            }
        }
    }

    //ensures the new dvd logo color is different then the current one
    function changeCurrentLogo() {
        let returnSrc = arrLogoImages[(Math.floor(Math.random() * 4 + 1))];
        if (returnSrc !== currentLogo.src) {
            return returnSrc;
        } else {
            changeCurrentLogo();
        }
    }

    //a little cheaky anticheat
    window.addEventListener('resize', function () {
        browserResizeFlag = true;
        document.querySelector("#start").style.display = "none";
        document.querySelector("#level").style.display = "none";
        document.querySelector("#score").style.display = "none";
    })

//--------------------------
//-- end helper functions --
//--------------------------










//----------------------
// -- begin game loop --
//----------------------

    //responsible for: redrawing canvas per frame, logo movement, dvd logo color change, making the logo bounce off walls, and checking for corner hits
    function update() {
        document.body.querySelector("#level i").innerHTML = levelCounter;
        document.body.querySelector("#score i").innerHTML = scoreCounter;
        if (document.body.clientWidth < currentLogo.width * 3 || document.body.clientHeight < currentLogo.height * 3) {
            tooSmallFlag = true;
        }
        if (browserResizeFlag === false) {
            if (tooSmallFlag === false) {
                //move the logo
                logoPositionX += logoVelocityX;
                logoPositionY += logoVelocityY;

                //bounce the logo off each wall
                if (logoPositionX - logoWidth / 2 < 0 && logoVelocityX < 0) {
                    //quad 3
                    yBoundsFlag === true && drawConfetti(3);
                    xBoundsFlag = true;
                    setTimeout(function () {
                        xBoundsFlag = false;
                    }, 50)
                    logoVelocityX = -logoVelocityX;
                    currentLogo.src = changeCurrentLogo();
                }
                //checking if logo position is more than the width of the canvas and if velocity is more than 0
                if (logoPositionX + logoWidth / 2 > canvas.width && logoVelocityX > 0) { //corner hit detection check
                    //quad 1
                    yBoundsFlag === true && drawConfetti(1);
                    xBoundsFlag = true;
                    setTimeout(function () {
                        xBoundsFlag = false;
                    }, 50)
                    logoVelocityX = -logoVelocityX;
                    currentLogo.src = changeCurrentLogo();
                }
                if (logoPositionY - logoHeight / 2 < 0 && logoVelocityY < 0) {
                    //quad 4
                    xBoundsFlag === true && drawConfetti(4);
                    yBoundsFlag = true;
                    setTimeout(function () {
                        yBoundsFlag = false;
                    }, 50)
                    logoVelocityY = -logoVelocityY;
                    currentLogo.src = changeCurrentLogo();
                }
                if (logoPositionY + logoHeight / 2 > canvas.height && logoVelocityY > 0) {  //corner hit detection check
                    //quad 2
                    xBoundsFlag === true && drawConfetti(2);
                    yBoundsFlag = true;
                    setTimeout(function () {
                        yBoundsFlag = false;
                    }, 50)
                    logoVelocityY = -logoVelocityY;
                    currentLogo.src = changeCurrentLogo();
                }

                //draw background and dvd logo
                context.fillStyle = "black";
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.drawImage(currentLogo, logoPositionX - logoWidth / 2, logoPositionY - logoHeight / 2);
            } else {
                gameMsg.innerHTML = "Your browser window is too small. Resize your browser and refresh the page. Mobile is currently not supported."
                gameMsg.style.display = "block";
                gameMsg.style.position = "absolute";
                gameMsg.style.top = "50%";
                gameMsg.style.margin = "auto";
                gameMsg.style.opacity = "100%";
                document.body.style.backgroundColor = "black";
            }
        } else {
            gameMsg.innerHTML = "You cannot resize the window while the game is running. Refresh your browser to restartFlag."
            gameMsg.style.display = "block";
            gameMsg.style.position = "absolute";
            gameMsg.style.top = "50%";
            gameMsg.style.margin = "auto";
            gameMsg.style.opacity = "100%";
            document.body.style.backgroundColor = "black";
        }
        window.requestAnimationFrame(update);
    }
    window.requestAnimationFrame(update);

//--------------------
// -- end game loop --
//--------------------
