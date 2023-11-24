import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { BrowserRouter } from "react-router-dom";
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Comments from '.';

describe('Comments Component', () => {
  it('renders no comments when the comments array is empty', () => {
    render(<BrowserRouter><Comments comments={[]} /></BrowserRouter>);

    const noCommentsElement = screen.queryByText('No comments');
    expect(noCommentsElement).not.toBeInTheDocument(); 
  });

  
});
