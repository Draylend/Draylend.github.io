var score = 0;
var round = 1;
var startingAmount;
var lives = 3;
var highestRound = 0;
var highScore = 0;
var currentEvent = "N/A";
var counter = 0;
var order = [];
var tempOrder = [];
var orderSpecial = [];
var userInput = false;
var powerUpUse = false;
var roundOver = false;
var correctCounter = 0;
var song, difficulty, speed, betweenSpeed, multiplier;
var money = 10000;
var inventory = [];
var lifeSaverUse = 0;
var scoreIncrease = 0;
var revealActive = false;
var repeatUsed = 0;
var robotActive = false;
var w = (window.innerWidth / 2) - 175;
var h = (window.innerHeight / 2) - 150;

var intervalID = setInterval(background, 15000);

async function background() {
	var shapes = ["shapeOne", "shapeTwo", "shapeThree", "shapeFour", "shapeFive", "shapeSix", "shapeSeven", "shapeEight", "shapeNine", "shapeTen", "shapeEleven", "shapeTwelve", "shapeThirteen", "shapeFourteen", "shapeFifteen", "shapeSixteen", "shapeSeventeen", "shapeEighteen", "shapeNineteen", "shapeTwenty"];
	for(var i = 0; i < 20; i++) {
		var shapeNum = Math.floor(Math.random() * 2);
		await wait(100);
		if(shapeNum == 0) {
			document.getElementById(shapes[i]).classList.remove("circle");
			document.getElementById(shapes[i]).classList.add("square");
		} else if(shapeNum == 1) {
			document.getElementById(shapes[i]).classList.remove("square");
			document.getElementById(shapes[i]).classList.add("circle");
		}
		var leftPos = Math.floor(Math.random() * window.innerWidth);
		await wait(100);
		var delay = Math.random() * 10;
		await wait(100);
		var time = Math.floor((Math.random() * 15) + 10);
		await wait(100);
		var scale = 100 * (Math.random() * 3);
		await wait(100);
		document.getElementById(shapes[i]).style.width = scale + "px";
		document.getElementById(shapes[i]).style.height = scale + "px";
		document.getElementById(shapes[i]).style.marginLeft = leftPos + "px";
		document.getElementById(shapes[i]).style.animationDelay = delay + "s";
		document.getElementById(shapes[i]).style.animationDuration = time + "s";
	}
}

function pop() {
	var popFX = document.getElementById("popSound");
	popFX.volume = 0.7;
	popFX.currentTime = 0;
	popFX.play();
}

function startGame() {
	document.getElementById("resultNum").classList.remove("error");
	document.getElementById("resultNum").classList.remove("correct");
	if(round == 1)
	{
		document.getElementById("lifeNum").classList.remove("low");
		document.getElementById("lifeNum").classList.remove("high");
		var songChoice = Math.floor(Math.random() * 3);
		if(songChoice == 0) {
			song = document.getElementById("firstSong");
		} else if(songChoice == 1) {
			song = document.getElementById("secondSong");
		} else {
			song = document.getElementById("thirdSong");
		}
		
		if(difficulty == "easy") {
			speed = 500;
			betweenSpeed = 1000;
			multiplier = 1;
			startingAmount = 1;
		} else if(difficulty == "medium") {
			speed = 300;
			betweenSpeed = 700;
			multiplier = 1.2;
			startingAmount = 2;
		} else if(difficulty == "hard") {
			speed = 200;
			betweenSpeed = 500;
			multiplier = 1.5;
			startingAmount = 4;
		} else if(difficulty == "expert") {
			speed = 100;
			betweenSpeed = 200;
			multiplier = 2;
			startingAmount = 4;
		} else if(difficulty == "master") {
			speed = 20;
			betweenSpeed = 50;
			multiplier = 4;
			startingAmount = 5;
		} else if(difficulty == "special") {
			speed = 100;
			betweenSpeed = 200;
			multiplier = 0.75;
			startingAmount = 0;
		}
	}
	song.volume = 0.2;
	song.play(); 
	
	scoreIncrease = 0;
	lifeSaverUse = 0;
	revealActive = false;
	repeatUsed = 0;
	robotActive = false;
	roundOver = false;
	order = [];
	document.getElementById("menu").setAttribute("hidden", "hidden");
	document.getElementById("nextRound").setAttribute("hidden", "hidden");
	document.getElementById("tryAgain").setAttribute("hidden", "hidden");
	document.getElementById("backButton").setAttribute("hidden", "hidden");
	document.getElementById("menuButton").setAttribute("hidden", "hidden");
	document.getElementById("difficulties").setAttribute("hidden", "hidden");
	document.getElementById("powerUpText").classList.add("hidden", "hidden");
	
	document.getElementById("gameContent").removeAttribute("hidden");
	
	setTimeout(gameRound, 1000);
}

function showInstructions() {
	var buttonFX = document.getElementById("buttonSoundPush");
	buttonFX.volume = 0.7;
	buttonFX.currentTime = 0;
	buttonFX.play();
	document.getElementById("menu").setAttribute("hidden", "hidden");
	document.getElementById("nextRound").setAttribute("hidden", "hidden");
	document.getElementById("tryAgain").setAttribute("hidden", "hidden");
	
	document.getElementById("instructions").removeAttribute("hidden");
	document.getElementById("backButton").removeAttribute("hidden");
	
	setTimeout(buttonUnpush, 100);
}

function buttonUnpush() {
	var buttonFX = document.getElementById("buttonSoundUnpush");
	buttonFX.volume = 0.7;
	buttonFX.currentTime = 0;
	buttonFX.play();
}

