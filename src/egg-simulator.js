/**
 * @param {<a>[]} arr Input <a> array
 * @return {<a>[]} Randomly shuffled <a> array
 */
function arrayShuffle(arr) {
  // Durstenfeld Shuffle
  let shuffledArr = arr.slice(0);
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffledArr[i];
    shuffledArr[i] = shuffledArr[j];
    shuffledArr[j] = temp;
  }

  return shuffledArr;
}

function prettyPrint(board) {
  for (let i = 0; i < 6; i++) {
    let rowStr = "";
    for (let j = 0; j < 9; j++) {
      const num = getValue(i, j);
      const val = board[i][j];
      if (typeof val === "number") {
        rowStr += `  [${val}]  `;
      } else if (val === "hit") {
        rowStr += "  hit  ";
      } else if (val === "available") {
        if (num < 10) {
          rowStr += `   ${num}   `;
        } else {
          rowStr += `  ${num}   `;
        }
      } else if (val === "none") {
        rowStr += " none  ";
      }
    }
    console.log(rowStr);
  }
}

/**
 * @param {*} boardState 6x9 array of current board state
 * @return {[number, []]} High score and array of positions with that score
 */
function makeGuess(boardState) {
  // Calculate intermediate ENE board
  const intBoard = generateEmptyBoard(-1);
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 9; j++) {
      const tile = boardState[i][j];
      if (typeof tile === "number") {
        let score = tile;
        if (tile > 0) {
          for (let el of getBordering(i, j)) {
            if (boardState[el[0]][el[1]] === "hit") {
              score -= 1;
            }
          }
        }
        intBoard[i][j] = score;

        if (score === 0) {
          for (let el of getBordering(i, j)) {
            if (intBoard[el[0]][el[1]] === -1) {
              intBoard[el[0]][el[1]] = -2;
            }
          }
        }
      } else if (tile === "hit") {
        intBoard[i][j] = -2;
      }
    }
  }
  // console.log(intBoard);

  // Calculate final scored board
  const scoredBoard = generateEmptyBoard(0);
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 9; j++) {
      const int = intBoard[i][j];
      if (int > 0) {
        for (let el of getBordering(i, j)) {
          if (
            boardState[el[0]][el[1]] === "available" &&
            intBoard[el[0]][el[1]] !== -2
          ) {
            scoredBoard[el[0]][el[1]] += int;
          }
        }
      } else if (int === -2) {
        scoredBoard[i][j] = -1;
      }
      if (typeof boardState[i][j] === "number") {
        scoredBoard[i][j] = -1;
      }
    }
  }
  // console.log(scoredBoard);

  // Calculate scores and ideal position(s)
  const scoreArray = [];
  let highScore = [0, []];
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 9; j++) {
      const dataVal = getValue(i, j);
      const score = scoredBoard[i][j];
      scoreArray.push(score);
      if (score > highScore[0]) {
        highScore[0] = score;
        highScore[1] = [dataVal];
      } else if (score === highScore[0]) {
        highScore[1].push(dataVal);
      }
    }
  }

  // Second pass: apply bonuses to high scores based on most information
  if (highScore[1].length > 1) {
    const newScores = [];
    for (let val of highScore[1]) {
      const pos = getArrayIndex(val);
      let score = highScore[0];
      for (let el of getBordering(pos.y, pos.x)) {
        if (scoredBoard[el[0]][el[1]] >= 0) score += 1;
      }
      newScores.push(score);
    }

    const newArr = [0, []];
    for (let i = 0; i < newScores.length; i++) {
      if (newScores[i] > newArr[0]) {
        newArr[0] = newScores[i];
        newArr[1] = [highScore[1][i]];
      } else if (newScores[i] === newArr[0]) {
        newArr[1].push(highScore[1][i]);
      }
    }
    highScore = newArr;
  }

  // return [0, [getRandomInt(54)]];
  return highScore;
}

/**
 * Generates a 6-row x 9-column pre-filled with a default value
 * @param {*} defaultValue
 */
function generateEmptyBoard(defaultValue) {
  const returnBoard = [];
  for (let i = 0; i < 6; i++) {
    const arr = [];
    arr.length = 9;
    arr.fill(defaultValue);
    returnBoard.push(arr);
  }

  return returnBoard;
}

