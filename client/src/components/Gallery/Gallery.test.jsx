import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Gallery from '.';
import { BrowserRouter } from 'react-router-dom';

describe('Gallery', () => {
  const mockArtworks = [
    { id: '1', title: 'Artwork 1', url: 'url1.jpg' },
  ];

    beforeEach(() => {      
    render(<BrowserRouter><Gallery artworks={mockArtworks} /></BrowserRouter>);
    });
    
     afterEach(() => {
        cleanup();
    })

  it('renders the Gallery with correct content', () => {
      const galleryElement = document.getElementsByClassName('gallery')[0];
      expect(galleryElement).toBeTruthy();
   
    mockArtworks.forEach((artwork) => {
      const artworkCardElement = screen.getByAltText(artwork.title);
      expect(artworkCardElement).toBeTruthy();
      expect(artworkCardElement.src).toContain(artwork.url);
    });
  });
});
