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

export function paginateArray<T>(items: T[], page: number, limit: number): T[] {
  const offset = (page - 1) * limit;

  return items.slice(offset, offset + limit);
}
