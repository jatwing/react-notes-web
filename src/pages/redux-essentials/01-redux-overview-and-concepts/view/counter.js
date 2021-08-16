import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  createDecrement,
  createIncrement,
  createIncrementAsync,
  createIncrementByAmount,
} from '../redux/counter/actions';
import {
  selectCounterStatus,
  selectCounterValue,
} from '../redux/counter/selectors';
import styles from './styles.module.css';

export const Counter = () => {
  const count = useSelector(selectCounterValue);
  const status = useSelector(selectCounterStatus);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={
            /** dispatch */
            () => dispatch(createIncrement())
          }
        >
          {'+'}
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(createDecrement())}
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
        <button
          className={styles.asyncButton}
          onClick={() => {
            dispatch(createIncrementAsync(Number(incrementAmount) || 0));
          }}
          disabled={status === 'pending'}
        >
          {'Add Async'}
        </button>
        <p className={styles.text}>{status}</p>
      </div>
    </>
  );
};
