import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import EtiquettePage from '.';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);


describe('EtiquettePage', () => {
  it('renders "EtiquettePage"', () => {
    render(<BrowserRouter><EtiquettePage /></BrowserRouter>);
    const EtiquettePageElement = screen.getByText(/EtiquettePage/i);
    expect(EtiquettePageElement).toBeTruthy();
  });
});