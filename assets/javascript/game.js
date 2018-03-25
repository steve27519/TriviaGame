var panel = $("#quiz-area");
var timer = 30;

// Questions
var questions = [{
  question: "What baseball team has won the most World Series Titles?",
  answers: ["Yankees", "Reds", "Cardinals", "Giants"],
  correctAnswer: "Yankees",
  
}, {
  question: "what band recorded the song Stairway to Heaven?",
  answers: ["Pink Floyd", "The Who", "The Rolling Stones", "Led Zeppelin"],
  correctAnswer: "Led Zeppelin",
  
}, {
  question: "What football team is based out of Dallas?",
  answers: ["Texans", "Cowboys", "Chiefs", "Cardinals"],
  correctAnswer: "Cowboys",
  
}, {
  question: "What is the capital of the United States?",
  answers: ["Washington DC", "New York", "Boston", "Chicago"],
  correctAnswer: "Washington DC",
  
}, {
  question: "Atlanta is located in what state?",
  answers: ["Florida", "South Carolina", "Georgia", "Alabama"],
  correctAnswer: "Georgia",
  
}, {
  question: "What was the first state?",
  answers: ["New York", "North Carolina", "Delaware", "Kentucky"],
  correctAnswer: "Delaware",
  
}, {
  question: "What country has never been a World War?",
  answers: ["Sweden", "United States", "France", "Germany"],
  correctAnswer: "Sweden",
  
}, {
  question: "Which of these is not a fruit?",
  answers: ["Apple", "Pineapple", "Pear", "Potato"],
  correctAnswer: "Potato",
  
}];

// Variable to hold Interval
var timer;

var game = {

  questions: 0,
  currentQuestion: 0,
  counter: timer,
  correct: 0,
  incorrect: 0,
  countStartNumber: 30,

  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIMES UP");
      game.timesUp();
    }
  },

  getQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = game.countStartNumber;
    
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.getQuestion();
  },

  timesUp: function() {

    clearInterval(timer);

    $("#counter-number").text(game.counter);

    panel.html("<h2>You Are Out Of Time!!</h2>");
    panel.append("<h3>The Right Answer: " + questions[this.currentQuestion].correctAnswer);
    

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    panel.html("<h2>Your Final Results Are In</h2>");

    $("#counter-number").html(game.counter);

    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    panel.append("<br><button id='try-again'>Try Again?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    panel.html("<h2>Wrong!</h2>");
    panel.append("<h3>The Right Answer is: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    panel.html("<h2>Correct!</h2>");
    

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = game.countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.getQuestion();
  }
};

// CLICKS 

$(document).on("click", "#try-again", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Left: <span id='counter-number'>30</span> Seconds</h2>");
  game.getQuestion();
}); 
