import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { setTimeout } from 'timers/promises';
import App from '../App';
import FetchNameApi from '../Context/FetchRecipes';
import '@testing-library/jest-dom';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  renderWithRouter(
    <MemoryRouter>
      <FetchNameApi>
        <App />
      </FetchNameApi>
    </MemoryRouter>,
  );

  const inputEmail = screen.getByTestId(/email-input/i);
  userEvent.type(inputEmail, 'trybe@trybe.com');
  const inputSenha = screen.getByTestId(/password-input/i);
  userEvent.type(inputSenha, '1234567');
  const button = screen.getByTestId(/login-submit-btn/i);
  userEvent.click(button);
});

const searchTopBtn = 'search-top-btn';
const searchInputConst = 'search-input';
const searchBtnExec = 'exec-search-btn';
const ingredient = 'ingredient-search-radio';
const name = 'name-search-radio';
const firstLetter = 'first-letter-search-radio';

describe('Test the component SearchBar in Meals', () => {
  it('Test if screen has been render correct', async () => {
    const h2 = screen.getByRole('heading', { name: /meals/i });
    expect(h2).toBeInTheDocument();

    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    const searchIcon = screen.getByTestId(searchTopBtn);
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const ingredientRadio = screen.getByTestId(ingredient);
    const nameRadio = screen.getByTestId(name);
    const firstLRadio = screen.getByTestId(firstLetter);
    const searchInput = screen.getByTestId(searchInputConst);
    const searchBtn = screen.getByTestId(searchBtnExec);

    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    await setTimeout(2000);
    const sushiTxt = screen.getByText(/sushi/i);
    expect(sushiTxt).toBeInTheDocument();

    const drinks = screen.getByRole('img', { name: /drinkicon/i });
    userEvent.click(drinks);

    await setTimeout(2000);
    const aceTxt = screen.getByText(/ace/i);
    expect(aceTxt).toBeInTheDocument();
  });
});

describe('Test if SearchBar works', () => {
  it('Test if ingredients radio has been correct', async () => {
    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);

    const ingredientRadio = screen.getByTestId(ingredient);
    const searchInput = screen.getByTestId(searchInputConst);
    const searchBtn = screen.getByTestId(searchBtnExec);

    await act(async () => {
      userEvent.type(searchInput, 'Chicken');
      userEvent.click(ingredientRadio);
      userEvent.click(searchBtn);
    });
  });

  it('Test if name radio has been correct', () => {
    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);

    const nameRadio = screen.getByTestId(name);
    const searchInput = screen.getByTestId(searchInputConst);
    const searchBtn = screen.getByTestId(searchBtnExec);

    userEvent.type(searchInput, 'soup');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);
  });

  it('Test if first letter radio has been correct', () => {
    const alertMessage = jest.spyOn(global, 'alert');
    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);

    const firstLRadio = screen.getByTestId(firstLetter);
    const searchInput = screen.getByTestId(searchInputConst);
    const searchBtn = screen.getByTestId(searchBtnExec);

    userEvent.type(searchInput, 'a');
    userEvent.click(firstLRadio);
    userEvent.click(searchBtn);

    userEvent.type(searchInput, 'a');
    userEvent.click(searchBtn);
    expect(alertMessage).toHaveBeenCalled();
  });
});

describe('Test if component SearchBar works correctly in Drinks', () => {
  beforeEach(() => {
    const drinks = screen.getByRole('img', { name: /drinkicon/i });
    userEvent.click(drinks);
  });

  it('Test if ingredients radio has been correct', async () => {
    const h2 = screen.getByRole('heading', { name: /drinks/i });
    expect(h2).toBeInTheDocument();
    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);
    const ingredientRadio = screen.getByTestId(ingredient);
    const searchInput = screen.getByTestId(searchInputConst);
    const searchBtn = screen.getByTestId(searchBtnExec);

    userEvent.type(searchInput, 'vodka');
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);
  });

  it('Test if name radio has been correct', () => {
    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);

    const nameRadio = screen.getByTestId(name);
    const searchInput = screen.getByTestId(searchInputConst);
    const searchBtn = screen.getByTestId(searchBtnExec);

    userEvent.type(searchInput, 'mojito');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);
  });

  it('Test if first letter radio has been correct', () => {
    global.alert = jest.fn();
    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);

    const firstLRadio = screen.getByTestId(firstLetter);
    const searchInput = screen.getByTestId(searchInputConst);
    const searchBtn = screen.getByTestId(searchBtnExec);

    userEvent.type(searchInput, 'a');
    userEvent.click(firstLRadio);
    userEvent.click(searchBtn);

    userEvent.type(searchInput, 'a');
    userEvent.click(searchBtn);
    expect(global.alert).toHaveBeenCalled();
  });
});

describe('teste', () => {
  it('Test', () => {
    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputConst);
    const searchBtn = screen.getByTestId(searchBtnExec);

    userEvent.type(searchInput, '');
    userEvent.click(searchBtn);
  });
});

describe('teste 2', () => {
  it('Test 2', () => {
    const drinks = screen.getByRole('img', { name: /drinkicon/i });
    userEvent.click(drinks);

    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(searchInputConst);
    const searchBtn = screen.getByTestId(searchBtnExec);

    userEvent.type(searchInput, '');
    userEvent.click(searchBtn);
  });
});
