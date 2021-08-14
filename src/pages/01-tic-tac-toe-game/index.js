import { createContext, useContext, useState } from 'react';

import style from './styles.module.css';

/*
 * context
 */
const Context = createContext({});

/*
 * pure functions
 */
const getWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        mark: squares[a],
        indices: [a, b, c],
      };
    }
  }
  return null;
};

const getNextMark = (move) => {
  if (move % 2 === 0) {
    return 'X';
  } else {
    return 'O';
  }
};

const getLocation = (index) => {
  const row = Math.floor(index / 3) + 1;
  const col = Math.floor(index % 3) + 1;
  return `(${row}, ${col})`;
};

/*
 * components
 */
const Square = ({ index }) => {
  const { history, setHistory, move, setMove } = useContext(Context);
  const squares = history[move]['squares'];
  const mark = squares[index];
  const winner = getWinner(squares);
  const handleClick = () => {
    if (mark || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[index] = getNextMark(move);
    setHistory(
      history
        .slice(0, move + 1)
        .concat([{ squares: nextSquares, index: index }])
    );
    setMove(move + 1);
  };
  let modifier = 'normal';
  if (winner && winner['indices'].includes(index)) {
    modifier = 'highlight';
  }
  return (
    <button
      onClick={handleClick}
      className={style['square'] + ' ' + style[modifier]}
    >
      {mark}
    </button>
  );
};

const Board = () => {
  const indices = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];
  return (
    <div>
      {indices.map((row) => (
        <div key={row} className={style['board-row']}>
          {row.map((index) => (
            <Square index={index} key={index} />
          ))}
        </div>
      ))}
    </div>
  );
};

const Info = () => {
  const { history, move, setMove } = useContext(Context);
  const squares = history[move]['squares'];
  const winner = getWinner(squares);
  // status
  let status;
  if (winner) {
    status = 'Winner: ' + winner['mark'];
  } else {
    let isFull = true;
    squares.forEach((s) => {
      if (s === null) {
        isFull = false;
      }
    });
    if (isFull) {
      status = 'The game ended in a draw.';
    } else {
      status = 'Next player: ' + getNextMark(move);
    }
  }
  // order
  const [order, setOrder] = useState('ascending');
  const handleClickOrder = () => {
    if (order === 'ascending') {
      setOrder('descending');
    } else {
      setOrder('ascending');
    }
  };
  // moves
  let historySorted = history.slice();
  if (order === 'ascending') {
    historySorted = historySorted.reverse();
  }
  const moves = historySorted.map((h, i) => {
    let m;
    if (order === 'ascending') {
      m = history.length - 1 - i;
    } else {
      m = i;
    }
    const moveInfo =
      h['index'] === null
        ? 'Go to game start'
        : `Go to move # ${m}, position ${getLocation(h['index'])}`;
    let modifier = 'normal';
    if (m === move) {
      modifier = 'bolder';
    }
    return (
      <li key={m}>
        <button
          onClick={() => setMove(m)}
          className={style['button'] + ' ' + style[modifier]}
        >
          {moveInfo}
        </button>
      </li>
    );
  });
  return (
    <div className={style['game-info']}>
      <div>{status}</div>
      <ol reversed={order === 'ascending'} className={style['list']}>
        {moves}
      </ol>
      <button onClick={handleClickOrder}>{'Order: ' + order}</button>
    </div>
  );
};

const TicTacToeGame = () => {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), index: null },
  ]);
  const [move, setMove] = useState(0);
  const value = {
    history: history,
    setHistory: setHistory,
    move: move,
    setMove: setMove,
  };
  return (
    <Context.Provider value={value}>
      <div className={style['game']}>
        <Board />
        <Info />
      </div>
    </Context.Provider>
  );
};

export default TicTacToeGame;
