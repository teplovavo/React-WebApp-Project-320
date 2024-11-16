import React, { useEffect, useState } from 'react';

const BookViewer = ({ bookId }) => {
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        const data = await response.json();
        setBookData(data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (bookId) fetchBookData();
  }, [bookId]);

  if (loading) return <div>Loading...</div>;
  if (!bookData) return <div>No book details available.</div>;

  const { volumeInfo } = bookData;

  return (
    <div className="book-viewer">
      <h3>{volumeInfo.title}</h3>
      {volumeInfo.imageLinks && (
        <img src={volumeInfo.imageLinks.thumbnail} alt={volumeInfo.title} />
      )}
      <p><strong>Authors:</strong> {volumeInfo.authors?.join(', ')}</p>
      <p><strong>Publisher:</strong> {volumeInfo.publisher}</p>
      <p><strong>Published Date:</strong> {volumeInfo.publishedDate}</p>
      <p><strong>Page Count:</strong> {volumeInfo.pageCount}</p>
      <p><strong>Description:</strong> {volumeInfo.description}</p>
      <a href={volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
        More Info
      </a>
    </div>
  );
};

export default BookViewer;
