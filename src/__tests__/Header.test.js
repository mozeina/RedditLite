import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../app/store.js';
import Header from '../components/Header.js';


describe('App', () => {
  describe('Top of app', () => {
    it('renders the header of our page', () => {
      render(
        <Provider store={store}>
          <Router>
            <Header />
          </Router>
        </Provider>
      );
      expect(screen.getByText('RedditLite')).toBeInTheDocument();
    })
    it('renders the logo', () => {
      render(
        <Provider store={store}>
          <Router>
            <Header />
          </Router>
        </Provider>
      );
      expect(screen.getByTestId('redditLogo')).toBeInTheDocument();
    })
  })
});
