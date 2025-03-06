 export const capitalizeFirstLetter = (val) => {
    if (!val) return ''
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
  }

//  Thêm placehoderCard nếu column rỗng: khi bị kéo hết đi không còn

  export const generatePlaceholderCard = (column) => {
    return {
      _id: `${column._id}-placeholder-card`,
      boardId: column.boardId,
      columnId: column._id,
      FE_PlaceholderCard: true
    };
  };
  