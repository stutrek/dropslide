import { movePiece } from '../calculations';
import { Piece } from '../types';

const createTestPieces = (): Piece[] => [
    {
        id: 1,
        isDisappearing: false,
        color: 1,
        location: [1, 0],
        length: 2,
    },
    {
        id: 2,
        isDisappearing: false,
        color: 1,
        location: [0, 2],
        length: 2,
    },
    {
        id: 3,
        isDisappearing: false,
        color: 1,
        location: [1, 0],
        length: 1,
    },
];

const piecesArrayToMap = (pieces: Piece[]) =>
    new Map(pieces.map((piece) => [piece.id, piece]));

describe('moving a piece', () => {
    it('should move a piece when it doesnt drop', () => {
        const pieces = createTestPieces().slice(0, 2);
        const board = [
            [0, 0, 2, 2],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
        ];

        const store = movePiece(pieces[0], 1, {
            pieces: piecesArrayToMap(pieces),
            board,
        });

        expect(store).toMatchInlineSnapshot(`
            Object {
              "board": Array [
                Array [
                  0,
                  0,
                  2,
                  2,
                ],
                Array [
                  0,
                  1,
                  1,
                  0,
                ],
                Array [
                  0,
                  0,
                  0,
                  0,
                ],
              ],
              "pieces": Map {
                1 => Object {
                  "color": 1,
                  "id": 1,
                  "isDisappearing": false,
                  "length": 2,
                  "location": Array [
                    1,
                    1,
                  ],
                },
                2 => Object {
                  "color": 1,
                  "id": 2,
                  "isDisappearing": false,
                  "length": 2,
                  "location": Array [
                    0,
                    2,
                  ],
                },
              },
            }
        `);
    });

    it('should move a and drop a piece', () => {
        const pieces = createTestPieces().slice(0, 2);
        pieces[0].location = [1, 1];
        const board = [
            [0, 0, 2, 2],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ];

        const store = movePiece(pieces[0], 0, {
            pieces: piecesArrayToMap(pieces),
            board,
        });

        expect(store).toMatchInlineSnapshot(`
            Object {
              "board": Array [
                Array [
                  1,
                  1,
                  2,
                  2,
                ],
                Array [
                  0,
                  0,
                  0,
                  0,
                ],
                Array [
                  0,
                  0,
                  0,
                  0,
                ],
              ],
              "pieces": Map {
                1 => Object {
                  "color": 1,
                  "id": 1,
                  "isDisappearing": false,
                  "length": 2,
                  "location": Array [
                    0,
                    0,
                  ],
                },
                2 => Object {
                  "color": 1,
                  "id": 2,
                  "isDisappearing": false,
                  "length": 2,
                  "location": Array [
                    0,
                    2,
                  ],
                },
              },
            }
        `);
    });
});
