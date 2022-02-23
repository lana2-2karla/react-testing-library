import React from 'react';
import { About } from '../components';
import renderWithRouter from './helpers/RenderWithRouter';

const { screen } = require('@testing-library/react');

describe('Testa o componente <About.js />', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    // acessar
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    // testar
    expect(aboutTitle).toBeInTheDocument();
  });
  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    // acessar
    renderWithRouter(<About />);
    const aboutP1 = screen.getByText(/This application simulates a Pokédex/i);
    const aboutP2 = screen.getByText(/One can filter Pokémons by type/i);
    // testar
    expect(aboutP1 && aboutP2).toBeInTheDocument();
  });
  it('Testa se a página contém uma imagem', () => {
    // acessar
    renderWithRouter(<About />);
    const aboutImg = screen.getByRole('img');
    const urlImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    // testar
    expect(aboutImg.src).toBe(urlImg);
  });
});
