window.addEventListener('DOMContentLoaded', function() {

//Variables
  var diskHold = null;
  var nbDisk = 4;
  var minMoves = Math.pow(2,nbDisk)-1;
  var gameBoard = document.querySelector('#gameBoard');
  var restart = document.querySelector('#restartGamePanel');
  var congrats = document.querySelector('#congratulationPanel')
  var towers = document.querySelectorAll('.tower');
  var nbMoves = document.querySelector('#nbMoves'); //get elemnt with id nbMoves
  var nbMovesFinal = document.querySelector('#nbMovesFinal');
  var unnecessaryMoves = document.querySelector('#nbUnnecessaryMoves');
  var moves; // moves count
  var confirmNewGame = document.querySelector('#confirmNewGame');
  var newGame = document.querySelector('#newGame');
  var continueGame = document.querySelector('#continueGame');

// Game initialisation

  function initGame(tower){
    // clear potential existing disks
    var existingDisks = document.querySelectorAll('.disk'); // returns a NodeList or null
    console.log(existingDisks);
    if(existingDisks){
      // .map can't be called directly on a NodeList so we call the map method of arrays on the NodeList
      Array.prototype.map.call(existingDisks, function(element){
        console.log(element);
        console.log(element.parentElement);
        element.parentElement.removeChild(element);
      });
    }
    tower.innerhtml = '';
    moves = 0;
    nbMoves.innerhtml = '0';
    for (var i=nbDisk; i>= 1; i--){
      var li = document.createElement("li");
      li.classList.add("disk", "disk"+i);
      li.dataset.value = i;
      tower.append(li);
    }
  }

//Game end
  function stateGame(){
    moves ++;
    nbMoves.innerHTML = moves;
    if (towers[1].children.length === nbDisk || towers[2].children.length === nbDisk){
      congrats.classList.toggle('hidden');
      var finalMoveCount = moves;
      nbMovesFinal.innerHTML = finalMoveCount;
      if (finalMoveCount == minMoves){
        var perfectScoreP = document.querySelector('#perfectornot')
        perfectScoreP.innerHTML = "Vous avez fait un score parfait!";
      } else{
        unnecessaryMoves.innerHTML = finalMoveCount - minMoves;
      }
    }
  }

// Game Turn

  function gameMove(tower){
    var disks = tower.children;
    console.log(disks);
    var topDisk;
    var topDiskValue;
    var towerIsEmpty = false;
    if (!tower.lastChild){
      towerIsEmpty = true;
    } else{
      // get the "higher" disk of the tower = the last one in the collection
      topDisk = tower.lastChild;
      // get the data-value attribute of this disk
      topDiskValue = topDisk.getAttribute('data-value');
      console.log(topDiskValue);
    }
    if (diskHold){
      var diskHoldValue = diskHold.getAttribute('data-value');
      console.log("j'ai un disque en main je veux le poser sa valeur est" + diskHoldValue);
      if (topDiskValue === diskHoldValue){
        diskHold.classList.remove('selected');
        diskHold = null;
      } else if (towerIsEmpty // if the destination tower is empty
                  ||topDiskValue > diskHoldValue //if the disk on the destination tower is bigger
                ){
        tower.appendChild(diskHold);
        diskHold.classList.remove('selected');
        diskHold = null;
        stateGame(); // increment the move counter & check if the player won or not
      }
    } else{
        topDisk.classList.add('selected');
        diskHold = topDisk;
    }
  }

  initGame(towers[0]);

  // Event Handlers

  // handle clicks on disks / towers
  function onClickTower(event){
    var myClassList = event.target.classList;
    console.log(myClassList);
    if(myClassList.contains('disk')){
      var tower = event.target.parentElement;
      gameMove(tower);
    } else if(myClassList.contains('tower')){
      gameMove(event.target);
    }
  }

  gameBoard.addEventListener("click", onClickTower);

  // handle game reset
  confirmNewGame.addEventListener("click", function(){restart.classList.toggle('hidden');});

  function onClickNewGame(){
    initGame(towers[0]);
    restart.classList.toggle('hidden');
  }

  newGame.addEventListener("click", onClickNewGame);

  // handle continue game
  continueGame.addEventListener("click", function(){restart.classList.toggle('hidden');});

});
