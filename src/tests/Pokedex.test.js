import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/RenderWithRouter';
import App from '../App';

const { screen } = require('@testing-library/react');

describe('Testa o componente <Pokedex.js />', () => {
  it('Testa se a página contém título "Encountered pokémons"', () => {
    // acessar
    renderWithRouter(<App />);
    const titleEncounteredPokemons = screen
      .getByRole('heading', { name: /Encountered Pokémons/i, level: 2 });
    // testar
    expect(titleEncounteredPokemons).toBeInTheDocument();
  });
  it('Testa se é exibido o próximo Pokémon da lista ao clicar no botão ', () => {
    // Testa se botão está na tela
    renderWithRouter(<App />);
    const btnNextPokemon = screen
      .getByRole('button', { name: /Próximo Pokémon/i });
    expect(btnNextPokemon).toBeInTheDocument();
    // Testa se todos os pokémons são listados
    const btnsPokémons = screen.getAllByTestId('pokemon-type-button');
  });
});