function showMenu() {
	var startNextFX = document.getElementById("button2SoundPush");
	startNextFX.volume = 0.7;
	startNextFX.currentTime = 0;
	startNextFX.play();
	setTimeout(stopAudio, 1000);
	document.getElementById("instructions").setAttribute("hidden", "hidden");
	document.getElementById("shopMenu").setAttribute("hidden", "hidden");
	document.getElementById("backButton").setAttribute("hidden", "hidden");
	document.getElementById("menuButton").setAttribute("hidden", "hidden");
	document.getElementById("gameContent").setAttribute("hidden", "hidden");
	document.getElementById("warningSign").setAttribute("hidden", "hidden");
	document.getElementById("difficulties").setAttribute("hidden", "hidden");
	
	document.getElementById("menu").removeAttribute("hidden");
	
	document.getElementById("shopText").innerHTML = " ";
	
	lives = 3;
	round = 1;
	score = 0;
	counter = 0;
	correctCounter = 0;
	document.getElementById("roundNum").innerHTML = round;
	document.getElementById("lifeNum").innerHTML = lives;
	document.getElementById("scoreNum").innerHTML = score;
	document.getElementById("resultNum").innerHTML = "Please wait...";
	document.getElementById("resultNum").style.color = "#D7AB42";
	document.getElementById("lifeNum").style.color = "#87D76E";
	
	setTimeout(button2Unpush, 100);
}

function button2Unpush() {
	var buttonFX = document.getElementById("button2SoundUnpush");
	buttonFX.volume = 0.7;
	buttonFX.currentTime = 0;
	buttonFX.play();
}

function stopAudio()
{
	var sounds = document.getElementsByTagName('audio');
	for(i=0; i<sounds.length; i++) sounds[i].pause();
}

function showShop() {
	var startNextFX = document.getElementById("button3SoundPush");
	startNextFX.volume = 0.7;
	startNextFX.currentTime = 0;
	startNextFX.play();
	document.getElementById("lifeSaverButton").classList.remove("notEnough");
	document.getElementById("scoreIncreaseButton").classList.remove("notEnough");
	document.getElementById("revealButton").classList.remove("notEnough");
	document.getElementById("repeatButton").classList.remove("notEnough");
	document.getElementById("robotButton").classList.remove("notEnough");
	document.getElementById("shopText").classList.remove("shopText");
	document.getElementById("menu").setAttribute("hidden", "hidden");
	
	document.getElementById("shopMenu").removeAttribute("hidden");
	document.getElementById("backButton").removeAttribute("hidden");
	
	setTimeout(button3Unpush, 100);
}

function button3Unpush() {
	var buttonFX = document.getElementById("button3SoundUnpush");
	buttonFX.volume = 0.7;
	buttonFX.currentTime = 0;
	buttonFX.play();
}

function diffMenu() {
	var startNextFX = document.getElementById("startNextSound");
	startNextFX.volume = 0.7;
	startNextFX.currentTime = 0;
	startNextFX.play();
	document.getElementById("difficulties").removeAttribute("hidden");
	document.getElementById("backButton").removeAttribute("hidden");
	
	document.getElementById("menu").setAttribute("hidden", "hidden");
}

function setEasy() {
	var difficultyFX = document.getElementById("easySoundPush");
	difficultyFX.volume = 0.7;
	difficultyFX.currentTime = 0;
	difficultyFX.play();
	difficulty = "easy";
	setTimeout(easyUnpush, 100);
	startGame();
}

function easyUnpush() {
	var difficultyFX = document.getElementById("easySoundUnpush");
	difficultyFX.volume = 0.7;
	difficultyFX.currentTime = 0;
	difficultyFX.play();
}

function setMedium() {
	var difficultyFX = document.getElementById("normalSoundPush");
	difficultyFX.volume = 0.7;
	difficultyFX.currentTime = 0;
	difficultyFX.play();
	setTimeout(mediumUnpush, 100);
	difficulty = "medium";
	startGame();
}

function mediumUnpush() {
	var difficultyFX = document.getElementById("normalSoundUnpush");
	difficultyFX.volume = 0.7;
	difficultyFX.currentTime = 0;
	difficultyFX.play();
}

function setHard() {
	var difficultyFX = document.getElementById("hardSoundPush");
	difficultyFX.volume = 0.7;
	difficultyFX.currentTime = 0;
	difficultyFX.play();
	setTimeout(hardUnpush, 100);
	difficulty = "hard";
	startGame();
}

function hardUnpush() {
	var difficultyFX = document.getElementById("hardSoundUnpush");
	difficultyFX.volume = 0.7;
	difficultyFX.currentTime = 0;
	difficultyFX.play();
}

function setExpert() {
	var difficultyFX = document.getElementById("expertSoundPush");
	difficultyFX.volume = 0.7;
	difficultyFX.currentTime = 0;
	difficultyFX.play();
	setTimeout(expertUnpush, 100);
	difficulty = "expert";
	startGame();
}

function expertUnpush() {
	var difficultyFX = document.getElementById("expertSoundUnpush");
	difficultyFX.volume = 0.7;
	difficultyFX.currentTime = 0;
	difficultyFX.play();
}

function setMaster() {
	var difficultyFX = document.getElementById("masterSoundPush");
	difficultyFX.volume = 0.7;
	difficultyFX.currentTime = 0;
	difficultyFX.play();
	setTimeout(masterUnpush, 100);
	difficulty = "master";
	startGame();
}

function masterUnpush() {
	var difficultyFX = document.getElementById("masterSoundUnpush");
	difficultyFX.volume = 0.7;
	difficultyFX.currentTime = 0;
	difficultyFX.play();
}

function setSpecial() {
	var difficultyFX = document.getElementById("specialSoundPush");
	difficultyFX.volume = 0.7;
	difficultyFX.currentTime = 0;
	difficultyFX.play();
	setTimeout(specialUnpush, 100);
	difficulty = "special";
	tempOrder = [];
	startGame();
}

function specialUnpush() {
	var difficultyFX = document.getElementById("specialSoundUnpush");
	difficultyFX.volume = 0.7;
	difficultyFX.currentTime = 0;
	difficultyFX.play();
}

function warning() {
	var startNextFX = document.getElementById("startNextSound");
	startNextFX.volume = 0.7;
	startNextFX.currentTime = 0;
	startNextFX.play();
	document.getElementById("warningSign").style.left = w + "px";
	document.getElementById("warningSign").style.top = h + "px";
	document.getElementById("warningSign").removeAttribute("hidden");
}

