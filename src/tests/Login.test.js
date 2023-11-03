import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Pages/Login';
import renderWithRouter from './renderWithRouter';

describe('Testando Component Login', () => {
  test('Test', () => {
    const { history } = renderWithRouter(<Login />);

    const titleLogin = screen.getByText(/Login/i);
    expect(titleLogin).toBeDefined();

    const inputEmail = screen.getByTestId(/email-input/i);
    expect(inputEmail).toBeDefined();
    userEvent.type(inputEmail, 'trybe@trybe.com');
    expect(inputEmail.value).toBe('trybe@trybe.com');

    const button = screen.getByTestId(/login-submit-btn/i);
    expect(button).toBeDefined();
    expect(button.disabled).toBe(true);

    const inputSenha = screen.getByTestId(/password-input/i);
    expect(inputSenha).toBeDefined();
    userEvent.type(inputSenha, '1234567');
    expect(inputSenha.value).toBe('1234567');

    localStorage.setItem('user', inputEmail.value);
    // Recuperar o item do localStorage
    const value = localStorage.getItem('user');
    // Verificar se o valor recuperado é igual ao valor esperado
    expect(value).toEqual(inputEmail.value);

    expect(button.disabled).toBe(false);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
    userEvent.click(button);
    const { pathname: newPath } = history.location;
    expect(newPath).toBe('/meals');
  });
});
