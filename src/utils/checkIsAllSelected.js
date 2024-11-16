export const checkIsAllSelected = (basketItemsSelected, basketItems) => {
  if (basketItemsSelected.length === basketItems.length) {
    return true
  } else {
    return false
  }
}