function cancel() {
	var startNextFX = document.getElementById("button2SoundPush");
	startNextFX.volume = 0.7;
	startNextFX.currentTime = 0;
	startNextFX.play();
	document.getElementById("warningSign").setAttribute("hidden", "hidden");
	
	setTimeout(button2Unpush, 100);
}

function gameRound() {
	order = [];
	var timer = 1000;
	if(difficulty == "special") {
		for(var i = 0; i < tempOrder.length; i++) {
			order[i] = tempOrder[i];
		}
		var randomNum = Math.floor(Math.random() * 6);
		if(randomNum == 0) {
			order.push("redButton");
		} else if(randomNum == 1) {
			order.push("orangeButton");
		} else if(randomNum == 2) {
			order.push("yellowButton");
		} else if(randomNum == 3) {
			order.push("greenButton");
		} else if(randomNum == 4) {
			order.push("blueButton");
		} else if(randomNum == 5) {
			order.push("purpleButton");
		} 
    for(var i = 0; i < startingAmount + 1; i++) {
			if(order[i] == "redButton") {
				setTimeout(redPush, timer);
			} else if(order[i] == "orangeButton") {
				setTimeout(orangePush, timer);
			} else if(order[i] == "yellowButton") {
				setTimeout(yellowPush, timer);
			} else if(order[i] == "greenButton") {
				setTimeout(greenPush, timer);
			} else if(order[i] == "blueButton") {
				setTimeout(bluePush, timer);
			} else if(order[i] == "purpleButton") {
				setTimeout(purplePush, timer);
			}
			timer += (betweenSpeed + speed);
		}
		for(var i = 0; i < order.length; i++) {
			tempOrder[i] = order[i];
		}
	} else {
		for(var i = 0; i <= startingAmount; i++) {
			var randomNum = Math.floor(Math.random() * 6);
			if(randomNum == 0) {
				setTimeout(redPush, timer);
				order.push("redButton");
			} else if(randomNum == 1) {
				setTimeout(orangePush, timer);
				order.push("orangeButton");
			} else if(randomNum == 2) {
				setTimeout(yellowPush, timer);
				order.push("yellowButton");
			} else if(randomNum == 3) {
				setTimeout(greenPush, timer);
				order.push("greenButton");
			} else if(randomNum == 4) {
				setTimeout(bluePush, timer);
				order.push("blueButton");
			} else if(randomNum == 5) {
				setTimeout(purplePush, timer);
				order.push("purpleButton");
			}
			timer += (betweenSpeed + speed);
		}
	}
	setTimeout(enableUserInput, timer);
}

function enableUserInput() {
	document.getElementById("resultNum").innerHTML = "Your Turn!";
	document.getElementById("resultNum").style.color = "#77BF3B";
	userInput = true;
	powerUpUse = true;
}

function userChoice(order) {
	if(currentEvent == order[counter]) {
		document.getElementById("resultNum").innerHTML = "Correct!";
		document.getElementById("resultNum").style.color = "#28EE28";
		document.getElementById("resultNum").classList.remove("error");
		var element = document.getElementById("resultNum");
		element.classList.remove("correct");
		void element.offsetWidth;
		element.classList.add("correct");
		correctCounter++;
		counter++;
		revealActive = false;
		document.getElementById(order[counter - 1]).classList.remove("reveal");
		score += Math.round((Math.floor(Math.random() * 301) * round) * (multiplier + scoreIncrease));
		document.getElementById("scoreNum").innerHTML = score;
		if(correctCounter == startingAmount + 1) {
			var victorySong;
			var songChoice = Math.floor(Math.random() * 2);
			if(songChoice == 0) {
				victorySong = document.getElementById("victorySong");
			} else {
				victorySong = document.getElementById("victorySong2");
			}
			victorySong.volume = 0.7;
			victorySong.play();
			userInput = false;
			powerUpUse = false;
			roundOver = true;
			if(robotActive == true) {
				var robotFX = document.getElementById("robotOffSong");
				robotFX.volume = 0.7;
				robotFX.currentTime = 0;
				robotFX.play();
			}
			
			document.getElementById("resultNum").classList.remove("correct");
			document.getElementById("resultNum").innerHTML = "Round Won!";
			document.getElementById("resultNum").style.color = "#2BBDDF";
			document.getElementById("nextRound").removeAttribute("hidden");
			document.getElementById("menuButton").removeAttribute("hidden");
			
			money += Math.round(Math.floor((Math.random() * 201) + 100) * multiplier);
			document.getElementById("moneyNum").innerHTML = money;
			
			if(round > highestRound) {
				highestRound = round;
				document.getElementById("highRoundNum").innerHTML = highestRound;
			}
			if(score > highScore) {
				highScore = score;
				document.getElementById("highScoreNum").innerHTML = highScore;
			}
		}
	} else {
		document.getElementById("resultNum").classList.remove("correct");
		var wrongSoundFX = document.getElementById("wrongSound");
		wrongSoundFX.volume = 1;
		wrongSoundFX.currentTime = 0;
		wrongSoundFX.play();
		document.getElementById("resultNum").innerHTML = "Wrong!";
		document.getElementById("resultNum").style.color = "#DE0000";
		var element = document.getElementById("resultNum");
		element.classList.remove("error");
		void element.offsetWidth;
		element.classList.add("error");

		order.splice(correctCounter, 0, "Blank");
		
		lives--;
		if(lives > 5) {
			
		} else if(lives == 5) {
			document.getElementById("lifeNum").classList.remove("high");
			document.getElementById("lifeNum").style.color = "#6074AB";
		} else if(lives == 4) {
			document.getElementById("lifeNum").style.color = "#5BB286";
		} else if(lives == 3) {
			document.getElementById("lifeNum").style.color = "#87D76E";
		} else if(lives == 2) {
			document.getElementById("lifeNum").style.color = "#AAA314";
		} else {
			document.getElementById("lifeNum").style.color = "#A81418";
			document.getElementById("lifeNum").classList.add("low");
		}
		document.getElementById("lifeNum").innerHTML = lives;
		counter++;
		if(lives <= 0) {
			if(round > highestRound) {
				highestRound = round;
				document.getElementById("highRoundNum").innerHTML = highestRound;
			}
			if(score > highScore) {
				highScore = score;
				document.getElementById("highScoreNum").innerHTML = highScore;
			}
			
			lives--;
			document.getElementById("resultNum").classList.remove("error");
			var gameOverSound = document.getElementById("gameOver");
			gameOverSound.volume = 0.7;
			gameOverSound.play();
			
			if(robotActive == true) {
				var robotFX = document.getElementById("robotOffSong");
				robotFX.volume = 0.7;
				robotFX.currentTime = 0;
				robotFX.play();
			}
			userInput = false;
			powerUpUse = false;
			document.getElementById("resultNum").innerHTML = "Game Over!";
			document.getElementById("resultNum").style.color = "#502030";
			document.getElementById("tryAgain").removeAttribute("hidden");
			document.getElementById("menuButton").removeAttribute("hidden");
		}
	}
}

