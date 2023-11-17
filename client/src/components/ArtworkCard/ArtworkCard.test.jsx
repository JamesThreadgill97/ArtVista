import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ArtworkCard from '.';

describe('ArtworkCard', () => {
    beforeEach(() => {
    render(<BrowserRouter><ArtworkCard id="1" title="Test Artwork" url="test-url.jpg" /></BrowserRouter>);
  });
    afterEach(() => {
        cleanup();
    })

  it('renders the ArtworkCard with correct content', () => {
    const navLinkElement = screen.getByRole('link');
   expect(navLinkElement).toBeTruthy();

    const imageElement = screen.getByAltText('Test Artwork');
    expect(imageElement).toBeTruthy();
    expect(imageElement.src).toContain('test-url.jpg');
  }); 
});
