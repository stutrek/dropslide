import React from 'react';
import { Piece as PieceType, Store } from '../../data/types';

import styles from './piece.module.css';

type Props = {
    store: Store;
    piece: PieceType;
};

export const Piece = ({ piece, store }) => {
    return (
        <div
            className={styles.piece}
            style={{
                width: `${piece.length}em`,
                top: `${store.board.length - piece.location[0] - 1}em`,
                left: `${piece.location[1]}em`,
            }}
        >
            <div className={styles.pieceInner} />
        </div>
    );
};
