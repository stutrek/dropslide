import { dropPieces } from '../calculations';
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

describe('calculations', () => {
    it('should not drop when there is a piece in the way', () => {
        const pieces = createTestPieces();
        const board = [
            [3, 0, 2, 2],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
        ];

        const store = {
            pieces: piecesArrayToMap(pieces),
            board,
        };

        dropPieces(store);

        expect(store).toMatchInlineSnapshot(`
            Object {
              "board": Array [
                Array [
                  3,
                  0,
                  2,
                  2,
                ],
                Array [
                  1,
                  1,
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
                    1,
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

    it('should drop a piece until it hits something', () => {
        const pieces = createTestPieces();
        pieces[0].location = [3, 0];
        const board = [
            [3, 0, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 0, 0],
        ];

        const store = {
            pieces: piecesArrayToMap(pieces),
            board,
        };

        dropPieces(store);

        expect(store).toMatchInlineSnapshot(`
            Object {
              "board": Array [
                Array [
                  3,
                  0,
                  2,
                  2,
                ],
                Array [
                  1,
                  1,
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
                1 => Object {
                  "color": 1,
                  "id": 1,
                  "isDisappearing": false,
                  "length": 2,
                  "location": Array [
                    1,
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

    it('pieces in the middle should also work', () => {
        const pieces = createTestPieces();
        pieces[0].location = [3, 1];
        const board = [
            [3, 0, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 1, 1, 0],
        ];

        const store = {
            pieces: piecesArrayToMap(pieces),
            board,
        };

        dropPieces(store);

        expect(store).toMatchInlineSnapshot(`
            Object {
              "board": Array [
                Array [
                  3,
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

    it('multiple pieces should drop', () => {
        const pieces = createTestPieces();
        pieces[0].location = [3, 0];
        pieces[1].location = [2, 1];
        const board = [
            [3, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 2, 2, 0],
            [1, 1, 0, 0],
        ];

        const store = {
            pieces: piecesArrayToMap(pieces),
            board,
        };

        dropPieces(store);

        expect(store).toMatchInlineSnapshot(`
            Object {
              "board": Array [
                Array [
                  3,
                  2,
                  2,
                  0,
                ],
                Array [
                  1,
                  1,
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
                1 => Object {
                  "color": 1,
                  "id": 1,
                  "isDisappearing": false,
                  "length": 2,
                  "location": Array [
                    1,
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
                    1,
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
});
