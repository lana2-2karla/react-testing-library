import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/RenderWithRouter';
import App from '../App';
import pokemons from '../data';

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
    pokemons.forEach(({ name }) => {
      const regex = new RegExp(name, 'i');
      const textName = screen.getByText(regex);
      expect(textName).toBeInTheDocument();
      userEvent.click(btnNextPokemon);
      // Testa se o primeiro pokémon aparace na tela após o último //Alerta para terminar//////
    });
  });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getAllByRole('link', { name: /more details/i });
    expect(linkMoreDetails.length).toBe(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const NUMBER_BTNS_POKEMONS = 7;
    renderWithRouter(<App />);
    const btnsFilterPokemons = screen.getAllByTestId('pokemon-type-button');
    expect(btnsFilterPokemons.length).toBe(NUMBER_BTNS_POKEMONS);
    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo
    userEvent.click(btnsFilterPokemons[1]);
    const titleCharmander = screen.getByText(/charmander/i);
    expect(titleCharmander).toBeInTheDocument();
    const btnNextPokemon = screen
      .getByRole('button', { name: /Próximo Pokémon/i });
    userEvent.click(btnNextPokemon);
    const titleRapidash = screen.getByText(/Rapidash/i);
    expect(titleRapidash).toBeInTheDocument();
    // O texto do botão deve corresponder ao nome do tipo, ex. Psychic
    expect(btnsFilterPokemons[1].innerHTML).toBe('Fire');
    // O botão All precisa estar sempre visível
    const btnAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(btnAll);
    expect(btnAll).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    // O texto do botão deve ser All
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll.innerHTML).toBe('All');
    // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado
    const btnPoison = screen.getByRole('button', { name: /poison/i });
    userEvent.click(btnPoison);
    userEvent.click(btnAll);
    const titlePikachu = screen.getByText(/pikachu/i);
    expect(titlePikachu).toBeInTheDocument();
    //
  });
});
