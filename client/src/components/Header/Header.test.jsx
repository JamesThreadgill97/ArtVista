import React from "react";
import { describe, it, expect, beforeEach, afterEach, test } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import Header from "."

describe("Header", () => {
  beforeEach(() => {
    render(<BrowserRouter><Header /></BrowserRouter>);
  });

   afterEach(() => {
        cleanup();
    })

  it("Displays a navigation with the correct amount of Links ", () => {
    const navigation = screen.getByRole("navigation");
    expect(navigation).toBeInTheDocument();
    expect(navigation.children.length).toBe(4);
  });

  it("Renders Footer with the correct number of Links", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(8);
  });
});

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

beforeEach(() => {
  fetchMocker.resetMocks();
});

afterEach(() => {
    localStorage.clear();
  });

  

test('Logs out user and removes items from localStorage', async () => {
  fetchMocker.mockResponseOnce(JSON.stringify({ username: 'testUser' }));

  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
it('renders username when user is logged in', () => {
    // Check if the username element is present
    const usernameElement = screen.getByText('testUser'); // Replace with the expected username
    expect(usernameElement).toBeInTheDocument();
});
    
  const loginButton = screen.getByText('Login');
  expect(loginButton).toBeInTheDocument();
  loginButton.click();

  const registerButton = screen.getByText('Register');
  expect(registerButton).toBeInTheDocument();
  registerButton.click();

  expect(localStorage.getItem('token')).toBeNull();
  expect(localStorage.getItem('user_id')).toBeNull();
});

test('Header component tests', () => {
  describe('useEffect', () => {
    globalThis.fetch = async () => ({
      json: async () => ({ user_id: '123', username: 'testUser' }),
      status: 201,
    });

    globalThis.localStorage.getItem = jest.fn().mockReturnValue('mockedToken');

    test('sets the username', async () => {
      render(Header);

        await new Promise((resolve) => setTimeout(resolve, 100));
        
      const usernameNavLink = screen.getByText('testUser');
      expect(usernameNavLink).toBeInTheDocument();

      const usernameElement = document.querySelector('.your-username-selector');
      expect(usernameElement.textContent).toBe('testUser');

      const loginButton = screen.queryByText('Login');
      const registerButton = screen.queryByText('Register');

      expect(loginButton).toBeNull();
        expect(registerButton).toBeNull();
         const usernameDiv = screen.getByTestId('username-div');
      expect(usernameDiv).toBeInTheDocument();
      // Check if the NavLink is a child of the <div>
      expect(usernameDiv).toContainElement(usernameNavLink);
    });
  });
});
