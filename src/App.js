import React, { useEffect, useReducer } from 'react';
import './App.css';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookViewer from './components/BookViewer';
import Cart from './components/Cart';
import BookCarousel from './components/BookCarousel';



// Initial state for the reducer
const initialState = {
  books: [],
  selectedBookId: null,
  cartItems: [],
  status: 'idle' 
};



// Reducer function to manage application state
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return { ...state, books: action.payload, status: 'succeeded' };
    case 'SET_LOADING':
      return { ...state, status: 'loading' };
    case 'SET_FAILED':
      return { ...state, status: 'failed' };
    case 'SET_SELECTED_BOOK':
      return { ...state, selectedBookId: action.payload };
    case 'ADD_TO_CART':
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cartItems: state.cartItems.filter(item => item.id !== action.payload) };
    default:
      return state;
  }
};



const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Effect to fetch default books when the component mounts
  useEffect(() => {
    const defaultBooks = ['Twilight', 'Rich Dad Poor Dad', 'The Great Gatsby', 'Anna Karenina'];
    const fetchDefaultBooks = async () => {
      try {
        dispatch({ type: 'SET_LOADING' }); // Set loading state before fetching
        const allBooks = [];
        const apiKey = process.env.REACT_APP_API_KEY; // API key .env
        for (let book of defaultBooks) {
          const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${apiKey}`);
          if (response.data.items) {
            allBooks.push(...response.data.items); // Add fetched books to the list
          }
        }
        dispatch({ type: 'SET_BOOKS', payload: allBooks }); // Set books in state after successful fetch
      } catch (error) {
        console.error('Error fetching default books:', error);
        dispatch({ type: 'SET_FAILED' }); // Set failed status if theres an error
      }
    };
    fetchDefaultBooks();
  }, []);

  
  // Function to handle searching books..
  const handleSearch = async (query) => {
    try {
      dispatch({ type: 'SET_LOADING' }); // Set loading state before fetching
      const apiKey = process.env.REACT_APP_API_KEY;
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
      if (response.data.items) {
        dispatch({ type: 'SET_BOOKS', payload: response.data.items }); // Update state with the search results!
      } else {
        dispatch({ type: 'SET_BOOKS', payload: [] }); // No results found
      }
    } catch (error) {
      console.error('Error searching books:', error);
      dispatch({ type: 'SET_FAILED' }); // Set failed status if there's an error
    }
  };

  return (
    <div className="App">
      <h1>Book Finder</h1>
      
      {/* Search bar for finding books by user input */}
      <SearchBar onSearch={handleSearch} />

      {/* Adding the carousel to display popular books */}
      {state.books.length > 0 && <BookCarousel books={state.books.slice(0, 5)} />} {/* Displaying the first 5 books in a carousel */}

      <div className="main-content">
        {/* Displaying the list of books */}
        <BookList
          books={state.books}
          status={state.status}
          setSelectedBookId={(id) => dispatch({ type: 'SET_SELECTED_BOOK', payload: id })}
          addToCart={(book) => dispatch({ type: 'ADD_TO_CART', payload: book })}
        />

        {/* Displaying book details when a book is selected */}
        {state.selectedBookId && <BookViewer bookId={state.selectedBookId} />}
        
        {/* Displaying the shopping cart */}
        <Cart cartItems={state.cartItems} removeFromCart={(id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id })} />
      </div>
    </div>
  );
};

export default App;
