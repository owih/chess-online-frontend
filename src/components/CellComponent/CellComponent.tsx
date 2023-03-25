import * as React from 'react';
import styles from './CellComponent.module.scss';

type Props = {};

export default function CellComponent(props: Props) {
  return (
    <div className={styles.cell}>
      Content
    </div>
  );
}
