import { Board, Piece, Store } from './types';

const cloneBoard = (board: Board): Board => {
    return board.map((row) => [...row]);
};

const cloneStore = (store: Store): Store => {
    return {
        board: cloneBoard(store.board),
        pieces: new Map(store.pieces),
    };
};

/**
 * Drops all pieces that need to be dropped.
 * Mutates the store that is passed in, returns nothing
 * @param {Store} store - The store that needs to be mutated.
 * @returns void
 */
export const dropPieces = (store: Store): void => {
    const { board, pieces } = store;
    for (let row = 1; row < board.length; row++) {
        for (let cell = 0; cell < board[row].length; ) {
            const pieceId = board[row][cell];
            if (pieceId === 0) {
                cell++;
            } else {
                const piece = pieces.get(pieceId);
                let shouldDrop = true;
                const startIndex = cell;
                const endIndex = cell + piece.length;
                cell += piece.length;

                for (
                    let cellBeingChecked = startIndex;
                    shouldDrop && cellBeingChecked < endIndex;
                    cellBeingChecked++
                ) {
                    if (board[row - 1][cellBeingChecked] !== 0) {
                        shouldDrop = false;
                    }
                }
                if (shouldDrop) {
                    const replacementRow = [
                        ...board[row].slice(0, startIndex),
                        ...new Array(piece.length).fill(0),
                        ...board[row].slice(endIndex),
                    ];
                    const replacementLowerRow = [
                        ...board[row - 1].slice(0, startIndex),
                        ...new Array(piece.length).fill(piece.id),
                        ...board[row - 1].slice(endIndex),
                    ];
                    board[row] = replacementRow;
                    board[row - 1] = replacementLowerRow;

                    const replacementPiece = {
                        ...piece,
                        location: [row - 1, startIndex] as [number, number],
                    };

                    pieces.set(piece.id, replacementPiece);

                    if (row !== 1) {
                        row = row - 1;
                        cell = 0;
                    } else {
                        cell += piece.length;
                    }
                } else {
                    cell += piece.length;
                }
            }
        }
    }
};

/**
 * Relocates a piece. Returns a new store.
 * @param {Piece} originalPiece - The piece that will be moved.
 * @param {number} newY - The new piece location. This is not checked for errors.
 * @param {Store} originalStore - The store.
 * @returns {Store} a new Store
 */
export const movePiece = (
    originalPiece: Piece,
    newY: number,
    originalStore: Store
): Store => {
    const piece = {
        ...originalPiece,
        location: [originalPiece.location[0], newY] as [number, number],
    };
    const store = cloneStore(originalStore);

    store.pieces.set(piece.id, piece);

    const row = store.board[piece.location[0]];

    for (let i = 0; i < row.length; i++) {
        if (i >= newY && i < newY + piece.length) {
            row[i] = piece.id;
        } else if (row[i] === piece.id) {
            row[i] = 0;
        }
    }

    dropPieces(store);
    return store;
};

/**
 * Removes pieces that are disappearing.
 * @param {Store} originalStore - The store.
 * @returns {Store} a new Store
 */
export const removeDisappearingPieces = (originalStore: Store): Store => {
    const store = cloneStore(originalStore);

    for (const piece of Array.from(store.pieces.values())) {
        if (piece.isDisappearing) {
            store.pieces.delete(piece.id);
            for (let i = 0; i < piece.length; i++) {
                store.board[piece.location[0]][piece.location[1] + i] = 0;
            }
        }
    }

    dropPieces(store);

    return store;
};

/**
 * Marks pieces in full rows as disappearing.
 * @param {Store} originalStore - The store.
 * @returns {Store} a new Store
 */
export const markPiecesAsDisappearing = (store: Store): Store => {
    let rowsRemoved = 0;

    const board: Store['board'] = cloneBoard(store.board);
    const pieces: Store['pieces'] = new Map(store.pieces);

    for (let i = 0; i < store.board.length; i++) {
        const row = store.board[i];
        if (row.includes(0) === false) {
            board.push(row);
            const pieceIds = new Set(row);
            pieceIds.forEach((pieceId) => {
                const newPiece = { ...pieces.get(pieceId) };
                newPiece.isDisappearing = true;
                pieces.set(pieceId, newPiece);
            });
        }
    }

    return {
        board,
        pieces,
    };
};
