var landingElements = document.querySelector('#landing-contents');
var highscoreButton = document.querySelector('#highscore-button');
var quizElements = document.querySelector('#quiz-contents')
var endElements = document.querySelector('#end-contents');
var scoreElements = document.querySelector('#score-contents');
var startButton = document.querySelector('#start-button');
var endButton = document.querySelector('#name-submit');
var nameInput = document.querySelector('#name-input');
var time = document.querySelector('#timer');

var question = document.querySelector('#question');
var answer1 = document.querySelector('#a1');
var answer2 = document.querySelector('#a2');
var answer3 = document.querySelector('#a3');
var answer4 = document.querySelector('#a4');
var result = document.querySelector('#result');

var questionNum = 0;
var correctAnswers = 0;
var timer;
var timerSeconds;

// todo: write elements for populate, add storage and ending screens
//Questions taken/inspired from w3schools js quiz because I'm not creative enough https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS
var questions = [
    {
        question: 'Inside which HTML element do we put JavaScript?',
        answer1: '<script>',
        answer2: '<js>',
        answer3: '<javascript>',
        answer4: '<scripting>',
        correctAnswer: '<script>'
    },
    {
        question: 'What is the correct JavaScript syntax to change the content of the HTML element?\n<p id="demo">This is a demo</p>',
        answer1: 'document.getElementById("demo").innerHTML = "Hello World!";',
        answer2: 'document.getElement("p").innerHTML = "Hello World!";',
        answer3: '#demo.innerHTML = "Hello World!";',
        answer4: 'document.getElementByName("p").innerHTML = "Hello World!";',
        correctAnswer: 'document.getElementById("demo").innerHTML = "Hello World!";'
    },
    {
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        answer1: '<script src="xxx.js">',
        answer2: '<script href="xxx.js">',
        answer3: '<script name="xxx.js">',
        answer4: '<script class="xxx.js">',
        correctAnswer: '<script src="xxx.js">'
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answer1: 'msgBox("Hello World");',
        answer2: 'msg("Hello World");',
        answer3: 'alert("Hello World");',
        answer4: 'alertBox("Hello World");',
        correctAnswer: 'alert("Hello World");'
    },
    {
        question: 'How do you create a function in JavaScript?',
        answer1: 'function = myFunction()',
        answer2: 'function:myFunction()',
        answer3: 'function myFunction()',
        answer4: 'def function()',
        correctAnswer: 'function myFunction()'
    },
    {
        question: 'How do you call a function named "myFunction"?',
        answer1: 'myFunction()',
        answer2: 'myFunction',
        answer3: 'call function myFunction()',
        answer4: 'call myFunction()',
        correctAnswer: 'myFunction()'
    },
    {
        question: 'How to write an IF statement in JavaScript?',
        answer1: 'if i = 5',
        answer2: 'if i = 5 then',
        answer3: 'if i == 5 then',
        answer4: 'if (i == 5)',
        correctAnswer: 'if (i == 5)'
    },
    {
        question: 'What is a proper way to write a WHILE loop?',
        answer1: 'while(i = 0; i < 5; i++)',
        answer2: 'while (i < 5; i++)',
        answer3: 'while(i < 5)',
        answer4: 'while i < 5',
        correctAnswer: 'while(i < 5)'
    },
    {
        question: 'Which of these is a JavaScript Comment?',
        answer1: '`This is a comment`',
        answer2: '||This is a comment||',
        answer3: '/This is a comment/',
        answer4: '//This is a comment',
        correctAnswer: '//This is a comment'
    },
    {
        question: 'What would be the output of "console.log(0 == false)"?',
        answer1: 'true',
        answer2: 'false',
        answer3: 'undefined',
        answer4: 'null',
        correctAnswer: 'true'
    },
]

highscoreButton.addEventListener("click", showHighscores);
startButton.addEventListener("click", startQuiz);
answer1.addEventListener("click", answerClick);
answer2.addEventListener("click", answerClick);
answer3.addEventListener("click", answerClick);
answer4.addEventListener("click", answerClick);
endButton.addEventListener("click", submitScore);

function submitScore(e) {
    var scoreName = nameInput.value;
    var score = correctAnswers + timerSeconds;
    var highScore = {scoreName, score};
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(highScore);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    
    
    showHighscores();
}

function answerClick(e) {
    if (this.textContent == questions[questionNum].correctAnswer) {
        correctAnswers++;
        questionNum++;
        result.textContent = 'Correct!';
        populate();
    } else {
        timerSeconds -= 5;
        questionNum++;
        result.textContent = 'Incorrect.';
        populate();
    }
}

function showHighscores(e) {
    var highScores = JSON.parse(localStorage.getItem('highScores') || "[]");
    var placement = 1;
    console.log("highscore button clicked");
    console.log(`Highscores: ${highScores}`);
    quizElements.style.display = 'none';
    landingElements.style.display = 'none';
    endElements.style.display = 'none';
    scoreElements.style.display = 'flex';

    var header = document.createElement('h1');
    header.textContent = 'High Scores';
    scoreElements.append(header);

    var container = document.createElement('div');
    container.setAttribute('id', 'highscore-container');
    for(let i = 0; i < highScores.length; i++) {
        var entry = document.createElement('h2');
        entry.setAttribute('class', 'highScore');
        entry.textContent = `${placement}. ${highScores[i].scoreName} ${highScores[i].score}`;
        container.append(entry);
        placement++;
    }
    scoreElements.append(container);

    var buttonRow = document.createElement('div');
    buttonRow.setAttribute('class', 'row');

    var backButton = document.createElement('button');
    backButton.textContent = 'Back To Start';
    backButton.addEventListener('click', (e) => {
        scoreElements.style.display = 'none';
        landingElements.style.display = 'flex';
        while (scoreElements.lastChild) {
            scoreElements.removeChild(scoreElements.lastChild);
        }
    });
    buttonRow.append(backButton);

    var clearButton = document.createElement('button');
    clearButton.textContent = 'Clear Highscores';
    clearButton.addEventListener('click', (e) => {
        var highScoreContainer = document.querySelector('#highscore-container');
        highScoreContainer.remove();
        localStorage.clear();
    })
    buttonRow.append(clearButton);
    scoreElements.append(buttonRow);

    questionNum = 0;
    correctAnswers = 0;
}

function startQuiz(e) {
    console.log("start button clicked");
    landingElements.style.display = 'none';
    quizElements.style.display = 'flex';
    correctAnswers = 0;
    timerSeconds = 60;
    startTimer();
    populate();
}

function populate() {
    if (questionNum == 10) {
        endGame();
    }
    else {
        var questionContents = questions[questionNum];
        question.textContent = questionContents.question;
        answer1.textContent = questionContents.answer1;
        answer2.textContent = questionContents.answer2;
        answer3.textContent = questionContents.answer3;
        answer4.textContent = questionContents.answer4;
    }

}

function startTimer() {
    timer = setInterval(function () {
        timerSeconds--;
        time.textContent = timerSeconds;
        if (timerSeconds <= 0) {
            endGame();
        }
    }, 1000)
}

function endGame() {
    clearTimeout(timer);
    quizElements.style.display = 'none';
    endElements.style.display = 'flex';
}
