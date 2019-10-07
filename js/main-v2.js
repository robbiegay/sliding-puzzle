// JS

// GLOBAL VARIABLES
let app = document.getElementById('app');
let puzzleBoard = renderElement('div', 'row m-0')
let boardPos = [];
let winCond = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let imgSrc = 'img/vicky-zwelling-pottery.JPG';

// Function to render elements
function renderElement(element, classes) {
    let output = document.createElement(element);
    output.className = classes;
    return output;
}

function loadPuzzle() {
    // Create Elements
    let container = renderElement('div', 'container');
    let row = renderElement('div', 'row');

    let leftCol = renderElement('div', 'col');
    let centerCol = renderElement('div', 'text-center');
    centerCol.setAttribute('style', 'width: 600px; min-width: 600px;');
    let rightCol = renderElement('div', 'col');

    // Title
    let title = renderElement('h1', 'my-5 display-4 text-white');
    title.innerHTML = 'Sliding Puzzle';

    let rand = renderElement('button', 'col-4 button bg-primary');
    rand.setAttribute('type', 'button');
    rand.setAttribute('id', 'randID');
    rand.innerHTML = 'RANDOMIZE';

    let upload = renderElement('input', 'col-4 button bg-light');
    upload.setAttribute('type', 'file');
    upload.setAttribute('id', 'file');
    upload.innerHTML = 'UPLOAD';

    let setImg = renderElement('button', 'col-4 button bg-primary');
    setImg.setAttribute('type', 'button');
    setImg.setAttribute('id', 'setImgID');
    setImg.innerHTML = 'SET IMG';

    let bottom = renderElement('div', 'p-5');

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

    console.log(boardPos);
    updateImg();
    setDarkTile(3);
    rand.addEventListener('click', randomize);
    setImg.addEventListener('click', uploadImg);
}

// OBJECTS
class TileObj {
    constructor(size, idx, pos) {
        this.size = size;
        this.idx = idx;
        this.pos = pos;
    }
}

// ADD IMG
function uploadImg() {
    let input = document.getElementById('file');
    console.log(input.files);
    if (input.files[0].name !== undefined) {
        imgSrc = URL.createObjectURL(input.files[0]);
        puzzleBoard.innerHTML = '';
        boardPos = [];
        buildBoard(16);
        updateImg();
        setDarkTile(3);
        document.getElementById('randID').addEventListener('click', randomize);
        document.getElementById('setImgID').addEventListener('click', uploadImg);
    }
}


// BUILD BOARD
function buildBoard(size) {
    for (let i = 0; i < size; i++) {
        let tileObj = new TileObj(50, i, i);
        let tile = renderElement('div', 'display-1 bg-dark border');
        tile.style.height = '150px';
        tile.style.width = '150px';
        tile.id = `tile${tileObj.idx}`;
        tile.innerHTML = `<img id="${i}" src="${imgSrc}" height="600px" width="600px"></img>`;
        tile.style.overflow = 'hidden';
        puzzleBoard.appendChild(tile);
        boardPos.push(tileObj);
    }
    console.log(boardPos);
}

function find(location) {
    for (let i = 0; i < 16; i++) {
        if (boardPos[i].pos === Number(location)) {
            return i;
        }
    }
}


function randomize() {
    for (let i = 0; i < 500; i++) {
        let rand = Math.floor(Math.random() * 16);
        let clickedTile = boardPos[find(rand)].pos;
        let emptyTile = boardPos[3].pos;
        if ((clickedTile === emptyTile - 1 && emptyTile % 4 !== 0) ||
            (clickedTile === emptyTile + 1 && clickedTile % 4 !== 0) ||
            clickedTile === emptyTile - 4 ||
            clickedTile === emptyTile + 4
        ) {
            boardPos[find(rand)].pos = emptyTile;
            boardPos[3].pos = clickedTile;
            for (let i = 0; i < 16; i++) {
                updateImgLive(i, boardPos[i].pos);
            }
            setDarkTile(clickedTile);
        }
    }
}

document.addEventListener('keydown', keyMove);

function keyMove(e) {
    let emptyTile = boardPos[3].pos;
    let leftOfEmpty = boardPos[3].pos - 1;
    let rightOfEmpty = boardPos[3].pos + 1;
    let topOfEmpty = boardPos[3].pos - 4;
    let bottomOfEmpty = boardPos[3].pos + 4;
    // Right Arrow
    if (e.keyCode === 37 && emptyTile % 4 !== 0) {
        // Moves the clicked tile
        boardPos[find(leftOfEmpty)].pos = emptyTile;
        // Moves 'X'
        boardPos[3].pos = leftOfEmpty;
        buildAndWin(leftOfEmpty);
    }
    // Left Arrow
    if (e.keyCode === 39 && (emptyTile + 1) % 4 !== 0) {
        // Moves the clicked tile
        boardPos[find(rightOfEmpty)].pos = emptyTile;
        // Moves 'X'
        boardPos[3].pos = rightOfEmpty;
        buildAndWin(rightOfEmpty);
    }
    // Top Arrow
    if (e.keyCode === 40 && emptyTile < 12) {
        // Moves the clicked tile
        boardPos[find(bottomOfEmpty)].pos = emptyTile;
        // Moves 'X'
        boardPos[3].pos = bottomOfEmpty;
        buildAndWin(bottomOfEmpty);
    }
    // Bottom Arrow
    if (e.keyCode === 38 && emptyTile > 3) {
        // Moves the clicked tile
        boardPos[find(topOfEmpty)].pos = emptyTile;
        // Moves 'X'
        boardPos[3].pos = topOfEmpty;
        buildAndWin(topOfEmpty);
    }
}

function buildAndWin(emptyDestination) {
    // Checks win condition
    let win = 0;
    for (let i = 0; i < 16; i++) {
        updateImgLive(i, boardPos[i].pos);
        if (boardPos[i].pos === boardPos[i].idx) {
            win++;
        }
        if (win === 16) {
            alert('You win!!!');
            // PUT THE WIN MESSAGE AT TOP
            document.getElementById('bottom').innerHTML = '<p>You Win!!<p>';
        }
    }
    // Adds the dark tile
    setDarkTile(emptyDestination);
}

function moveTile(e) {
    let clickedTile = boardPos[find(e.target.id)].pos;
    let emptyTile = boardPos[3].pos;
    if ((clickedTile === emptyTile - 1 && emptyTile % 4 !== 0) ||
        (clickedTile === emptyTile + 1 && clickedTile % 4 !== 0) ||
        clickedTile === emptyTile - 4 ||
        clickedTile === emptyTile + 4
    ) {
        // Moves the clicked tile
        boardPos[find(e.target.id)].pos = emptyTile;
        // Moves 'X'
        boardPos[3].pos = clickedTile;

        // Checks win condition and places empty tile
        buildAndWin(clickedTile);
    }
}

function updateImg() {
    let j = -1;
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
            j += 1;
        }
        let img = document.getElementById(`${i}`);
        img.setAttribute('style', `margin-left:-${150 * (i % 4)}px;margin-top:-${150 * j}px;`);
        img.addEventListener('click', moveTile);
    }
}

// x = move from, pos = move to
function updateImgLive(x, pos) {
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