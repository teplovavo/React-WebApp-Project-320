import React from 'react';

const BookCard = ({ book, onSelect, onAddToCart }) => {
  const { volumeInfo } = book;
  return (
    <div className="book-card">
      <img
        src={volumeInfo.imageLinks?.thumbnail}
        alt={volumeInfo.title}
        onClick={onSelect}
      />
      <h3>{volumeInfo.title}</h3>
      <p>{volumeInfo.authors?.join(', ')}</p>
      <button onClick={onSelect}>View Details</button>
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
};

export default BookCard;
