document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("sudoku-board");
    const inputContainer = document.getElementById("input-container");
    const numpadButtons = document.querySelectorAll(".numpad-button");
    const clearButton = document.getElementById("clear-button");

    const initialBoard = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ];

    let selectedCell = { row: null, col: null };

    function createBoard() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                if (initialBoard[i][j] !== 0) {
                    cell.textContent = initialBoard[i][j];
                    cell.classList.add("fixed");
                }
                cell.addEventListener("click", () => handleCellClick(i, j));
                board.appendChild(cell);
            }
        }
    }

    function handleCellClick(row, col) {
        if (selectedCell.row !== null && selectedCell.col !== null) {
            const prevSelectedCellIndex = selectedCell.row * 9 + selectedCell.col;
            const prevSelectedCell = board.children[prevSelectedCellIndex];
            prevSelectedCell.classList.remove("selected");
        }

        highlightRow(row);
        highlightColumn(col);

        selectedCell = { row, col };
        const selectedCellIndex = row * 9 + col;
        const selectedCellElement = board.children[selectedCellIndex];
        selectedCellElement.classList.add("selected");
    }

    function highlightRow(row) {
        for (let i = 0; i < 9; i++) {
            const cellIndex = row * 9 + i;
            const cell = board.children[cellIndex];
            cell.classList.add("highlighted");
        }
    }

    function highlightColumn(col) {
        for (let i = 0; i < 9; i++) {
            const cellIndex = i * 9 + col;
            const cell = board.children[cellIndex];
            cell.classList.add("highlighted");
        }
    }

    function updateBoard(row, col, value) {
        initialBoard[row][col] = parseInt(value);
        const cellIndex = row * 9 + col;
        const cell = board.children[cellIndex];
        cell.textContent = value;
    }

    function clearSelection() {
        if (selectedCell.row !== null && selectedCell.col !== null) {
            const selectedCellIndex = selectedCell.row * 9 + selectedCell.col;
            const selectedCellElement = board.children[selectedCellIndex];
            selectedCellElement.classList.remove("selected");
        }
        selectedCell = { row: null, col: null };
        clearHighlights();
    }

    function clearHighlights() {
        const highlightedCells = document.querySelectorAll(".highlighted");
        highlightedCells.forEach(cell => cell.classList.remove("highlighted"));
    }

    function handleNumpadButtonClick(value) {
        if (selectedCell.row !== null && selectedCell.col !== null) {
            updateBoard(selectedCell.row, selectedCell.col, value);
            checkSuccess(); 
            clearSelection();
        }
    }

    function handleClearButtonClick() {
        if (selectedCell.row !== null && selectedCell.col !== null) {
            updateBoard(selectedCell.row, selectedCell.col, "");
            clearSelection();
        } else {
            clearEntireBoard();
        }
    }

    function clearEntireBoard() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (!initialBoard[i][j]) {
                    updateBoard(i,j,"");
                }
            }
        }
        clearSelection();
    }

    function checkSuccess() {
        const isComplete = initialBoard.every(row => row.every(cell => cell !== 0));
        const isCorrect = isComplete && isSudokuValid();
        
        if (isCorrect) {
            alert("Selamat! Anda berhasil menyelesaikan papan Sudoku.");
        } else if (isComplete) {
            alert("Ups! Ada kesalahan. Silakan periksa kembali jawaban Anda.");
        }
    }

    function isSudokuValid() {
        
        return true; 
    }

    numpadButtons.forEach(button => {
        const value = button.getAttribute("data-value");
        button.addEventListener("click", () => handleNumpadButtonClick(value));
    });

    clearButton.addEventListener("click", handleClearButtonClick);

    createBoard();
});
