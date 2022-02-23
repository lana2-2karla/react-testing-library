import React from 'react';
import renderWithRouter from '../components/RenderWithRouter';
import App from '../App';

const { screen } = require('@testing-library/react');

describe('Testa o componente <NotFound.js />', () => {
  it('Testa se página contém o título "Page requested not found"', () => {
    // acessar
    const { history } = renderWithRouter(<App />);
    history.push('/paginaNaoEncontrada');
    const titleNotFound = screen
      .getByRole('heading', { name: /Page requested not found/i, level: 2 });
    // testar
    expect(titleNotFound).toBeInTheDocument();
  });
  it('Teste se a página mostra a imagem da URL correta', () => {
    // acessar
    const { history } = renderWithRouter(<App />);
    history.push('/paginaNaoEncontrada');
    const URLImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    // testar
    expect(img.src).toBe(URLImage);
  });
});
