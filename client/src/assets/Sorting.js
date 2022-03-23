export function bubbleSort(array) {
  let steps = [array.slice()];
  let isSwapped = false;

  for (let i = 0; i < array.length; i++) {
    isSwapped = false;

    for (let j = 0; j < array.length - i; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        isSwapped = true;
        steps.push(array.slice());
      }
    }
    // If isSwapped boolean remains false (meaning the array is sorted) it will break out of the loop.
    if (!isSwapped) {
      break;
    }
  }
  let unique = [...new Set(steps.map((x) => JSON.stringify(x)))].map((x) => JSON.parse(x));
  return unique.slice();
}

export function insertionSort(array) {
  let steps = [array.slice()];
  for (let i = 1; i < array.length; i++) {
    let currentValue = array[i];
    let j;
    for (j = i - 1; j >= 0 && array[j] > currentValue; j--) {
      array[j + 1] = array[j];
    }
    array[j + 1] = currentValue;
    steps.push(array.slice());
  }
  let unique = [...new Set(steps.map((x) => JSON.stringify(x)))].map((x) => JSON.parse(x));
  return unique.slice();
}

export function selectionSort(array) {
  let steps = [array.slice()];
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
    steps.push(array.slice());
  }
  let unique = [...new Set(steps.map((x) => JSON.stringify(x)))].map((x) => JSON.parse(x));
  return unique.slice();
}

// function merge(arr1, arr2) {
//   let i = 0;
//   let j = 0;
//   let results = [];
//   while (i < arr1.length && j < arr2.length) {
//     if (arr2[j] > arr1[i]) {
//       results.push(arr1[i]);
//       i++;
//     } else {
//       results.push(arr2[j]);
//       j++;
//     }
//   }
//   while (i < arr1.length) {
//     results.push(arr1[i]);
//     i++;
//   }
//   while (j < arr2.length) {
//     results.push(arr2[j]);
//     j++;
//   }
//   return results;
// }

// function mergeSort(arr) {
//   if (arr.length <= 1) return arr;

//   let mid = Math.floor(arr.length / 2);
//   let left = mergeSort(arr.slice(0, mid));
//   let right = mergeSort(arr.slice(mid));
//   return merge(left, right);
// }

// function partition(arr, start, end) {
//   // Last element as the pivot
//   let pivotValue = arr[end];
//   let pivotIndex = start;
//   for (let i = start; i < end; i++) {
//     if (arr[i] < pivotValue) {
//       [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];

//       pivotIndex++;
//     }
//   }

//   // Putting the pivot value in the middle
//   [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
//   return pivotIndex;
// }

// function quickSort(arr, start, end) {
//   if (start >= end) {
//     return;
//   }

//   let index = partition(arr, start, end);

//   quickSort(arr, start, index - 1);
//   quickSort(arr, index + 1, end);
//   return arr;
// }
