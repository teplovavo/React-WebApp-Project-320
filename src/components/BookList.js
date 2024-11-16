import React from 'react';
import BookCard from './BookCard';
import Loading from './Loading';

const BookList = ({ books, status, setSelectedBookId, addToCart }) => {
  if (status === 'loading') return <Loading />;

  return (
    <div className="book-list">
      {books && books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onSelect={() => setSelectedBookId(book.id)}
          onAddToCart={() => addToCart(book)}
        />
      ))}
    </div>
  );
};

export default BookList;
