/* --- Module --- */
    import { 
        TILE_STATUS ,
        createBoard, 
        flaggedCell, 
        revealTile,
        checkWin,
        checkLose
    } from "./function-script.js";
/* ------------- */

/* Board Customize */
    const BOARD_SIZE = 9;
    const NUMBER_OF_MINES = 10;
/* ----- */

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector('.board-layout')
const message = document.querySelector('.subtext')

/* Mines Left display */
    const minesLeftText = document.querySelector('[data-mine-count]')
    minesLeftText.textContent = NUMBER_OF_MINES
/* ----- */

//console.log(board)
/* --- Set action --- */
    boardElement.style.setProperty('--size', BOARD_SIZE)
    board.forEach(row => {
        row.forEach(cell => {
            boardElement.append(cell.element)
            //Event onclick
            cell.element.addEventListener('click', () => {
                revealTile(board, cell)
                checkGameEnd() 
            })
            //Flagged a cell
            cell.element.addEventListener('contextmenu', e => {
                e.preventDefault()    
                flaggedCell(cell)
                listMineLeft()
            })
        })
    })
/* ------------------- */

/* --- Game result --- */
    function checkGameEnd() {
        const win = checkWin(board)
        const lose = checkLose(board)
        if ( win || lose) {
            boardElement.addEventListener("click", stopProp, {capture: true})
            boardElement.addEventListener("contextmenu", stopProp, {capture: true})
        }

        if (win) {
            message.textContent = "You Win"
        }

        if (lose) {
            message.textContent = "You Lose"
            board.forEach(row => {
                row.forEach(cell => {
                    if (cell.status === TILE_STATUS.MARKED) flaggedCell(cell)
                    if (cell.mine) revealTile(board, cell)
                })
            })
        }
    }

    //Not allowed user to reveal more tile when the game is over
    function stopProp(e) {
        e.stopImmediatePropagation()
    }
/* -------------------- */

/* --- Mines Counter --- */
    function listMineLeft() {
        const markedTilesCount = board.reduce((count, row) => {
            return (
                count + row.filter(cell => cell.status === TILE_STATUS.MARKED).length
            )
        }, 0)

        minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount
    }
/* -------------------- */