function tryAgain() {
	var startNextFX = document.getElementById("startNextSound");
	startNextFX.volume = 0.7;
	startNextFX.currentTime = 0;
	startNextFX.play();
	lives = 3;
	round = 1;
	score = 0;
	if(revealActive == true) {
		var temp = String(order[counter]);
		document.getElementById(temp).classList.remove("reveal");
	}
	
	counter = 0;
	correctCounter = 0;
	scoreIncrease = 0;
	document.getElementById("roundNum").innerHTML = round;
	document.getElementById("lifeNum").innerHTML = lives;
	document.getElementById("scoreNum").innerHTML = score;
	document.getElementById("resultNum").innerHTML = "Please wait...";
	document.getElementById("resultNum").style.color = "#D7AB42";
	document.getElementById("lifeNum").style.color = "#87D76E";
	song.pause();
	startGame();
}

function nextRound() {
	var startNextFX = document.getElementById("startNextSound");
	startNextFX.volume = 0.7;
	startNextFX.currentTime = 0;
	startNextFX.play();
	round++;
	startingAmount++;
	document.getElementById("roundNum").innerHTML = round;
	correctCounter = 0;
	counter = 0;
	scoreIncrease = 0;
	document.getElementById("resultNum").innerHTML = "Please wait...";
	document.getElementById("resultNum").style.color = "#D7AB42";
	startGame();
}

function redPush() {
	var redSoundFX = document.getElementById("redSoundPush");
	redSoundFX.volume = 0.7;
	redSoundFX.currentTime = 0;
	
	redSoundFX.play();
	document.getElementById("redButton").style.backgroundColor = "#FF7474";
	document.getElementById("redButton").style.boxShadow = "0 2px #383738";
	document.getElementById("redButton").style.transform = "translateY(3px)";
	
	currentEvent = "redButton";
	setTimeout(redUnpush, speed);
	if(userInput == true) {
		userChoice(order);
	}
}

function redUnpush() {
	var redSoundFX = document.getElementById("redSoundUnpush");
	redSoundFX.volume = 0.7;
	redSoundFX.currentTime = 0;
	
	redSoundFX.play();
	
	document.getElementById("redButton").style.backgroundColor = "#EB1C1C";
	document.getElementById("redButton").style.boxShadow = "0 5px #383738";
	document.getElementById("redButton").style.transform = "translateY(0px)";
}

function orangePush() {
	var orangeSoundFX = document.getElementById("orangeSoundPush");
	orangeSoundFX.volume = 0.7;
	orangeSoundFX.currentTime = 0;
	orangeSoundFX.play();
	document.getElementById("orangeButton").style.backgroundColor = "#FFB374";
	document.getElementById("orangeButton").style.boxShadow = "0 2px #383738";
	document.getElementById("orangeButton").style.transform = "translateY(3px)";
	
	currentEvent = "orangeButton";
	setTimeout(orangeUnpush, speed);
	if(userInput == true) {
		userChoice(order);
	}
}

function orangeUnpush() {
	var orangeSoundFX = document.getElementById("orangeSoundUnpush");
	orangeSoundFX.volume = 0.7;
	orangeSoundFX.currentTime = 0;
	orangeSoundFX.play();
	
	document.getElementById("orangeButton").style.backgroundColor = "#EB7A1C";
	document.getElementById("orangeButton").style.boxShadow = "0 5px #383738";
	document.getElementById("orangeButton").style.transform = "translateY(0px)";
}

function yellowPush() {
	var yellowSoundFX = document.getElementById("yellowSoundPush");
	yellowSoundFX.volume = 0.7;
	yellowSoundFX.currentTime = 0;
	yellowSoundFX.play();
	document.getElementById("yellowButton").style.backgroundColor = "#FFE774";
	document.getElementById("yellowButton").style.boxShadow = "0 2px #383738";
	document.getElementById("yellowButton").style.transform = "translateY(3px)";
	
	currentEvent = "yellowButton";
	setTimeout(yellowUnpush, speed);
	if(userInput == true) {
		userChoice(order);
	}
}

function yellowUnpush() {
	var yellowSoundFX = document.getElementById("yellowSoundUnpush");
	yellowSoundFX.volume = 0.7;
	yellowSoundFX.currentTime = 0;
	yellowSoundFX.play();
	
	document.getElementById("yellowButton").style.backgroundColor = "#EBC71C";
	document.getElementById("yellowButton").style.boxShadow = "0 5px #383738";
	document.getElementById("yellowButton").style.transform = "translateY(0px)";
}

function greenPush() {
	var greenSoundFX = document.getElementById("greenSoundPush");
	greenSoundFX.volume = 0.7;
	greenSoundFX.currentTime = 0;
	greenSoundFX.play();
	document.getElementById("greenButton").style.backgroundColor = "#8FE367";
	document.getElementById("greenButton").style.boxShadow = "0 2px #383738";
	document.getElementById("greenButton").style.transform = "translateY(3px)";
	
	
	currentEvent = "greenButton";
	setTimeout(greenUnpush, speed);
	if(userInput == true) {
		userChoice(order);
	}
}

