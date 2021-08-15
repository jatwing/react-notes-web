import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, createIncrementByAmount } from './counter-slice';
import { selectCounterValue } from './store';
import styles from './styles.module.css';

export const Counter = () => {
  const count = useSelector(selectCounterValue);
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
