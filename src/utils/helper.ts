export function dropDuplication<T, O extends keyof T>(array: T[], property: O) {
  const uniqueArray: T[] = [];
  for (const element of array) {
    const isExist = uniqueArray.find((ele) => {
      return ele[property] == element[property];
    });

    if (!isExist) {
      uniqueArray.push(element);
    }
  }
  return uniqueArray;
}
