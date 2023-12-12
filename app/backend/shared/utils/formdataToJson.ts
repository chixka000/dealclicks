export const formDataToJson = (formData: FormData) => {
  const jsonData: Record<string, any> = {};

  formData.forEach((value, key) => {
    const keys = key.split(/[\[\]\.]/).filter(Boolean);

    keys.reduce((obj: Record<string, any>, currentKey, index, array) => {
      if (!obj[currentKey]) {
        if (array.length - 1 === index) {
          // If it's the last key, assign the value directly
          obj[currentKey] = value;
        } else {
          // If it's not the last key, create an object or array
          obj[currentKey] = Number.isNaN(Number(array[index + 1])) ? {} : [];
        }
      } else if (Array.isArray(obj[currentKey])) {
        // If the current key is an array, push the value
        if (array.length - 1 === index) {
          obj[currentKey].push(value);
        } else {
          const nextKey = array[index + 1];
          const isArrayIndex = !isNaN(Number(nextKey));

          if (
            !obj[currentKey].some(
              (item: Record<string, any>) =>
                item[nextKey] === undefined && isArrayIndex
            )
          ) {
            obj[currentKey].push(isArrayIndex ? value : null);
          }
        }
      }

      return obj[currentKey];
    }, jsonData);
  });

  return jsonData;
};
