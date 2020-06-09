export const formatPrice = price => {
  if (price / 1000000000 > 1) {
    return price / 1000000000 + 'b';
  }

  if (price / 1000000 > 1) {
    return price / 1000000 + 'm';
  }

  if (price / 1000 > 1) {
    return price / 1000 + 'k';
  }

  return price;
};
