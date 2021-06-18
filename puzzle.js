(function($) {
    'use strict';

function startPuzzle(ind) {
  const select = function(id) {
    return document.getElementById(id);
  };

  const images = [
    {
    url: '../static/assets/images/puzzle.jpg',
    preserve: 'width',
    offset: -0
  },
  {
    url: './assets/images/puzzles/PUZZLE2.jpg',
    preserve: 'height',
    offset: -0
  },
    {
    url: './assets/images/puzzles/PUZZLE3.jpg',
    preserve: 'height',
    offset: -0
  }];

  var gameContainer = select('gameContainer');
  var startButton = select('startButton');
  var minute = select('minute');
  var seconds = select('seconds');

  var bestTime = 0;
  var stage = ind;

  var { width } = gameContainer.getBoundingClientRect();
  var columns = 3;
  var rows = 3;
  var tileSize = Math.round(width / columns);

  var gameOptions = {
    tileSize,
    columns,
    rows,
    image: images[stage]

  };

  var puzzle = new Puzzle(gameOptions);

  $(startButton).removeAttr('style').off().on('click', () => {
    puzzle.start();
    //console.log(puzzle)
    startButton.style.display = 'none';
    // gameContainer.requestFullscreen();
  });

  function formatTime(seconds) {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;

    m = (m < 10) ? `0${m}` : m;
    s = (s < 10) ? `0${s}` : s;
    return {
      minutes: m,
      seconds: s,
    };
  }
  //$(gameContainer).empty()
 // puzzle.render('gameContainer')

  puzzle.onTimeUpdate(function(event) {
    const time = formatTime(event.time);
    minute.innerText = time.minutes;
    seconds.innerText = time.seconds;
  });

  puzzle.onSolve(function(event) {
    startButton.style.display = 'block';
    if (event.time < bestTime) {
      bestTime = event.time;
    }

  });

  $(gameContainer).empty().append(puzzle.stage);
  $('.close-puzzle').off().on('click',function() {
    $('[data-puzzle="select"]').removeClass("d-none");
    $('[data-puzzle="container"]').addClass("d-none");
   // console.log(puzzle);
    puzzle.isPlaying = false;
    puzzle.stage.dispatchEvent(new Event('solve'));
  });
};
document.addEventListener('DOMContentLoaded',function(){
  //startPuzzle(0);
  startPuzzle(0)
});

})(jQuery);
