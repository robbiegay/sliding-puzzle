// JS

// GLOBAL VARIABLES
let app = document.getElementById('app');
let puzzleBoard = createElementAndClass('div', 'row m-0')
let tileObjectArray = [];
let winCond = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let imgSrc = 'img/vicky-zwelling-pottery.JPG';

// Function to create elements and add classes
function createElementAndClass(element, classes) {
    let output = document.createElement(element);
    output.className = classes;
    return output;
}

function loadPuzzle() {
    // Create Elements
    let container = createElementAndClass('div', 'container');
    let row = createElementAndClass('div', 'row');

    let leftCol = createElementAndClass('div', 'col');
    let centerCol = createElementAndClass('div', 'text-center');
    centerCol.setAttribute('style', 'width: 600px; min-width: 600px;');
    let rightCol = createElementAndClass('div', 'col');

    // Title
    let title = createElementAndClass('h1', 'my-5 display-4 text-white');
    title.setAttribute('id', 'titleText');
    title.innerHTML = 'Sliding Puzzle';

    let rand = createElementAndClass('button', 'col-4 button bg-primary');
    rand.setAttribute('type', 'button');
    rand.setAttribute('id', 'randID');
    rand.innerHTML = 'RANDOMIZE';

    let upload = createElementAndClass('input', 'col-4 button bg-light');
    upload.setAttribute('type', 'file');
    upload.setAttribute('id', 'file');
    upload.innerHTML = 'UPLOAD';

    let setImg = createElementAndClass('button', 'col-4 button bg-primary');
    setImg.setAttribute('type', 'button');
    setImg.setAttribute('id', 'setImgID');
    setImg.innerHTML = 'SET IMG';

    let bottom = createElementAndClass('div', 'p-5');

    // Append Elements
    centerCol.appendChild(title);

    // Add tiles to the puzzleBoard
    buildBoard(16);

    centerCol.appendChild(puzzleBoard);

    centerCol.appendChild(rand);
    centerCol.appendChild(upload);
    centerCol.appendChild(setImg);

    centerCol.appendChild(bottom);

    row.appendChild(rightCol);
    row.appendChild(centerCol);
    row.appendChild(leftCol);

    container.appendChild(row);
    app.appendChild(container);

    // console.log(tileObjectArray);
    sliceImg();
    setDarkTile(3);
    rand.addEventListener('click', randomize);
    setImg.addEventListener('click', uploadImg);
}

// OBJECTS
class TileObj {
    constructor(idx, pos) {
        this.idx = idx;
        this.pos = pos;
    }
}

// ADD IMG
function uploadImg() {
    let input = document.getElementById('file');
    // console.log(input.files);
    // Checks to make sure that a file has been uploaded
    if (input.files[0].name !== undefined) {
        imgSrc = URL.createObjectURL(input.files[0]);
        // Clears puzzle board
        puzzleBoard.innerHTML = '';
        // Clears tile objects array
        tileObjectArray = [];
        // Rebuilds board, updates image slices, adds dark tile
        buildBoard(16);
        sliceImg();
        setDarkTile(3);
        // Adds event listeners
        document.getElementById('randID').addEventListener('click', randomize);
        document.getElementById('setImgID').addEventListener('click', uploadImg);
    }
}


// BUILD BOARD
function buildBoard(size) {
    for (let i = 0; i < size; i++) {
        let tileObj = new TileObj(i, i);
        let tile = createElementAndClass('div', 'display-1 bg-dark border');
        // Sets width and height of each tile
        tile.style.height = '150px';
        tile.style.width = '150px';
        tile.id = `tile${tileObj.idx}`;
        // Puts the full size image inside each tile
        tile.innerHTML = `<img id="${i}" src="${imgSrc}" height="600px" width="600px"></img>`;
        // Crops any part of the image outside of the 150px by 150px tile
        tile.style.overflow = 'hidden';
        puzzleBoard.appendChild(tile);
        tileObjectArray.push(tileObj);
    }
    // console.log(tileObjectArray);
}

// Takes the id of the div that you clicked on, loops through
// the tile objects until you find the object that has the property of 
// the "location" position. Ex. You click on tile 1. It has a div id of 1.
// The number displayed on the tile, however, is 7. So you loop until you get to the "7"
// tile, because the 7 tile has a pos of 1.
function find(location) {
    for (let i = 0; i < 16; i++) {
        if (tileObjectArray[i].pos === Number(location)) {
            return i;
        }
    }
}

// RANDOMIZE BUTTON
// Randomizes the board by simulating 500 random clicks on the board
function randomize() {
    for (let i = 0; i < 500; i++) {
        let rand = Math.floor(Math.random() * 16);
        let clickedTile = tileObjectArray[find(rand)].pos;
        let emptyTile = tileObjectArray[3].pos;
        if ((clickedTile === emptyTile - 1 && emptyTile % 4 !== 0) ||
            (clickedTile === emptyTile + 1 && clickedTile % 4 !== 0) ||
            clickedTile === emptyTile - 4 ||
            clickedTile === emptyTile + 4
        ) {
            tileObjectArray[find(rand)].pos = emptyTile;
            tileObjectArray[3].pos = clickedTile;
            for (let i = 0; i < 16; i++) {
                sliceImgLive(i, tileObjectArray[i].pos);
            }
            setDarkTile(clickedTile);
        }
    }
}

