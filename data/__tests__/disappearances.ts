import {
    markPiecesAsDisappearing,
    removeDisappearingPieces,
} from '../calculations';
import { Piece } from '../types';

const createTestPieces = (): Piece[] => [
    {
        id: 1,
        isDisappearing: false,
        color: 1,
        location: [0, 0],
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

describe('disappearances', () => {
    it('should mark pieces as disappearing', () => {
        const pieces = createTestPieces();
        const board = [
            [1, 1, 2, 2],
            [3, 0, 0, 0],
            [0, 0, 0, 0],
        ];

        const store = {
            pieces: piecesArrayToMap(pieces),
            board,
        };

        const store2 = markPiecesAsDisappearing(store);

        expect(store2).toMatchInlineSnapshot(`
            Object {
              "board": Array [
                Array [
                  1,
                  1,
                  2,
                  2,
                ],
                Array [
                  3,
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
                Array [
                  1,
                  1,
                  2,
                  2,
                ],
              ],
              "pieces": Map {
                1 => Object {
                  "color": 1,
                  "id": 1,
                  "isDisappearing": true,
                  "length": 2,
                  "location": Array [
                    0,
                    0,
                  ],
                },
                2 => Object {
                  "color": 1,
                  "id": 2,
                  "isDisappearing": true,
                  "length": 2,
                  "location": Array [
                    0,
                    2,
                  ],
                },
                3 => Object {
                  "color": 1,
                  "id": 3,
                  "isDisappearing": false,
                  "length": 1,
                  "location": Array [
                    1,
                    0,
                  ],
                },
              },
            }
        `);
    });

    it('should mark pieces as disappearing', () => {
        const pieces = createTestPieces();
        pieces[0].isDisappearing = true;
        pieces[1].isDisappearing = true;
        const board = [
            [1, 1, 2, 2],
            [3, 0, 0, 0],
            [0, 0, 0, 0],
        ];

        const store = {
            pieces: piecesArrayToMap(pieces),
            board,
        };

        const store2 = removeDisappearingPieces(store);

        expect(store2).toMatchInlineSnapshot(`
            Object {
              "board": Array [
                Array [
                  3,
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
                Array [
                  0,
                  0,
                  0,
                  0,
                ],
              ],
              "pieces": Map {
                3 => Object {
                  "color": 1,
                  "id": 3,
                  "isDisappearing": false,
                  "length": 1,
                  "location": Array [
                    0,
                    0,
                  ],
                },
              },
            }
        `);
    });
});
