import React from 'react';
import type { Store } from '../../data/types';
import { Piece } from '../piece';

import styles from './board.module.css';

type Props = {
    store: Store;
    size: number;
};

export const Board = ({ store, size }: Props) => {
    return (
        <div
            className={styles.board}
            style={{
                fontSize: `${size}px`,
                width: `${size * store.board.length}px`,
                height: `${size * store.board.length}px`,
            }}
        >
            {Array.from(store.pieces.values()).map((piece) => (
                <Piece key={piece.id} piece={piece} store={store} />
            ))}
        </div>
    );
};
