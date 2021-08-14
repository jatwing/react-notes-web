import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  createIncrementByAmount,
} from './counter-actions';
import { selectCount } from './store';
import styles from './styles.module.css';

export const Counter = () => {
  /**
   * const count = selectCount(store.getState())
   */
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  /** component state and forms */
   const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={
            /** () => store.dispatch({ type: 'counter/increment' }) */
            () => dispatch(increment)
          }
        >
          {'+'}
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement)}
        >
          {'-'}
        </button>
      </div>

      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(createIncrementByAmount(Number(incrementAmount) || 0))
          }
        >
          {'Add Amount'}
        </button>
      </div>
    </>
  );
};
