/* --- Tiles Status --- */
    export const TILE_STATUS = {
        HIDDEN  : 'hidden',
        MINE    : 'mine',
        NUMBER  : 'number',
        MARKED  : 'marked',
    }
/* -------------------- */

/* --Creating a board-- */

    export function createBoard(boardSize, numberOfMines) {
        const board = [];
        const minePositions = getMinePositions(boardSize, numberOfMines)
        console.log(minePositions)
        for(let x = 0; x < boardSize; x++) {
            const row = [];
            for(let y = 0; y < boardSize; y++) {
                const element = document.createElement('div');
                //Set default status for cell
                element.dataset.status = TILE_STATUS.HIDDEN

                const cell = {
                    element,
                    x,
                    y,
                    mine: minePositions.some(positionMatch.bind(null, {x, y})),
                    get status() {
                        return this.element.dataset.status
                    },
                    set status(value) {
                        this.element.dataset.status = value
                    }
                }

                row.push(cell)
            }
            board.push(row)        
        }

        return board
    }

/* ----- */

/* --- Generate mines --- */
    function getMinePositions(boardSize, numberOfMines) {
        const positions = []
        while ( positions.length < numberOfMines ) {
            const position = {
                x: randomNumber(boardSize),
                y: randomNumber(boardSize)
            }
            if (!positions.some(positionMatch.bind(null, position))) {
                positions.push(position)
            }
        }
        return positions
    }

    function positionMatch(a, b) {
        return a.x === b.x && a.y === b.y
    }

    function randomNumber(size) {
        return Math.floor(Math.random() * size)
    }
/* -------------------- */

/* --- Flagged cell on rightclick --- */
    export function flaggedCell(cell) {
        if (cell.status !== TILE_STATUS.HIDDEN && 
            cell.status !== TILE_STATUS.MARKED) {
                return
        }
        //Unmark the cell
        if (cell.status === TILE_STATUS.MARKED) {
            cell.status = TILE_STATUS.HIDDEN
        } else {
            cell.status = TILE_STATUS.MARKED
        }
    }
/* ------------------------------ */

/* --- Reveal cell onclick --- */
export function revealTile(board, cell) {
    if (cell.status !== TILE_STATUS.HIDDEN) {
        return
    } else 

    if (cell.mine) {
        cell.status = TILE_STATUS.MINE
        cell.element.textContent = "💣"
        return
    }

    cell.status = TILE_STATUS.NUMBER
    const adjacentTiles = nearbyTiles(board, cell)
    const mines = adjacentTiles.filter( t => t.mine)
    //Reveal all blank cell and adjacent
    if (mines.length === 0) {    
        adjacentTiles.forEach(revealTile.bind(null, board))
    } else 
        { 
            cell.element.textContent = mines.length
        }
}

function nearbyTiles(board, {x ,y}) {
    const tiles = []

    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            const cell = board[x + xOffset]?.[y + yOffset]
            if (cell) tiles.push(cell)
        }
    }

    return tiles
}

/* ----- */

/* --- Game Result --- */
    export function checkWin(board) {
        return board.every(row => {
            return row.every(cell => {
                return cell.status === TILE_STATUS.NUMBER ||
                (cell.mine && (
                    cell.status === TILE_STATUS.HIDDEN ||
                    cell.status === TILE_STATUS.MARKED
                    ))
            })
        })
    }

    export function checkLose(board) {
        return board.some(row => {
            return row.some(cell => {
                return cell.status === TILE_STATUS.MINE
            })
        })
    } 
/* ------------------- */
