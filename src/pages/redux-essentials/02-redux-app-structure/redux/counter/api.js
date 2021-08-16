export const fetchCount = (amount = 1) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve({ data: amount });
      } else {
        reject(new Error('Error with a probability of 0.5'));
      }
    }, 1000)
  );
};
