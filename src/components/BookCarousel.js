import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const BookCarousel = ({ books }) => {
  return (
    <div className="carousel-wrapper">
      <Carousel showThumbs={false} infiniteLoop autoPlay>
        {books.map((book) => (
          <div key={book.id}>
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
            <p className="legend">{book.volumeInfo.title}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BookCarousel;