function greenUnpush() {
	var greenSoundFX = document.getElementById("greenSoundUnpush");
	greenSoundFX.volume = 0.7;
	greenSoundFX.currentTime = 0;
	greenSoundFX.play();
	
	document.getElementById("greenButton").style.backgroundColor = "#52CB18";
	document.getElementById("greenButton").style.boxShadow = "0 5px #383738";
	document.getElementById("greenButton").style.transform = "translateY(0px)";
}

function bluePush() {
	var blueSoundFX = document.getElementById("blueSoundPush");
	blueSoundFX.volume = 0.7;
	blueSoundFX.currentTime = 0;
	blueSoundFX.play();
	document.getElementById("blueButton").style.backgroundColor = "#6471BF";
	document.getElementById("blueButton").style.boxShadow = "0 2px #383738";
	document.getElementById("blueButton").style.transform = "translateY(3px)";
	
	
	currentEvent = "blueButton";
	setTimeout(blueUnpush, speed);
	if(userInput == true) {
		userChoice(order);
	}
}

function blueUnpush() {
	var blueSoundFX = document.getElementById("blueSoundUnpush");
	blueSoundFX.volume = 0.7;
	blueSoundFX.currentTime = 0;
	blueSoundFX.play();
	
	document.getElementById("blueButton").style.backgroundColor = "#2637A1";
	document.getElementById("blueButton").style.boxShadow = "0 5px #383738";
	document.getElementById("blueButton").style.transform = "translateY(0px)";
}

function purplePush() {
	var purpleSoundFX = document.getElementById("purpleSoundPush");
	purpleSoundFX.volume = 0.7;
	purpleSoundFX.currentTime = 0;
	purpleSoundFX.play();
	document.getElementById("purpleButton").style.backgroundColor = "#9D59BA";
	document.getElementById("purpleButton").style.boxShadow = "0 2px #383738";
	document.getElementById("purpleButton").style.transform = "translateY(3px)";
	
	currentEvent = "purpleButton";
	setTimeout(purpleUnpush, speed);
	if(userInput == true) {
		userChoice(order);
	}
}

function purpleUnpush() {
	var purpleSoundFX = document.getElementById("purpleSoundUnpush");
	purpleSoundFX.volume = 0.7;
	purpleSoundFX.currentTime = 0;
	purpleSoundFX.play();
	
	document.getElementById("purpleButton").style.backgroundColor = "#74199C";
	document.getElementById("purpleButton").style.boxShadow = "0 5px #383738";
	document.getElementById("purpleButton").style.transform = "translateY(0px)";
}

function titlePush() {
	var whirSoundFX = document.getElementById("whirSoundPush");
	whirSoundFX.volume = 0.7;
	whirSoundFX.currentTime = 0;
	whirSoundFX.play();
	setTimeout(whirUnpush, 100);
	var randomNum = Math.floor(Math.random() * 6);
	if(randomNum == 0) {
		document.getElementById("titleWord").style.color = "#E72929";
		document.getElementById("titleWord2").style.color = "#E72929";
		document.getElementById("titleButton").style.color = "#E72929";
		document.getElementById("body").style.backgroundImage = "url('backgrounds/redPentagon.png')";
		const collection = document.getElementsByClassName("shape");
		for (let i = 0; i < collection.length; i++) {
		  collection[i].style.backgroundColor = "#FFFFBA";
		}
	} else if(randomNum == 1) {
		document.getElementById("titleWord").style.color = "#E79429";
		document.getElementById("titleWord2").style.color = "#E79429";
		document.getElementById("titleButton").style.color = "#E79429";
		document.getElementById("body").style.backgroundImage = "url('backgrounds/orangePentagon.png')";
		const collection = document.getElementsByClassName("shape");
		for (let i = 0; i < collection.length; i++) {
		  collection[i].style.backgroundColor = "#ADD5E9";
		}
	} else if(randomNum == 2) {
		document.getElementById("titleWord").style.color = "#E7E729";
		document.getElementById("titleWord2").style.color = "#E7E729";
		document.getElementById("titleButton").style.color = "#E7E729";
		document.getElementById("body").style.backgroundImage = "url('backgrounds/yellowPentagon.png')";
		const collection = document.getElementsByClassName("shape");
		for (let i = 0; i < collection.length; i++) {
		  collection[i].style.backgroundColor = "#FDB9BF";
		}
	} else if(randomNum == 3) {
		document.getElementById("titleWord").style.color = "#4FC523";
		document.getElementById("titleWord2").style.color = "#4FC523";
		document.getElementById("titleButton").style.color = "#4FC523";
		document.getElementById("body").style.backgroundImage = "url('backgrounds/greenPentagon.png')";
		const collection = document.getElementsByClassName("shape");
		for (let i = 0; i < collection.length; i++) {
		  collection[i].style.backgroundColor = "#CAB2EC";
		}
	} else if(randomNum == 4) {
		document.getElementById("titleWord").style.color = "#2B419D";
		document.getElementById("titleWord2").style.color = "#2B419D";
		document.getElementById("titleButton").style.color = "#2B419D";
		document.getElementById("body").style.backgroundImage = "url('backgrounds/bluePentagon.png')";
		const collection = document.getElementsByClassName("shape");
		for (let i = 0; i < collection.length; i++) {
		  collection[i].style.backgroundColor = "#FDB9BF";
		}
	} else if(randomNum == 5) {
		document.getElementById("titleWord").style.color = "#752199";
		document.getElementById("titleWord2").style.color = "#752199";
		document.getElementById("titleButton").style.color = "#752199";
		document.getElementById("body").style.backgroundImage = "url('backgrounds/purplePentagon.png')";
		const collection = document.getElementsByClassName("shape");
		for (let i = 0; i < collection.length; i++) {
		  collection[i].style.backgroundColor = "#FFE4BA";
		}
	}
}

