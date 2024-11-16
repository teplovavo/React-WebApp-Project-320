import React, { useEffect, useReducer } from 'react';
import './App.css';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookViewer from './components/BookViewer';
import Cart from './components/Cart';

// Начальное состояние
const initialState = {
  books: [],
  selectedBookId: null,
  cartItems: [],
  status: 'idle' // idle | loading | succeeded | failed
};

// Редьюсер для управления состоянием
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

  useEffect(() => {
    // Загрузка книг по умолчанию
    const defaultBooks = ['Twilight', 'Rich Dad Poor Dad', 'The Great Gatsby', 'Anna Karenina'];
    const fetchDefaultBooks = async () => {
      try {
        dispatch({ type: 'SET_LOADING' });
        const allBooks = [];
        for (let book of defaultBooks) {
          const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}`);
          if (response.data.items) {
            allBooks.push(...response.data.items);
          }
        }
        dispatch({ type: 'SET_BOOKS', payload: allBooks });
      } catch (error) {
        console.error('Error fetching default books:', error);
        dispatch({ type: 'SET_FAILED' });
      }
    };
    fetchDefaultBooks();
  }, []);

  return (
    <div className="App">
      <h1>Book Finder</h1>

      {/* Строка поиска */}
      <SearchBar setBooks={(books) => dispatch({ type: 'SET_BOOKS', payload: books })} setStatus={(status) => dispatch({ type: status })} />

      <div className="main-content">
        {/* Список книг */}
        <BookList
          books={state.books}
          status={state.status}
          setSelectedBookId={(id) => dispatch({ type: 'SET_SELECTED_BOOK', payload: id })}
          addToCart={(book) => dispatch({ type: 'ADD_TO_CART', payload: book })}
        />

        {/* Просмотр выбранной книги */}
        {state.selectedBookId && <BookViewer bookId={state.selectedBookId} />}

        {/* Корзина */}
        <Cart cartItems={state.cartItems} removeFromCart={(id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id })} />
      </div>
    </div>
  );
};

export default App;
