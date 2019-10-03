// JS

// GLOBAL VARIABLES
let app = document.getElementById('app');
let puzzleBoard = renderElement('div', 'row')
let emptyPos = 3;
let tilePos = [];
let winCond = [0, 1, 2, 'X', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

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

    buildTiles(16);
}


// OBJECTS
class Tile {
    constructor(size, position) {
        this.size = size;
        this.position = position;
    }
    draw() {
        document.getElementById(`${this.position}`).setAttribute('class', 'col-3 bg-danger display-1 border');

    }
    move() {
        alert('You told me to move!');
    }
}

// // The empty tile
class EmptyTile extends Tile {
    constructor(size, position) {
        super(size, position);
        this.position = 3;
    }
}

// BUILD BOARD
function buildBoard(size) {
    for (let i = 0; i < size; i++) {
        // sets the color
        let tile = renderElement('div', 'col-3 bg-warning display-1 border');
        tile.style.backgroundImage = "url('../img/vicky-zwelling-pottery.JPG')";
        tile.style.backgroundPosition = `${i * 25}% ${i * 25}%`
        tile.id = `${i}`;
        tile.innerHTML = `${i}`;
        tile.addEventListener('click', moveTile);
        puzzleBoard.appendChild(tile);
    }
}

// BUILD TILES
function buildTiles(size) {
    for (let i = 0; i < size; i++) {
        let puzzlePiece = new Tile(50, i);
        puzzlePiece.draw();
        tilePos.push(i);
    }
    document.getElementById(emptyPos).setAttribute('class', 'col-3 bg-dark display-1 border');
    tilePos.splice(emptyPos, 1, 'X')

}

function moveTile(e) {

    // Checks if the clicked tile is next to the empty tile
    if (e.target.id === `${Number(emptyPos) - 1}` || e.target.id === `${Number(emptyPos) + 1}` || e.target.id === `${Number(emptyPos) - 4}` || e.target.id === `${Number(emptyPos) + 4}`) {



        // Changes the previously dark tile to Not-Dark
        document.getElementById(emptyPos).setAttribute('class', 'col-3 bg-danger display-1 border');
        if (e.target.id === `${Number(emptyPos) - 1}`) {
            tilePos.splice(emptyPos, 1, tilePos[(Number(emptyPos) - 1)]);
            // e.target.innerHTML = `${e.target.id - 1}`;
        }
        if (e.target.id === `${Number(emptyPos) + 1}`) {
            tilePos.splice(emptyPos, 1, tilePos[(Number(emptyPos) + 1)]);
            // e.target.innerHTML = `${tilePos[(Number(emptyPos) + 1)]}`;
        }
        if (e.target.id === `${Number(emptyPos) - 4}`) {
            tilePos.splice(emptyPos, 1, tilePos[(Number(emptyPos) - 4)]);
        }
        if (e.target.id === `${Number(emptyPos) + 4}`) {
            tilePos.splice(emptyPos, 1, tilePos[(Number(emptyPos) + 4)]);
        }

        // Changes the clicked tile to Dark
        e.target.setAttribute('class', 'col-3 bg-dark display-1 border');
        tilePos.splice(e.target.id, 1, 'X')

        emptyPos = e.target.id;
        console.log(`CurrentBd: ${String(tilePos)}`);
        // console.log(`Win Condt: ${String(winCond)}`);

        // Check win conditions
        if (String(tilePos) === String(winCond)) {
            alert('You win!!!!');
        }

        // Redraws the board with new positions
        for (let i = 0; i < 15; i++) {
            // tile.i.innerHTML = `test`;
            document.getElementById(`${i}`).innerHTML = `${tilePos[i]}`;
        }
    }

}