function whirUnpush() {
	var whirSoundFX = document.getElementById("whirSoundUnpush");
	whirSoundFX.volume = 0.7;
	whirSoundFX.currentTime = 0;
	whirSoundFX.play();
}

document.addEventListener("keypress", function(event) {
  if(event.keyCode == 115) {
	  redPush();
  } else if(event.keyCode == 100) {
	  orangePush();
  } else if(event.keyCode == 102) {
	  yellowPush();
  } else if(event.keyCode == 106) {
	  greenPush();
  } else if(event.keyCode == 107) {
	  bluePush();
  } else if(event.keyCode == 108) {
	  purplePush();
  }
});

function checkInventory(item) {
	for(var i = 0; i < inventory.length; i++) {
		if(inventory[i] == item) {
			return true;
		}
	}
}

function checkInventoryCount(item) {
	var temp = 0;
	var isZero = true;
	for(var i = 0; i < inventory.length; i++) {
		if(inventory[i] == item) {
			temp++;
			isZero = false;
		}
	}
	if(isZero == true) {
		temp = 0;
	}
	return temp;
}

function playNotEnough() {
	var notEnoughFX = document.getElementById("notEnoughSound");
	notEnoughFX.volume = 0.7;
	notEnoughFX.currentTime = 0;
	notEnoughFX.play();
}

function playBought() {
	var boughtFX = document.getElementById("pianoRiffSound");
	boughtFX.volume = 0.7;
	boughtFX.currentTime = 0;
	boughtFX.play();
}

function noPowerUp() {
	var noPowerUpFX = document.getElementById("noPowerUpSound");
	noPowerUpFX.volume = 0.7;
	noPowerUpFX.currentTime = 0;
	noPowerUpFX.play();
}

function buyLifeSaver() {
	if(money >= 350) {
		playBought();
		inventory.push("lifeSaver");
		var temp = checkInventoryCount("lifeSaver");
		document.getElementById("lifeSaverAmount").innerHTML = temp;
		money -= 350;
		document.getElementById("shopText").innerHTML = "Purchase Successful!";
		document.getElementById("shopText").style.color = "#0F6D1B";
		document.getElementById("moneyNum").innerHTML = money;
		var element = document.getElementById("shopText");
		element.classList.remove("shopText");
		void element.offsetWidth;
		element.classList.add("shopText");
	} else {
		playNotEnough();
		var element = document.getElementById("lifeSaverButton");
		element.classList.remove("notEnough");
		void element.offsetWidth;
		element.classList.add("notEnough");
		document.getElementById("shopText").innerHTML = "Not enough money!";
		document.getElementById("shopText").style.color = "#F90000";
		var element2 = document.getElementById("shopText");
		element2.classList.remove("shopText");
		void element2.offsetWidth;
		element2.classList.add("shopText");
	}
}

function useLS() {
	if(powerUpUse == true) {
		if(checkInventory("lifeSaver") == true) {
			if(lifeSaverUse == 5) {
				document.getElementById("powerUpText").innerHTML = "Max limit reached this round!";
				var element = document.getElementById("powerUpText");
				element.classList.remove("powerUpText");
				void element.offsetWidth;
				element.classList.add("powerUpText");
				noPowerUp();
			} else {
				document.getElementById("powerUpText").classList.remove("hidden");
				var lifeSaverFX = document.getElementById("lifeSaverSong");
				lifeSaverFX.volume = 0.7;
				lifeSaverFX.currentTime = 0;
				lifeSaverFX.play();
				inventory.splice(inventory.indexOf("lifeSaver"), 1);
				var temp = checkInventoryCount("lifeSaver");
				document.getElementById("lifeSaverAmount").innerHTML = temp;
				
				lives += 1;
				lifeSaverUse++;
				document.getElementById("lifeNum").innerHTML = lives;
				document.getElementById("powerUpText").innerHTML = "Power UP activated! Added EXTRA life!";
				var element = document.getElementById("powerUpText");
				element.classList.remove("powerUpText");
				void element.offsetWidth;
				element.classList.add("powerUpText");
				
				if(lives > 5) {
					document.getElementById("lifeNum").classList.add("high");
				}	else if(lives == 5) {
					document.getElementById("lifeNum").style.color = "#6074AB";
				} else if(lives == 4) {
					document.getElementById("lifeNum").style.color = "#5BB286";
				} else if(lives == 3) {
					document.getElementById("lifeNum").style.color = "#87D76E";
				}	else if(lives == 2) {
					document.getElementById("lifeNum").classList.remove("low");
					document.getElementById("lifeNum").style.color = "#AAA314";
				}
			}
		}	else {
			noPowerUp();
		}
	} else {
		noPowerUp();
	}
}

function buyScoreIncrease() {
	if(money >= 500) {
		playBought();
		inventory.push("scoreIncrease");
		var temp = checkInventoryCount("scoreIncrease");
		document.getElementById("scoreIncreaseAmount").innerHTML = temp;
		money -= 500;
		document.getElementById("shopText").innerHTML = "Purchase Successful!";
		document.getElementById("shopText").style.color = "#0F6D1B";
		document.getElementById("moneyNum").innerHTML = money;
		var element = document.getElementById("shopText");
		element.classList.remove("shopText");
		void element.offsetWidth;
		element.classList.add("shopText");
	} else {
		playNotEnough();
		var element = document.getElementById("scoreIncreaseButton");
		element.classList.remove("notEnough");
		void element.offsetWidth;
		element.classList.add("notEnough");
		document.getElementById("shopText").innerHTML = "Not enough money!";
		document.getElementById("shopText").style.color = "#F90000";
		var element2 = document.getElementById("shopText");
		element2.classList.remove("shopText");
		void element2.offsetWidth;
		element2.classList.add("shopText");
	}
}

