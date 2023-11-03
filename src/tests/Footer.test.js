import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../Components/Footer';
import renderWithRouter from './renderWithRouter';

describe('Testando o Componente Footer', () => {
  it('test', () => {
    const { history } = renderWithRouter(<Footer />);

    const drinks = screen.getByRole('img', { name: /drinkicon/i });
    const meals = screen.getByRole('img', { name: /mealicon/i });

    expect(drinks).toBeDefined();
    expect(meals).toBeDefined();

    userEvent.click(drinks);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    userEvent.click(meals);
    const { pathname: newPath } = history.location;
    expect(newPath).toBe('/meals');
  });
});
