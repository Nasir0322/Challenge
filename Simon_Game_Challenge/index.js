var random_Number;
var colors=["red", "blue", "green", "yellow"];
var level=0;
var started=true;
var gamePattern=[];
var userClickedPattern=[];
//gamePattern.push(randomChosenColour);
$(document).keypress(function(event){
  if(started){
  nextSequence();
  started=false;
}
});
$(".btn").click(function(){
  var userChosenColour =$(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length);
//  nextSequence();
})
function checkAnswer(n){
  if(gamePattern[n-1]===userClickedPattern[n-1]){
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(() => {nextSequence()},1000);
    }
    }
    else{
      playSound("wrong");
      $("h1").text("Game Over, Press Any Key to Restart");
      started=true;
      level=0;
      gamePattern=[];
      setTimeout(() => {$("body").removeClass("game-over") },200);
      $("body").addClass("game-over");
  }
}
function nextSequence(){
  userClickedPattern=[];
  level+=1;
  $("h1").text("Level"+level);
  random_Number=Math.floor((Math.random()*4));
  gamePattern.push(colors[random_Number]);
  var path="sounds/"+colors[random_Number]+".mp3";
  var audio=new Audio(path);
  audio.play();
  $("#"+colors[random_Number]).fadeIn().fadeOut().fadeIn();
}
function animatePress(name){
  setTimeout(() => { $("#"+name).removeClass("pressed")}, 100);
  $("#"+name).addClass("pressed");
}
function playSound(name){
  var a="sounds/"+name+".mp3";
  var audio=new Audio(a);
  audio.play();
}