function useSI() {
	if(powerUpUse == true) {
		if(scoreIncrease == 0) {
			if(checkInventory("scoreIncrease") == true) {
				document.getElementById("powerUpText").classList.remove("hidden");
				var scoreIncreaseFX = document.getElementById("scoreIncreaseSong");
				scoreIncreaseFX.volume = 0.7;
				scoreIncreaseFX.currentTime = 0;
				scoreIncreaseFX.play();
				inventory.splice(inventory.indexOf("scoreIncrease"), 1);
				var temp = checkInventoryCount("scoreIncrease");
				document.getElementById("scoreIncreaseAmount").innerHTML = temp;
			
				scoreIncrease = (Math.floor(Math.random() * 200) + 50);
				document.getElementById("powerUpText").innerHTML = "Power UP Activated! You have a " + scoreIncrease + "% increase!";
				var element = document.getElementById("powerUpText");
				element.classList.remove("powerUpText");
				void element.offsetWidth;
				element.classList.add("powerUpText");
			}	else {
				noPowerUp();
			}
		} else {
			noPowerUp();
			document.getElementById("powerUpText").innerHTML = "You already have a current Score Increase active!";
			var element = document.getElementById("powerUpText");
			element.classList.remove("powerUpText");
			void element.offsetWidth;
			element.classList.add("powerUpText");
		}
	} else {
		noPowerUp();
	}
}

function buyReveal() {
	if(money >= 750) {
		playBought();
		inventory.push("reveal");
		var temp = checkInventoryCount("reveal");
		document.getElementById("revealAmount").innerHTML = temp;
		money -= 750;
		document.getElementById("shopText").innerHTML = "Purchase Successful!";
		document.getElementById("shopText").style.color = "#0F6D1B";
		document.getElementById("moneyNum").innerHTML = money;
		var element = document.getElementById("shopText");
		element.classList.remove("shopText");
		void element.offsetWidth;
		element.classList.add("shopText");
	} else {
		playNotEnough();
		var element = document.getElementById("revealButton");
		element.classList.remove("notEnough");
		void element.offsetWidth;
		element.classList.add("notEnough");
		document.getElementById("shopText").innerHTML = "Not enough money!";
		document.getElementById("shopText").style.color = "#F90000";
		var element2 = document.getElementById("shopText");
		element2.classList.remove("shopText");
		void element2.offsetWidth;
		element2.classList.add("shopText");
	}
}

function useR() {
	if(powerUpUse == true) {
		if(revealActive == false) {
			if(checkInventory("reveal") == true) {
				document.getElementById("powerUpText").classList.remove("hidden");
				var revealFX = document.getElementById("revealSong");
				revealFX.volume = 0.7;
				revealFX.currentTime = 0;
				revealFX.play();
				inventory.splice(inventory.indexOf("reveal"), 1);
				var temp = checkInventoryCount("reveal");
				document.getElementById("revealAmount").innerHTML = temp;
			
				revealActive = true;
				
				document.getElementById(order[counter]).classList.add("reveal");
				
				document.getElementById("powerUpText").innerHTML = "Power UP Activated! The current button has been revealed!";
				var element = document.getElementById("powerUpText");
				element.classList.remove("powerUpText");
				void element.offsetWidth;
				element.classList.add("powerUpText");
			} else {
				noPowerUp();
			}
		} else {
			noPowerUp();
			document.getElementById("powerUpText").innerHTML = "A button is already currently revealed!";
			var element = document.getElementById("powerUpText");
			element.classList.remove("powerUpText");
			void element.offsetWidth;
			element.classList.add("powerUpText");
		}
	} else {
		noPowerUp();
	}
}

function buyRepeat() {
	if(money >= 750) {
		playBought();
		inventory.push("repeat");
		var temp = checkInventoryCount("repeat");
		document.getElementById("repeatAmount").innerHTML = temp;
		money -= 750;
		document.getElementById("shopText").innerHTML = "Purchase Successful!";
		document.getElementById("shopText").style.color = "#0F6D1B";
		document.getElementById("moneyNum").innerHTML = money;
		var element = document.getElementById("shopText");
		element.classList.remove("shopText");
		void element.offsetWidth;
		element.classList.add("shopText");
	} else {
		playNotEnough();
		var element = document.getElementById("repeatButton");
		element.classList.remove("notEnough");
		void element.offsetWidth;
		element.classList.add("notEnough");
		document.getElementById("shopText").innerHTML = "Not enough money!";
		document.getElementById("shopText").style.color = "#F90000";
		var element2 = document.getElementById("shopText");
		element2.classList.remove("shopText");
		void element2.offsetWidth;
		element2.classList.add("shopText");
	}
}

function useRe() {
	if(powerUpUse == true) {
		if(robotActive == true)	{
			noPowerUp();
			document.getElementById("powerUpText").innerHTML = "Cannot use while Robot is active!";
			var element = document.getElementById("powerUpText");
			element.classList.remove("powerUpText");
			void element.offsetWidth;
			element.classList.add("powerUpText");
		} else if(checkInventory("repeat") == true) {
			if(repeatUsed !== 2) {
				document.getElementById("powerUpText").classList.remove("hidden");
				repeatUsed++;
				userInput = false;
				var repeatFX = document.getElementById("repeatSong");
				repeatFX.volume = 0.7;
				repeatFX.currentTime = 0;
				repeatFX.play();
				inventory.splice(inventory.indexOf("repeat"), 1);
				var temp = checkInventoryCount("repeat");
				document.getElementById("repeatAmount").innerHTML = temp;
				document.getElementById("resultNum").innerHTML = "Repeating...";
				document.getElementById("resultNum").style.color = "#D7AB42";
				
				var tempSpeed = betweenSpeed;
				tempSpeed += (tempSpeed * 3);
				var timer = 1000;
				for(var i = 0; i <= startingAmount; i++) {
					if(order[i] == "redButton") {
						setTimeout(redPush, timer);
					} else if(order[i] == "orangeButton") {
						setTimeout(orangePush, timer);
					}
					else if(order[i] == "yellowButton")
					{
						setTimeout(yellowPush, timer);
					}
					else if(order[i] == "greenButton")
					{
						setTimeout(greenPush, timer);
					}
					else if(order[i] == "blueButton")
					{
						setTimeout(bluePush, timer);
					}
					else if(order[i] == "purpleButton")
					{
						setTimeout(purplePush, timer);
					}
					timer += (tempSpeed + speed);
				}
				setTimeout(enableUserInput, timer);
				
				document.getElementById("powerUpText").innerHTML = "Power UP Activated! The button order is being repeated!";
				var element = document.getElementById("powerUpText");
				element.classList.remove("powerUpText");
				void element.offsetWidth;
				element.classList.add("powerUpText");
			} else {
				noPowerUp();
				document.getElementById("powerUpText").innerHTML = "Repeat has already been used this round!";
				var element = document.getElementById("powerUpText");
				element.classList.remove("powerUpText");
				void element.offsetWidth;
				element.classList.add("powerUpText");
			}
		} else {
			noPowerUp();
		}
	} else {
		noPowerUp();
	}
}

