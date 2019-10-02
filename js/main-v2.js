// JS

// GLOBAL VARIABLES
let app = document.getElementById('app');
let puzzleBoard = renderElement('div', 'row')
let tilePos = [];
// let winCond = [0, 1, 2, 'X', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// Function to render elements
function renderElement(element, classes) {
    let output = document.createElement(element);
    output.className = classes;
    return output;
}

function loadPuzzle() {
    // Create Elements
    let container = renderElement('div', 'container-fluid');
    let row = renderElement('div', 'row');

    let leftCol = renderElement('div', 'col-0 col-sm-0 col-md-1 col-lg-2');
    let centerCol = renderElement('div', 'col-12 col-sm-12 col-md-10 col-lg-8 text-center');
    let rightCol = renderElement('div', 'col-0 col-sm-0 col-md-1 col-lg-2');

    // Title
    let title = renderElement('h1', 'my-5 display-4 text-white');
    title.innerHTML = 'Sliding Puzzle';

    let rand = renderElement('button', 'col-6 button bg-primary');
    rand.setAttribute('type', 'button');
    rand.innerHTML = 'RANDOMIZE';

    let upload = renderElement('button', 'col-6 button bg-primary');
    upload.setAttribute('type', 'button');
    upload.innerHTML = 'UPLOAD';

    let bottom = renderElement('div', 'p-5');

    // Append Elements
    centerCol.appendChild(title);

    // Add tiles to the puzzleBoard
    buildBoard(16);

    centerCol.appendChild(puzzleBoard);

    centerCol.appendChild(rand);
    centerCol.appendChild(upload);

    centerCol.appendChild(bottom);

    row.appendChild(rightCol);
    row.appendChild(centerCol);
    row.appendChild(leftCol);

    container.appendChild(row);
    app.appendChild(container);

    // Sets the 'X' square
    tilePos[3].idx = 'X';
    // document.getElementById('3').id = 'X';
    document.getElementById('3').setAttribute('class', 'col-3 bg-dark display-1 border');
    document.getElementById('3').innerHTML = 'X';
    console.log(tilePos);
}


// OBJECTS
class TileObj {
    constructor(size, idx, pos) {
        this.size = size;
        this.idx = idx;
        this.pos = pos;
    }
}

// BUILD BOARD
function buildBoard(size) {
    for (let i = 0; i < size; i++) {
        let tileObj = new TileObj(50, i, i);
        let tile = renderElement('div', 'col-3 display-1 bg-danger border py-2');
        tile.id = `${tileObj.idx}`;
        tile.innerHTML = `${tileObj.idx}`;
        tile.addEventListener('click', moveTile);
        puzzleBoard.appendChild(tile);
        tilePos.push(tileObj);
    }
}

function moveTile(e) {
    let tileNum = tilePos[e.target.id].pos;
    let emptyTile = tilePos[3].pos;
    console.log(`Tile Num: ${tileNum}`);
    console.log(`Empty Tile: ${emptyTile}`);

    // Checks if the clicked tile is next to the empty tile
    if (tileNum === emptyTile - 1 || tileNum === emptyTile + 1 || tileNum === emptyTile - 4 || tileNum === emptyTile + 4) {
        // Moves the clicked tile
        tilePos[e.target.id].pos = emptyTile;
        // Moves 'X'
        tilePos[3].pos = tileNum;
        console.log(`Tile Num: ${tileNum}`);
        console.log(`Empty Tile: ${emptyTile}`);
        console.log(tilePos);




        // // Check win conditions
        // if (String(tilePos) === String(winCond)) {
        //     alert('You win!!!!');
        // }

        // // Redraws the board with new positions
        // for (let i = 0; i < 15; i++) {
        //     // tile.i.innerHTML = `test`;
        //     document.getElementById(`${i}`).innerHTML = `${tilePos[i]}`;
        // }
    }

}