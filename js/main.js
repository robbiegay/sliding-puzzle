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
        // var el =  document.getElementById(`${this.position}`);
        document.getElementById(`${this.position}`).setAttribute('class', 'col-3 bg-danger display-1 border');
        // el.innerHTML = 'test';
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

function buildBoard(size) {
    for (let i = 0; i < size; i++) {
        let tile = renderElement('div', 'col-3 bg-warning display-1 border');
        tile.id = `${i}`;
        tile.innerHTML = `${i}`;
        tile.addEventListener('click', moveTile);
        puzzleBoard.appendChild(tile);
    }
}

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
    // console.log(`You clicked on: ${e.target.id}`);
    // console.log(`Empty Square Pos before func: ${emptyPos}`);
    // Left, Right, Up, Down
    if (e.target.id === `${Number(emptyPos) - 1}` || e.target.id === `${Number(emptyPos) + 1}` || e.target.id === `${Number(emptyPos) - 4}` || e.target.id === `${Number(emptyPos) + 4}`) {

        // Changes the clicked tile to Dark
        e.target.setAttribute('class', 'col-3 bg-dark display-1 border');
        tilePos.splice(e.target.id, 1, 'X')

        // Changes the previously dark tile to Not-Dark
        document.getElementById(emptyPos).setAttribute('class', 'col-3 bg-danger display-1 border');
        if (e.target.id === `${Number(emptyPos) - 1}`) {
            tilePos.splice(emptyPos, 1, (Number(emptyPos) - 1));
        }
        if (e.target.id === `${Number(emptyPos) + 1}`) {
            tilePos.splice(emptyPos, 1, (Number(emptyPos) + 1));
        }
        if (e.target.id === `${Number(emptyPos) - 4}`) {
            tilePos.splice(emptyPos, 1, (Number(emptyPos) - 4));
        }
        if (e.target.id === `${Number(emptyPos) + 4}`) {
            tilePos.splice(emptyPos, 1, (Number(emptyPos) + 4));
        }

        // Sets the new emptyPos to the new Dark tile
        emptyPos = (e.target.id);
        // console.log(`Empty Square Pos after func: ${emptyPos}`);
        // console.log(`${Number(emptyPos) - 1}`);
        // console.log(`${Number(emptyPos) + 1}`);
        // console.log(`${Number(emptyPos) - 4}`);
        // console.log(`${Number(emptyPos) + 4}`);
        console.log(tilePos);

        // Check win conditions
        if (String(tilePos) === String(winCond)) {
            alert('You win!!!!');
        }
    }

}







// switch (e.target.id) {
//     case (`${Number(emptyPos) - 1}`):
//         tilePos.splice(emptyPos, 1, Number(emptyPos - 1));
//     case (`${Number(emptyPos) + 1}`):
//         tilePos.splice(emptyPos, 1, Number(emptyPos + 1));
//     case (`${Number(emptyPos) - 4}`):
//         tilePos.splice(emptyPos, 1, Number(emptyPos - 4));
//     case (`${Number(emptyPos) + 4}`):
//         tilePos.splice(emptyPos, 1, Number(emptyPos + 4));
// }





// SMART LOGS
// console.log(`Global Tile Array:`);
// console.log(tileAr);




// // BUILD TILE BOARD
// function buildTiles(tileNum) {
//     for (let i = 0; i < tileNum; i++) {
//         let tileObj = new Tile(50);

//         tileObj.id = `${i + 1}`;
//         // Why give an object an innerHTML
//         tileObj.innerHTML = `This is #${i + 1}`

//         // HTML is a property of the tile object?
//         tileObj.tileDiv = renderElement('div', 'col-3 bg-warning');

//         tileObj.tileDiv.innerHTML = `This is #${i + 1}`
//         tileObj.tileDiv.id = `${i + 1}`;
//         // Click event not working, should it be something other than 'this'?
//         tileObj.tileDiv.addEventListener('click', this.move);

//         // Pushing the object to an array or else it stops existing
//         tileAr.push(tileObj);

//         // Appending a property of an object
//         puzzleBoard.appendChild(tileObj.tileDiv);
//     }
// }

