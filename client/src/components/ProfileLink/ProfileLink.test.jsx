import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import ProfileLink from '.';
import { BrowserRouter } from 'react-router-dom';

describe('ProfileLink', () => {
  const mockId = '123';

  beforeEach(() => {
    render(<BrowserRouter><ProfileLink id={mockId} /></BrowserRouter>);
  });
    
    afterEach(() => {
        cleanup();
    });

  it('renders the ProfileLink with correct content and link', () => {
    const profileLinkElement = screen.getByText("Artist's profile");
    expect(profileLinkElement).toBeTruthy();

    const expectedHref = `/profile/${mockId}`;
    expect(profileLinkElement.href).toContain(expectedHref);

    expect(profileLinkElement.classList.contains('nav-link')).toBeTruthy();
    expect(profileLinkElement.classList.contains('profile-link')).toBeTruthy();
  });
});
