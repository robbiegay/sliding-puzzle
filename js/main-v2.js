// JS

// GLOBAL VARIABLES
let app = document.getElementById('app');
let puzzleBoard = renderElement('div', 'row')
let boardPos = [];
let winCond = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

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

    // document.getElementById('3').setAttribute('class', 'bg-dark display-1 border');
    // document.getElementById('3').innerHTML = '3';
    console.log(boardPos);
    // boardPos[0].draw();
    // addImg();
    updateImg();
    document.getElementById('3').innerHTML = '';
}

// OBJECTS
class TileObj {
    constructor(size, idx, pos) {
        this.size = size;
        this.idx = idx;
        this.pos = pos;
        // this.img = '<img id="testImg" src="../img/vicky-zwelling-pottery.JPG"></img>';

    }
    // draw() {
    //     <img src="../img/vicky-zwelling-pottery.JPG"></img>
    //     overflow: hidden
    // }
}

// function addImg() {
//     for (let i = 0; i < 16; i++) {
//         boardPos[i].draw();
//         400px picture, 100px, margin -100, margin -100;

//     }
// }




// BUILD BOARD
function buildBoard(size) {
    for (let i = 0; i < size; i++) {
        let tileObj = new TileObj(50, i, i);
        let tile = renderElement('div', 'display-1 bg-danger border'); // col-3
        tile.style.height = '150px';
        tile.style.width = '150px';
        // tile.setAttribute('src', '"../img/vicky-zwelling-pottery.JPG"');
        tile.id = `tile${tileObj.idx}`;
        // tile.innerHTML = `${i}`;
        tile.innerHTML = `<img id="${i}" src="../img/vicky-zwelling-pottery.JPG" height="600" width="600"></img>`;
        // tile.setAttribute('style', 'margin-left:-100px;');
        // img.setAttribute('style', 'left-margin: calc(-150px);');
        tile.style.overflow = 'hidden';
        // tile.innerHTML = `${tileObj.img}`;
        // tile.style.backgroundImage = 'url(../img/vicky-zwelling-pottery.JPG)';
        // tile.style.backgroundSize = '400%';
        // for (let j = 0; j < 4; j++) {
        //     tile.style.backgroundPosition = `${(i + j)* 25}% ${i * 25}%`
        // }
        // tile.background = "../img/vicky-zwelling-pottery.JPG";
        // tile.addEventListener('click', moveTile);
        puzzleBoard.appendChild(tile);
        boardPos.push(tileObj);
    }
}

function find(location) {
    for (let i = 0; i < 16; i++) {
        if (boardPos[i].pos === Number(location)) {
            return i;
        }
    }
}

function moveTile(e) {
    // console.log(find(e.target.id));
    let clickedTile = boardPos[find(e.target.id)].pos;
    // let tileNumIdx = boardPos[e.target.id].idx;
    let emptyTile = boardPos[3].pos;
    // console.log(`Clicked Tile Name: ${boardPos[e.target.id].idx} Pos: ${boardPos[e.target.id].pos}`);
    // console.log(`Empty Tile Name: ${boardPos[3].idx} Pos: ${boardPos[3].pos}`);
    // Checks if the clicked tile is next to the empty tile
    if ((clickedTile === emptyTile - 1 && emptyTile % 4 !== 0) ||
        (clickedTile === emptyTile + 1 && clickedTile % 4 !== 0) ||
        clickedTile === emptyTile - 4 ||
        clickedTile === emptyTile + 4
    ) {
        // Moves the clicked tile
        boardPos[find(e.target.id)].pos = emptyTile;
        // Moves 'X'
        boardPos[3].pos = clickedTile;

        let win = 0;
        for (let i = 0; i < 16; i++) {
            updateImgLive(boardPos[i].pos, i);
            // document.getElementById(`${boardPos[i].pos}`).innerHTML = `${i}`;
            // document.getElementById(`${boardPos[i].pos}`).setAttribute('class', 'col-3 display-1 bg-danger border py-2');
            if (boardPos[i].pos === boardPos[i].idx) {
                win++;
            }
            if (win === 16) {
                alert('win');
            }
        }
        // document.getElementById(`${clickedTile}`).setAttribute('class', 'col-3 bg-dark display-1 border');
    }
}


// function moveImg(x) {
//     for (let i = 0; i < 16; i++) {
//         document.getElementById(`${boardPos[i].pos}`)
//     }
// }

// document.getElementById('img0').setAttribute('display', 'none');

function updateImg() {
    let j = -1;
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
            j += 1;
        }
        let img = document.getElementById(`${i}`);
        img.setAttribute('style', `margin-left:-${150 * (i % 4)}px;margin-top:-${150 * j}px;`);
        img.addEventListener('click', moveTile);
        // img.addEventListener('click', moveTile);
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





// let img0 = document.getElementById('img0');
// img0.setAttribute('style', 'margin-left:-100px;');