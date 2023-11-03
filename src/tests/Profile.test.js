import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Profile from '../Pages/Profile';

describe(
  'Teste do componente Profile',
  () => {
    it('Test', () => {
      const { history } = renderWithRouter(<Profile />);

      const email = screen.getByTestId('profile-email');
      expect(email).toBeInTheDocument();

      const inputButtonDone = screen.getByTestId('profile-done-btn');
      expect(inputButtonDone).toBeInTheDocument();

      const inputButtonFavorite = screen.getByTestId('profile-favorite-btn');
      expect(inputButtonFavorite).toBeInTheDocument();

      const inputButtonLogout = screen.getByTestId('profile-logout-btn');
      expect(inputButtonLogout).toBeInTheDocument();

      userEvent.click(inputButtonDone);
      expect(history.location.pathname).toBe('/done-recipes');
      userEvent.click(inputButtonFavorite);
      expect(history.location.pathname).toBe('/favorite-recipes');
      userEvent.click(inputButtonLogout);
      expect(history.location.pathname).toBe('/');
    });
  },
);
