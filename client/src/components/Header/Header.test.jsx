import React from "react";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import createFetchMock from 'vitest-fetch-mock';

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
  const navigations = screen.getAllByRole("navigation");

  navigations.forEach((navigation) => {
    expect(navigation).toBeInTheDocument();
    expect(navigation.children.length).toBe(4);
  });
});

  it("Renders Footer with the correct number of Links", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(8);
  });
  it('renders the Home link', () => {
        const homeLink = screen.getByRole('link', { name: /home/i });
        expect(homeLink).toBeInTheDocument();
    fireEvent.click(homeLink);
            expect(window.location.href).toEqual('http://localhost:3000/');

        // expect(window.location.href).toEqual('https://artvista-api.onrender.com/');
    });

    it('renders the create link', () => {
        const addLink = screen.getByRole('link', { name: /add/i });
        expect(addLink).toBeInTheDocument();
      fireEvent.click(addLink);
              expect(window.location.href).toEqual('http://localhost:3000/create');

        // expect(window.location.href).toEqual('https://artvista-api.onrender.com/create');
    });

    it('renders the login link', () => {
        const loginLink = screen.getByRole('link', { name: /login/i });
        expect(loginLink).toBeInTheDocument();
      fireEvent.click(loginLink);
              expect(window.location.href).toEqual('http://localhost:3000/login');

       // expect(window.location.href).toEqual('https://artvista-api.onrender.com/login');
    });
   it('renders the register link', () => {
        const registerLink = screen.getByRole('link', { name: /register/i });
        expect(registerLink).toBeInTheDocument();
     fireEvent.click(registerLink);
             expect(window.location.href).toEqual('http://localhost:3000/register');

        // expect(window.location.href).toEqual('https://artvista-api.onrender.com/register');
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
    const usernameElement = screen.getByText('testUser'); 
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

    globalThis.localStorage.getItem = spyOn.fn().mockReturnValue('mockedToken');

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
      expect(usernameDiv).toContainElement(usernameNavLink);
    });
  });

  describe("Header", () => {
    const fetchSpy = vi.spyOn(global, "fetch");
    afterEach(() => {
      fetchSpy.mockRestore();
    });
    it('should fetch user data and update state', async () => {
      const mockUserData = {
        user_id: '123',
        username: 'testUser',
      };

      const mockResponse = {
        status: 201,
        json: async () => mockUserData,
      };

      fetchSpy.mockResolvedValue(mockResponse);

      render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

     
      await waitFor(() => {
        
        expect(fetchSpy).toHaveBeenCalledWith(
          'https://artvista-api.onrender.com/users/showId',
          expect.objectContaining({
            method: 'GET',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              token: localStorage.getItem('token'),
            }),
          })
        );

        
        const usernameElement = screen.getByText('testUser');
        expect(usernameElement).toBeInTheDocument();
      });
    });
  });
  describe('Header', () => {
    it('should handle logout by removing items from localStorage', () => {
     
      localStorage.setItem('token', 'testToken');
      localStorage.setItem('user_id', '123');

      
      render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

     
      const logoutButton = screen.getByText('Logout');
      expect(logoutButton).toBeInTheDocument();

  
      fireEvent.click(logoutButton);

      
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user_id')).toBeNull();
    });
  });
});
