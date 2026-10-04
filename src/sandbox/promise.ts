type User = {
  name: string,
  age: number,
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const promise = new Promise<User>((resolve, reject) => {
  console.log('1. Start');

  setTimeout(() => {
    //console.log('3. Timer end');

    const cast = getRandomInt(0, 10);
    if (cast >= 5) {
      resolve({
        name: 'Yuri',
        age: 50,
      });
    } else {
      reject(new Error('Failure'))
      //throw new Error('Failure!')
    }
  }, 2000);

  //throw new Error('Failure!!!');
});

console.log('2. Continue...');

promise
  .then((result) => {
    return result
  })
  .then((result) => {
    //return result.name
    return new Promise<string>((resolve, reject) => {
      resolve(result.name)   // это тоже самое если бы мы просто сделали бы return result.name?
    })
  })
  .then((name) => {
    console.log(name)
  })
  .catch((err) => {
    console.warn(err);
  })
  .finally(() => {
    console.info("Finish")
  })