/**
 * Get bordering tile coordinates
 * Sample input: [1,1]
 * Return: [0,0] [0,1] [0,2] [1,0] [1,2] [2,0] [2,1] [2,2]
 * @param {number} row Integer from 0-5
 * @param {number} col Integer from 0-8
 * @return {number[]} Array of bordering [row, col] pairs
 */
function getBordering(row, col) {
  const retArr = [];
  const rowM = row - 1;
  const colM = col - 1;
  const rowP = row + 1;
  const colP = col + 1;

  function validRow(val) {
    return val >= 0 && val <= 5;
  }

  function validCol(val) {
    return val >= 0 && val <= 8;
  }

  if (validRow(rowM) && validCol(colM)) retArr.push([rowM, colM]);
  if (validRow(rowM) && validCol(col)) retArr.push([rowM, col]);
  if (validRow(rowM) && validCol(colP)) retArr.push([rowM, colP]);
  if (validRow(row) && validCol(colM)) retArr.push([row, colM]);
  if (validRow(row) && validCol(colP)) retArr.push([row, colP]);
  if (validRow(rowP) && validCol(colM)) retArr.push([rowP, colM]);
  if (validRow(rowP) && validCol(col)) retArr.push([rowP, col]);
  if (validRow(rowP) && validCol(colP)) retArr.push([rowP, colP]);

  return retArr;
}

/**
 * Convert array indices to an integer data-index value
 * @param {number} row Integer from 0-5
 * @param {number} col Integer from 0-8
 * @return {number} Integer from 1-54
 */
function getValue(row, col) {
  return row * 9 + (col + 1);
}

/**
 * Convert an integer data-index value to proper boardState array indices
 * @param {number} value Integer from 1-54
 * @return {object}
 */
