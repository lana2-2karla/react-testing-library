import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    pokemons.forEach(({ name, type, averageWeight, image }) => {
      // console.log(averageWeight);
      const regex = new RegExp(name, 'i');
      const phraseAverage = `Average weight: ${averageWeight.value} kg`;
      const namePokemon = screen.getByText(regex);
      const typePokemon = screen.getByTestId('pokemon-type');
      const averagePokemon = screen.getByText(phraseAverage);
      const imgPokemon = screen.getByAltText(`${name} sprite`);
      // console.log(type);
      // console.log(image);
      expect(namePokemon && averagePokemon).toBeInTheDocument();
      expect(imgPokemon.src).toBe(image);
      expect(typePokemon.textContent).toBe(type);
      const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(btnNextPokemon);
    });
  });
});
describe('2.0 Testa o componente <Pokemon.js />', () => {
  it('Veridica se o card contém um link de navegação para exibir detalhes do Pokémon',
    () => {
      const { history } = renderWithRouter(<App />);
      const namePokemon = screen.getByTestId('pokemon-name');
      const objPokemon = pokemons.find((pokemon) => (
        pokemon.name === namePokemon.textContent
      ));
      const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
      expect(linkMoreDetails).toBeInTheDocument();
      userEvent.click(linkMoreDetails);
      const { pathname } = history.location;
      expect(pathname).toBe(`/pokemons/${objPokemon.id}`);
      expect(linkMoreDetails).toHaveAttribute('href', pathname);
    });
});

describe('3.0 Testa o componente <Pokemon.js />', () => {
  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const checkFavoritePokemon = screen
      .getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkFavoritePokemon);
    history.push('/favorites');
    const star = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
