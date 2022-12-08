var landingElements = document.querySelector('#landing-contents');
var highscoreButton = document.querySelector('#highscore-button');
var startButton = document.querySelector('#start-button');
var time = document.querySelector('#timer');

var question = 1;
var correctAnswers = 0;
var timer;


//Questions taken/inspired from w3schools js quiz because I'm not creative enough https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS
var questions = {
    question1: {
        question: 'Inside which HTML element do we put JavaScript?',
        answer1: '<script>',
        answer2: '<js>',
        answer3: '<javascript>',
        answer4: '<scripting>',
        correctAnswer: '<script>'
    },
    question2: {
        question: 'What is the correct JavaScript syntax to change the content of the HTML element?\n<p id="demo">This is a demo</p>',
        answer1: 'document.getElementById("demo").innerHTML = "Hello World!";',
        answer2: 'document.getElement("p").innerHTML = "Hello World!";',
        answer3: '#demo.innerHTML = "Hello World!";',
        answer4: 'document.getElementByName("p").innerHTML = "Hello World!";',
        correctAnswer: 'document.getElementById("demo").innerHTML = "Hello World!";'
    },
    question3: {
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        answer1: '<script src="xxx.js">',
        answer2: '<script href="xxx.js">',
        answer3: '<script name="xxx.js">',
        answer4: '<script class="xxx.js">',
        correctAnswer: '<script src="xxx.js">'
    },
    question4: {
        question: 'How do you write "Hello World" in an alert box?',
        answer1: 'msgBox("Hello World");',
        answer2: 'msg("Hello World");',
        answer3: 'alert("Hello World");',
        answer4: 'alertBox("Hello World");',
        correctAnswer: 'alert("Hello World");'
    },
    question5: {
        question: 'How do you create a function in JavaScript?',
        answer1: 'function = myFunction()',
        answer2: 'function:myFunction()',
        answer3: 'function myFunction()',
        answer4: 'def function()',
        correctAnswer: 'function myFunction()'
    },
    question6: {
        question: 'How do you call a function named "myFunction"?',
        answer1: 'myFunction()',
        answer2: 'myFunction',
        answer3: 'call function myFunction()',
        answer4: 'call myFunction()',
        correctAnswer: 'myFunction()'
    },
    question7: {
        question: 'How to write an IF statement in JavaScript?',
        answer1: 'if i = 5',
        answer2: 'if i = 5 then',
        answer3: 'if i == 5 then',
        answer4: 'if (i == 5)',
        correctAnswer: 'if (i == 5)'
    },
    question8: {
        question: 'What is a proper way to write a WHILE loop?',
        answer1: 'while(i = 0; i < 5; i++)',
        answer2: 'while (i < 5; i++)',
        answer3: 'while(i < 5)',
        answer4: 'while i < 5',
        correctAnswer: 'while(i < 5)'
    },
    question9: {
        question: 'Which of these is a JavaScript Comment?',
        answer1: '`This is a comment`',
        answer2: '||This is a comment||',
        answer3: '/This is a comment/',
        answer4: '//This is a comment',
        correctAnswer: '//This is a comment'
    },
    question10: {
        question: 'What would be the output of "console.log(0 == false)"?',
        answer1: 'true',
        answer2: 'false',
        answer3: 'undefined',
        answer4: 'null',
        correctAnswer: 'true'
    },
}

highscoreButton.addEventListener("click", showHighscores);
startButton.addEventListener("click", startQuiz);

function showHighscores (e) {
    console.log("highscore button clicked");
}

function startQuiz (e) {
    console.log("start button clicked");
    landingElements.style.visibility = 'hidden';
}