function getArrayIndex(value) {
  let posX = (value % 9) - 1;
  let posY = Math.floor(value / 9);

  // Right-most column is a special case
  if (value % 9 === 0) {
    posX = 8;
    posY = Math.floor(value / 9) - 1;
  }

  return {
    x: posX,
    y: posY
  };
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Generate an array of unique strings that represent hidden egg positions
 * @param {number} iterations Generation attempts
 */
function generateGameBoards(iterations) {
  let board = [];
  for (let i = 1; i < 55; i++) {
    board.push(i);
  }

  const obj = {};
  for (let i = 0; i < iterations; i++) {
    board = arrayShuffle(board);
    const str = board.slice(0, 10).join(",");
    obj[str] = 0; // implicit uniqueness
  }

  return Object.keys(obj);
}

/**
 * Generate the board outcome for a guess
 * @param {number} guessPosition 1-54 index of tile guess
 * @param {*} gameBoard 6x9 array of current game state
 * @param {string[]} hiddenEggs Length 10 array of hidden egg positions
 * @return {*} 6x9 array of updated game state
 */
function generateResponse(guessPosition, gameBoard, hiddenEggs) {
  const pos = getArrayIndex(guessPosition);
  const guessStr = "" + guessPosition;

  if (hiddenEggs.indexOf(guessStr) >= 0) {
    // If guessPosition is in hiddenEggs, then it's a hit
    gameBoard[pos.y][pos.x] = "hit";
  } else {
    // If not, check how many eggs border the guess
    const borders = getBordering(pos.y, pos.x);
    let count = 0;
    for (let el of borders) {
      const tile = "" + getValue(el[0], el[1]);
      if (hiddenEggs.indexOf(tile) >= 0) count += 1;
    }

    if (count === 0) {
      for (let el of borders) {
        if (gameBoard[el[0]][el[1]] === "available") {
          gameBoard[el[0]][el[1]] = "none";
        }
      }
    }
    gameBoard[pos.y][pos.x] = count;
  }

  // prettyPrint(gameBoard);
  return gameBoard;
}

function runAlgorithm(method, boards) {
  console.time("Duration");

  let missTotal = 0;
  const missDist = {};

  boards.forEach(el => {
    const eggs = el.split(",");
    // console.log(eggs);

    let gameBoard = generateEmptyBoard("available");
    let guessArr = [];
    if (method === "Basic + UncleBob") {
      guessArr = [11, 14, 17, 38, 41, 44];
      guessArr.forEach(num => {
        gameBoard = generateResponse(num, gameBoard, eggs);
      });
    }

    while (true) {
      let guess;
      if (method === "Basic + Random") {
        guess = arrayShuffle(makeGuess(gameBoard)[1])[0];
      } else {
        guess = makeGuess(gameBoard)[1][0];
      }
      guessArr.push(guess);

      let isBoardSolved = true;
      for (let i = 0; i < eggs.length; i++) {
        if (guessArr.indexOf(parseInt(eggs[i])) < 0) {
          isBoardSolved = false;
          break;
        }
      }

      if (isBoardSolved) {
        break;
      } else {
        gameBoard = generateResponse(guess, gameBoard, eggs);
      }
    }

    const miss = guessArr.length - 10;
    missDist[miss] ? (missDist[miss] += 1) : (missDist[miss] = 1);
    missTotal += miss;
    // console.log(guessArr);
  });

  console.log(`\nMethod: ${method}`);
  console.log(`Avg Misses: ${missTotal / boards.length}`);

  let distStr = "Miss Distribution: ";
  for (let num in missDist) {
    distStr += `${num} (${missDist[num]}), `;
  }
  if (distStr !== "Miss Distribution: ") {
    distStr = distStr.slice(0, -2);
  }
  console.log(distStr);

  console.timeEnd("Duration");
}

function main() {
  /**
   * Methods:
   * - Basic: Default intermediate ENE and then scoredBoard; chooses first index of highScore array
   * - Basic + UncleBob: Same as Basic, but starts game by choosing all 6 3x3 middle tiles
   * - Basic + Random: Same as Basic, except random index of highScore array
   */

  // const desiredNumBoards = 100;
  const desiredNumBoards = 10000;
  const sharedBoards = generateGameBoards(desiredNumBoards);
  console.log(`\n# of Boards: ${sharedBoards.length}`);
  runAlgorithm("Basic", sharedBoards);
  runAlgorithm("Basic + UncleBob", sharedBoards);
  runAlgorithm("Basic + Random", sharedBoards);
}

function discord() {
  /**
   * Discord Message Boarding
   */

  // 15-miss boards using "Basic"
  const testBoards = [
    // ["42", "12", "2", "37", "53", "35", "19", "54", "3", "11"]
    // ["18", "37", "53", "33", "2", "28", "5", "29", "49", "36"],
    // ["30", "5", "23", "44", "40", "18", "12", "2", "32", "17"],
    ["1", "2", "3", "7", "28", "31", "35", "45", "53", "54"] // extrapolated from Stroops' buggy board
  ];

  for (let eggs of testBoards) {
    // const guesses = [11, 14, 17, 38, 41, 44]; // Initial 6 UncleBob
    // const guesses = [11, 14, 17, 38, 41, 44, 43, 35, 53]; // Recreating Stroop guesses
    const guesses = [11, 14, 17, 38, 41, 44, 43, 35, 45, 53]; // Stroops' actual guesses
    //
    // const guesses = [1, 2, 4, 11];
    // prettier-ignore
    // const guesses = [11, 38, 47, 37, 44, 53, 17, 41, 40, 14, 36, 35, 43, 54, 33, 42, 1, 10, 2, 12, 21, 3, 19];

    let board = generateEmptyBoard("available");
    for (let guess of guesses) {
      board = generateResponse(guess, board, eggs);
    }

    console.log(makeGuess(board));

    let eggCount = 0;
    let availableCount = 0;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === "hit") {
          eggCount += 1;
        } else if (board[i][j] === "available") {
          availableCount += 1;
        }
      }
    }

    console.log("```");
    prettyPrint(board);
    console.log(
      `\nGuesses: ${guesses.length} | Eggs Found: ${eggCount} | Tiles Remaining: ${availableCount}/54`
    );
    console.log("```");
  }
}

(() => {
  // main();
  discord();

  /** Misc **/
  // runAlgorithm("Basic", ["8,17,7,16,27,45,40,29,47,46"]);
  // runAlgorithm("Basic", ["42,12,2,37,53,35,19,54,3,11"]);
  // runAlgorithm("Basic + UncleBob", ["42,12,2,37,53,35,19,54,3,11"]);
  // prettyPrint(generateEmptyBoard("available"));
  // [ 1, 3, 5, 7, 8, 9, 17, 16, 19, 20, 28, 29, 22, 24, 26, 27, 39, 40, 47, 41, 43, 45, 46 ]
})();
