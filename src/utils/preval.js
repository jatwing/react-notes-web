import preval from 'preval.macro';

const buildDate = preval`
  const date = new Date();
  module.exports = {
    date: date.toDateString(),
    time: date.toTimeString(),
  }
`;

export { buildDate };
