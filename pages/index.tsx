import Head from 'next/head';
import { Board } from '../components/board';
import { Piece } from '../data/types';
import styles from '../styles/Home.module.css';

const createTestPieces = (): Piece[] => [
    {
        id: 1,
        isDisappearing: false,
        color: 1,
        location: [3, 0],
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

const board = [
    [3, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
];

const store = {
    board,
    pieces: piecesArrayToMap(createTestPieces()),
};

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Dropslide</title>
                <meta name="description" content="A little game" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Board store={store} size={40} />
        </div>
    );
}