// MOVES TILES ON CLICK
function clickTile(e) {
    // Resets the title text (incase text was set to "you win")
    document.getElementById('titleText').innerHTML = 'Sliding Puzzle';
    let clickedTile = tileObjectArray[find(e.target.id)].pos;
    let emptyTile = tileObjectArray[3].pos;
    if ((clickedTile === emptyTile - 1 && emptyTile % 4 !== 0) ||
        (clickedTile === emptyTile + 1 && clickedTile % 4 !== 0) ||
        clickedTile === emptyTile - 4 ||
        clickedTile === emptyTile + 4
    ) {
        // Moves the clicked tile
        tileObjectArray[find(e.target.id)].pos = emptyTile;
        // Moves 'X'
        tileObjectArray[3].pos = clickedTile;
        // Checks win condition and places empty tile
        buildAndWin(clickedTile);
    }
}

// KEYBOARD CONTROLS
document.addEventListener('keydown', keyMove);

function keyMove(e) {
    // Resets title text
    document.getElementById('titleText').innerHTML = 'Sliding Puzzle';
    // Variables for the empty tile and its 4 adjacent squares
    let emptyTile = tileObjectArray[3].pos;
    let leftOfEmpty = tileObjectArray[3].pos - 1;
    let rightOfEmpty = tileObjectArray[3].pos + 1;
    let topOfEmpty = tileObjectArray[3].pos - 4;
    let bottomOfEmpty = tileObjectArray[3].pos + 4;
    // Right Arrow
    if (e.keyCode === 37 && emptyTile % 4 !== 0) {
        // Moves the clicked tile
        tileObjectArray[find(leftOfEmpty)].pos = emptyTile;
        // Moves 'X'
        tileObjectArray[3].pos = leftOfEmpty;
        buildAndWin(leftOfEmpty);
    }
    // Left Arrow
    if (e.keyCode === 39 && (emptyTile + 1) % 4 !== 0) {
        // Moves the clicked tile
        tileObjectArray[find(rightOfEmpty)].pos = emptyTile;
        // Moves 'X'
        tileObjectArray[3].pos = rightOfEmpty;
        buildAndWin(rightOfEmpty);
    }
    // Top Arrow
    if (e.keyCode === 40 && emptyTile < 12) {
        // Moves the clicked tile
        tileObjectArray[find(bottomOfEmpty)].pos = emptyTile;
        // Moves 'X'
        tileObjectArray[3].pos = bottomOfEmpty;
        buildAndWin(bottomOfEmpty);
    }
    // Bottom Arrow
    if (e.keyCode === 38 && emptyTile > 3) {
        // Moves the clicked tile
        tileObjectArray[find(topOfEmpty)].pos = emptyTile;
        // Moves 'X'
        tileObjectArray[3].pos = topOfEmpty;
        buildAndWin(topOfEmpty);
    }
}

// REBUILDS THE BOARD, CHECKS FOR WIN
function buildAndWin(emptyDestination) {
    // Checks win condition
    let win = 0;
    for (let i = 0; i < 16; i++) {
        sliceImgLive(i, tileObjectArray[i].pos);
        if (tileObjectArray[i].pos === tileObjectArray[i].idx) {
            win++;
        }
        if (win === 16) {
            // Adds colorful win text
            document.getElementById('titleText').innerHTML = `<span class="text-danger">Y</span><span class="text-primary">O</span><span class="text-warning">U</span> <span class="text-primary">W</span><span class="text-danger">I</span><span class="text-warning">N</span><span class="text-danger">!</span><span class="text-primary">!</span><span class="text-warning">!</span>`;
        }
    }
    // Adds the dark tile
    setDarkTile(emptyDestination);
}

// SLICES IMG
function sliceImg() {
    let j = -1;
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
            j += 1;
        }
        let img = document.getElementById(`${i}`);
        img.setAttribute('style', `margin-left:-${150 * (i % 4)}px;margin-top:-${150 * j}px;`);
        img.addEventListener('click', clickTile);
    }
}

// x = move from, pos = move to
function sliceImgLive(x, pos) {
    let j = 0;
    if (x < 4) {
        j = 0;
    } else if (x < 8) {
        j = 1;
    } else if (x < 12) {
        j = 2;
    } else {
        j = 3;
    }
    let img = document.getElementById(`${pos}`);
    img.setAttribute('style', `margin-left:-${150 * (x % 4)}px;margin-top:-${150 * j}px;`);
}

function setDarkTile(x) {
    let img = document.getElementById(`${x}`);
    img.setAttribute('style', `opacity: 0;`);
}