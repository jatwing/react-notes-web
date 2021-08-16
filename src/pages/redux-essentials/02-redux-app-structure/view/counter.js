import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectCounterStatus,
  selectCounterValue,
} from '../redux/counter/selectors';
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
} from '../redux/counter/slice';
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
            () => dispatch(increment())
          }
        >
          {'+'}
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
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
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          {'Add Amount'}
        </button>
        <button
          className={styles.asyncButton}
          onClick={(e) => {
            console.log('hey you click me');

            dispatch(incrementAsync(Number(incrementAmount) || 0));
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
