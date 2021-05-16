export type Piece = {
    id: number;
    location: [number, number];
    color: number;
    isDisappearing: boolean;
    length: number;
};

export type Board = Piece['id'][][];

export type Store = {
    board: Board;
    pieces: Map<Piece['id'], Piece>;
};
