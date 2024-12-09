const camelToSnake = (obj: any) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj; // return unchanged if obj is not an object or is null
  }

  const newObj: any = {};
  Object.keys(obj).forEach((key) => {
    const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    newObj[newKey] = obj[key];
    // also convert inner objects
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      newObj[newKey] = camelToSnake(obj[key]);
    }
  });
  return newObj;
};

const snakeToCamel = (obj: any) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj; // return unchanged if obj is not an object or is null
  }

  const newObj: any = {};
  Object.keys(obj).forEach((key) => {
    const newKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    // if the value is an array, recursively convert each object in the array
    if (Array.isArray(obj[key])) {
      newObj[newKey] = obj[key].map((item: any) => snakeToCamel(item));
      return;
    }
    // if the value is an object, recursively convert it
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      newObj[newKey] = snakeToCamel(obj[key]);
      return;
    }
    newObj[newKey] = obj[key];
  });
  return newObj;
};

export {
  camelToSnake,
  snakeToCamel,
};
