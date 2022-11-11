/* --Tiles Status-- */

    export const TILE_STATUS = {
        HIDDEN  : 'hidden',
        MINE    : 'mine',
        NUMBER  : 'number',
        MARKED  : 'marked',
    }

/* ----- */


/* --Creating a board-- */

    export function createBoard(boardSize, numberOfMines) {
        const board = [];
        const minePositions = getMinePositions(boardSize, numberOfMines)
        console.log(minePositions)
        for(let x = 0; x < boardSize; x++) {
            const row = [];
            for(let y = 0; y < boardSize; y++) {
                const element = document.createElement('div');
                //Set default status for tile
                element.dataset.status = TILE_STATUS.HIDDEN

                const tile = {
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

                row.push(tile)
            }
            board.push(row)        
        }

        return board
    }

/* ----- */

/* --Place mines-- */

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

/* ----- */

/* --Flagged tile on rightclick-- */

    export function markTile(tile) {
        if (tile.status !== TILE_STATUS.HIDDEN && 
            tile.status !== TILE_STATUS.MARKED) {
                return
        }
        //Unmark the tile
        if (tile.status === TILE_STATUS.MARKED) {
            tile.status = TILE_STATUS.HIDDEN
        } else {
            tile.status = TILE_STATUS.MARKED
        }
    }

/* ----- */

/* --Reveal tile onclick-- */
export function revealTile(board, tile) {
    if (tile.status !== TILE_STATUS.HIDDEN) {
        return
    } else 

    if (tile.mine) {
        tile.status = TILE_STATUS.MINE
        return
    }

    tile.status = TILE_STATUS.NUMBER
    const adjacentTiles = nearbyTiles(board, tile)

}

function nearbyTiles(board, tile) {

}

/* ----- */

/* --Reveal tile onclick-- */

    export function checkLose() {}
    export function checkWin() {}
    
/* ----- */
