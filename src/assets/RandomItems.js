export function randomListNoDup(max, numElements) {
  let randomArray = [];
  for (let i = 0; i < numElements; i++) {
    let randomNum = Math.floor(Math.random() * (max - 1) + 1);
    if (randomArray.indexOf(randomNum) === -1) {
      randomArray.push(randomNum);
    } else {
      //if the randomNum is already in the array retry
      i--;
    }
  }

  return randomArray;
}