function buyRobot() {
	if(money >= 3000) {
		playBought();
		inventory.push("robot");
		var temp = checkInventoryCount("robot");
		document.getElementById("robotAmount").innerHTML = temp;
		money -= 3000;
		document.getElementById("shopText").innerHTML = "Purchase Successful!";
		document.getElementById("shopText").style.color = "#0F6D1B";
		document.getElementById("moneyNum").innerHTML = money;
		var element = document.getElementById("shopText");
		element.classList.remove("shopText");
		void element.offsetWidth;
		element.classList.add("shopText");
	} else {
		playNotEnough();
		var element = document.getElementById("robotButton");
		element.classList.remove("notEnough");
		void element.offsetWidth;
		element.classList.add("notEnough");
		document.getElementById("shopText").innerHTML = "Not enough money!";
		document.getElementById("shopText").style.color = "#F90000";
		var element2 = document.getElementById("shopText");
		element2.classList.remove("shopText");
		void element2.offsetWidth;
		element2.classList.add("shopText");
	}
}

function wait(milisec) {
    return new Promise(resolve => {
		setTimeout(() => { resolve('') }, milisec);
    })
}

async function useRo() {
	if(powerUpUse == true) {
		if(robotActive == false) {
			if(checkInventory("robot") == true) {
				var robotFX = document.getElementById("robotOnSong");
				robotFX.volume = 0.7;
				robotFX.currentTime = 0;
				robotFX.play();
				document.getElementById("powerUpText").classList.remove("hidden");
				inventory.splice(inventory.indexOf("robot"), 1);
				document.getElementById("robotPower").style.backgroundImage = "url('assets/robotOnIcon.png')";
				var temp = checkInventoryCount("robot");
				document.getElementById("robotAmount").innerHTML = temp;
			
				robotActive = true;
				document.getElementById("powerUpText").innerHTML = "Power UP Activated! Unrealiable Robot on duty!";
				var element = document.getElementById("powerUpText");
				element.classList.remove("powerUpText");
				void element.offsetWidth;
				element.classList.add("powerUpText");
				
				var timer = 1000;
				var accuracy = 90;
				var robotStartAmount = startingAmount + 1;
				for(var i = correctCounter; i < robotStartAmount; i++) {
					await wait(1000);
					var answer = String(order[i]);
					var answerNum;
					if(answer === "redButton") {
						answerNum = 0;
					} else if(answer === "orangeButton") {
						answerNum = 1;
					} else if(answer === "yellowButton") {
						answerNum = 2;
					} else if(answer === "greenButton") {
						answerNum = 3;
					} else if(answer === "blueButton") {
						answerNum = 4;
					} else if(answer === "purpleButton") {
						answerNum = 5;
					}
					var roll = (Math.floor(Math.random() * 100) + 1);
					if(accuracy > roll) {
						await wait(700);
						if(answer === "redButton" && lives > 0 && roundOver == false) {
							setTimeout(redPush, timer);
						} else if(answer === "orangeButton" && lives > 0 && roundOver == false) {
							setTimeout(orangePush, timer);
						} else if(answer === "yellowButton" && lives > 0 && roundOver == false) {
							setTimeout(yellowPush, timer);
						} else if(answer === "greenButton" && lives > 0 && roundOver == false) {
							setTimeout(greenPush, timer);
						} else if(answer === "blueButton" && lives > 0 && roundOver == false) {
							setTimeout(bluePush, timer);
						} else if(answer === "purpleButton" && lives > 0 && roundOver == false) {
							setTimeout(purplePush, timer);
					  } else {
							document.getElementById("robotPower").style.backgroundImage = "url('assets/robotOffIcon.png')";
							break;
						}
						
						if(accuracy > 10) {
							accuracy -= 10;
						}
					} else {
						robotStartAmount++;
						await wait(700);
						var randomNum = Math.floor(Math.random() * 6);
						while(randomNum == answerNum) {
							randomNum = Math.floor(Math.random() * 6);
						}
						if(randomNum === 0 && lives > 0 && roundOver == false) {
							setTimeout(redPush, timer);
						} else if(randomNum === 1 && lives > 0 && roundOver == false) {
							setTimeout(orangePush, timer);
						} else if(randomNum === 2 && lives > 0 && roundOver == false) {
							setTimeout(yellowPush, timer);
						} else if(randomNum === 3 && lives > 0 && roundOver == false) {
							setTimeout(greenPush, timer);
				    } else if(randomNum === 4 && lives > 0 && roundOver == false) {
							setTimeout(bluePush, timer);
						} else if(randomNum === 5 && lives > 0 && roundOver == false) {
							setTimeout(purplePush, timer);
					  } else {
							document.getElementById("robotPower").style.backgroundImage = "url('assets/robotOffIcon.png')";
							break;
						}
					}
				}
			} else {
				noPowerUp();
			}
		} else {
			noPowerUp();
			document.getElementById("powerUpText").innerHTML = "The Robot is already awake!";
			var element = document.getElementById("powerUpText");
			element.classList.remove("powerUpText");
			void element.offsetWidth;
			element.classList.add("powerUpText");
		}
	} else {
		noPowerUp();
	}
}
