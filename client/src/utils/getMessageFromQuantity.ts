import { TWordMessage } from '../types/store';

export const getMessageFromQuantity = (
  quantity: number,
  word: TWordMessage
): string => {
  const lastNumber = quantity % 10;
  if (quantity === 0) {
    return word.manyCase;
  }
  if (quantity > 4 && quantity < 21) {
    return word.manyCase;
  }
  if (lastNumber === 1) {
    return word.singularCase;
  }
  if (lastNumber > 1 && lastNumber < 5) {
    return word.genitiveCase;
  }
  return word.manyCase;
};
