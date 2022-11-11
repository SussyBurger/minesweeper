/*  */
import { 
    TILE_STATUS ,
    createBoard, 
    markTile, 
    revealTile,
    checkWin,
    checkLose
 } from "./function-script.js";

const BOARD_SIZE = 3;
const NUMBER_OF_MINES = 4;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector('.board-layout')

/* Mines Left display */
    const minesLeftText = document.querySelector('[data-mine-count]')
    minesLeftText.textContent = NUMBER_OF_MINES
/* ----- */

console.log(board)
boardElement.style.setProperty('--size', BOARD_SIZE)
board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        //Event onclick
        tile.element.addEventListener('click', () => {
            revealTile(board, tile)
        })
        //Flagged a tile
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault()    
            markTile(tile)
            listMineLeft()        
        })
    })
})

function listMineLeft() {
    const markedTilesCount = board.reduce((count, row) => {
        return (
            count + row.filter(tile => tile.status === TILE_STATUS.MARKED).length
        )
    }, 0)

    minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount
}