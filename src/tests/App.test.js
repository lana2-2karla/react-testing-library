import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/RenderWithRouter';

const { screen } = require('@testing-library/react');

describe('Testa o componente <App.js />', () => {
  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    // acessar
    renderWithRouter(<App />);
    const homeEl = screen.getByRole('link', { name: /Home/i });
    const aboutEl = screen.getByRole('link', { name: /About/i });
    const favoritePokemonEl = screen.getByRole('link', { name: /Favorite Pokémons/i });
    // testar
    expect(homeEl && aboutEl && favoritePokemonEl).toBeInTheDocument();
  });

  it('Testa se o app é redirecionado para a URL / ao clicar no link Home', () => {
    // acessar
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const homeEl = screen.getByRole('link', { name: /Home/i });
    // interagir
    userEvent.click(homeEl);
    // testar
    expect(pathname).toBe('/');
  });

  it('Testa se o app é redirecionado para a URL /about ao clicar no link About', () => {
    // acessar
    const { history } = renderWithRouter(<App />);
    const aboutEl = screen.getByRole('link', { name: /About/i });
    // interagir
    userEvent.click(aboutEl);
    // testar
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Ao clicar em Favorites Pokémons o app é redirecionado para URL /favorites ', () => {
    // acessar
    const { history } = renderWithRouter(<App />);
    const favoritePokemonEl = screen.getByRole('link', { name: /Favorite Pokémons/i });
    // interagir
    userEvent.click(favoritePokemonEl);
    // testar
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Ao entrar em uma URL desconhecida o app é redirecionado para pág Not Found', () => {
    // acessar
    const { history } = renderWithRouter(<App />);
    history.push('/paginaNaoEncontrada');
    const notFoundText = screen.getByRole(
      'heading',
      { name: /Page requested not found/i },
      { level: 2 },
    );
    // testar
    expect(notFoundText).toBeInTheDocument();
  });
});
