const generatedNumbers = new Set<number>();

export const getUniqueNumber = (): number => {
  const currentNumber = Math.floor(Math.random() * Date.now());

  if (generatedNumbers.has(currentNumber)) {
    return getUniqueNumber();
  }

  generatedNumbers.add(currentNumber);
  return currentNumber;
};
