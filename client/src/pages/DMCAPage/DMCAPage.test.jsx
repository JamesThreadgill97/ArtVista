import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import DMCAPage from '.';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);


describe('DMCAPage', () => {
  it('renders "DMCAPage"', () => {
    render(<BrowserRouter><DMCAPage /></BrowserRouter>);
    const DMCAPageElement = screen.getByText(/DMCAPage/i);
    expect(DMCAPageElement).toBeTruthy();
  });
});