function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const promise = new Promise((resolve, reject) => {
  console.log('1. Start');

  setTimeout(() => {
    console.log('3. Timer end');

    const cast = getRandomInt(0, 10);
    if (cast >= 5) {
      resolve({
        name: 'Yuri',
        age: 41
      });
    } else {
      reject({
        name: "Failure"
      })
    }
  }, 2000);
});

console.log('2. Continue...');

promise
  .then((result) => {
    console.log('4.', result);
  })
  .catch((err) => {
    console.warn('Error', err);
  })
  .finally(() => {
    console.info("Finish")
  })