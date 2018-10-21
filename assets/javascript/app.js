triviaGame = {
  right: 0,
  wrong: 0,
  unanswer: 0,
  inGameCD: 20,
  questionToGet: 0,
  gameStarted: false,
  gameRunning: false,
  gameFinish: false,
  quizList: [
    {
      question: "What was Barbosa greatest treasure?",
      answer: [
        "The Gold of Aztec",
        "The Black Pearl, the fastest ship there ever was",
        "The mightiest pirate fleets that haunt the sea",
        "Corona, his long lost daughter"
      ],
      result: "Corona, his long lost daughter",
      explain:
        "Corona: What am I to you? --- Barbosa: My treasure --- was Barbosa's last word right before letting go of the anchor thus killing himself but ensure his daughter safety"
    },

    {
      question: "What was Jack Sparrow biggest fear?",
      answer: [
        "Lost his treasure, his crew and his ship",
        "Being trapped in Davy Jones'Locker",
        "Being eaten by Kraken",
        "Armando Salazar"
      ],
      result: "Armando Salazar",
      explain:
        "After Jack betrayed his magical compass, it released Jack's greatest fear, Captain Armando Salazar."
    }
  ],
  initialize: function() {
    $("#pressToRetry").hide();
  },

  countDown: function() {
    triviaGame.inGameCD--;
    $("#countDownGoesHere").html(
      "<h3>" + "Time Remaining: " + triviaGame.inGameCD + " seconds" + "</h3>"
    );
    if (triviaGame.inGameCD == 0) {
      triviaGame.timeUp();
    }
  },
  timeUp: function() {
    triviaGame.unanswer++;
    $(".answerBtn").remove();
    clearInterval(intervalId);
    $("#row1").html(
      "<h2 class='explaination'  style='color:black;'>" +
        "Aaaarrrrgggghhhh, you Scurvy Dog!" +
        "</h2>"
    );
    $("#row2").html(
      "<h2 class='explaination' style='color:black;'>" +
        list[triviaGame.questionToGet].explain +
        "</h2>"
    );
    triviaGame.questionToGet++;
    setTimeout(this.newQuestionCheck, 1000 * 8);
  },
  loseRound: function() {
    triviaGame.wrong++;
    $(".answerBtn").remove();
    clearInterval(intervalId);
    $("#row1").html(
      "<h2 class='explaination' style='color:black;'>" +
        "Filthy pirate, to Davy Jones’ Locker with ye" +
        "</h2>"
    );
    $("#row2").html(
      "<h2 class='explaination; style='color:black;'>" +
        list[triviaGame.questionToGet].explain +
        "</h2>"
    );
    triviaGame.questionToGet++;
    setTimeout(this.newQuestionCheck, 1000 * 8);
  },
  winRound: function() {
    triviaGame.right++;
    $(".answerBtn").remove();
    clearInterval(intervalId);
    $("#row1").html(
      "<h2 class='explaination'  style='color:black;'>" +
        "Jackpot matey" +
        "</h2>"
    );
    $("#row2").html(
      "<h2 class='explaination' style='color:black;'>" +
        list[triviaGame.questionToGet].explain +
        "</h2>"
    );
    triviaGame.questionToGet++;
    setTimeout(this.newQuestionCheck, 1000 * 8);
  },
  cleanUp: function() {
    /*     $("#questionGoesHere").empty();
    $("#countDownGoesHere").empty();
    $(".explaination").empty(); */
    $("#row1").empty();
    $("#row2").empty();
    $("#row3").empty();
    $("#row4").empty();
    $("#questionGoesHere").empty();
  },
  newQuestionCheck: function() {
    if (triviaGame.questionToGet == triviaGame.quizList.length) {
      triviaGame.cleanUp();
      $("#row1").html(
        "<h2 class='resultText' style='color:black;'>" +
          "Keep calm and plundering on!" +
          "</h2>"
      );
      $("#row2").html(
        "<h2 class='resultText'  style='color:black;'>" +
          "<span fas fa-coin> Gold earned: </span>" +
          triviaGame.right +
          "</h2>"
      );
      $("#row3").html(
        "<h2 class='resultText'  style='color:black;'>" +
          "<span fas fa-times-circle></span> Incorrect: " +
          triviaGame.wrong +
          "</h2>"
      );
      $("#row4").html(
        "<h2 class='resultText'  style='color:black;'>" +
          "<span fas fa-question></span> Unanswer: " +
          triviaGame.unanswer +
          "</h2>"
      );
      $("#pressToRetry").show();
    } else {
      triviaGame.cleanUp();
      setTimeout(triviaGame.makeGame, 100);
    }
  },

  makeGame: function() {
    // Display Time Countdown
    triviaGame.inGameCD = 20;
    $("#countDownGoesHere").html(
      "<h3>" + "Time Remaining: " + triviaGame.inGameCD + " seconds" + "</h3>"
    );
    intervalId = setInterval(triviaGame.countDown, 1000);
    // Display Time Countdown

    //Pulling Question from obj
    var b = $("<h2>").text(list[triviaGame.questionToGet].question);
    b.addClass("questionBtn text-center");
    b.attr("data-check", list[triviaGame.questionToGet].result);
    b.appendTo($("#questionGoesHere"));
    //Pulling Question from obj

    //Pulling Answers from obj
    for (i = 0; i < 4; i++) {
      var b = $("<button>").text(list[triviaGame.questionToGet].answer[i]);
      b.addClass("answerBtn btn btn-outline-dark btn-lg btn-block");
      b.attr("data-check", list[triviaGame.questionToGet].result);
      b.attr("data-carry", list[triviaGame.questionToGet].answer[i]);
      b.appendTo($("#row1"));
    }
    //Pulling Answers from obj
  },
  checkAnswer: function() {
    if ($(this).attr("data-check") == $(this).attr("data-carry")) {
      triviaGame.winRound();
    } else {
      triviaGame.loseRound();
    }
  },
  resetGame: function() {
    triviaGame.initialize();
    triviaGame.right = 0;
    triviaGame.wrong = 0;
    triviaGame.unanswer = 0;
    triviaGame.inGameCD = 0;
    triviaGame.questionToGet = 0;
    triviaGame.cleanUp();
    triviaGame.makeGame();
  }
};

var intervalId;

var list = triviaGame.quizList;

//Shuffle Array everytime it's called
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

$(document).ready(function() {
  triviaGame.initialize();

  $("#pressToStart").on("click", function() {
    var playBackGround = document.getElementById("bgAudio");
    playBackGround.play();
    // Remove Start button and render game box
    $("#dummyRow").hide();
    $("#pressToStart").remove();
    $("#gameCard").css("background", "rgba(150, 149, 149, .85)");
    // Remove Start button and render game box

    // Set game status
    triviaGame.gameStarted = true;
    triviaGame.gameRunning = true;
    // Set game status

    triviaGame.makeGame();
  });

  $(document).on("click", ".answerBtn", triviaGame.checkAnswer);
  $(document).on("click", "#pressToRetry", triviaGame.resetGame);
});
