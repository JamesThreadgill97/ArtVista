import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import ContactUsPage from '.';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);


describe('AboutPage', () => {
  it('renders "AboutPage"', () => {
    render(<BrowserRouter><ContactUsPage /></BrowserRouter>);
    const aboutPageElement = screen.getByText(/ContactUsPage/i);
    expect(aboutPageElement).toBeTruthy();
  });
});