import React from 'react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import App from '../App';
import renderWithRouter from '../components/RenderWithRouter';

const { screen } = require('@testing-library/react');

describe('Testa o componente <FavoritePokemons.js />', () => {
  it('Testa se a mensagem No "favorite pokemon found" aparece na tela', () => {
    // acessar
    renderWithRouter(<FavoritePokemons />);
    const favoritePokemonsText = screen.getByText(/No favorite pokemon found/i);
    // testar
    expect(favoritePokemonsText).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    // acessar
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkMoreDetails);

    const favoriteCheckbox = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favoriteCheckbox);

    const linkFavoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavoritePokemons);

    const linkMoreDetailsFav = screen.getByRole('link', { name: /More details/i });
    expect(linkMoreDetailsFav).toBeInTheDocument();
  });
});
