import React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import createFetchMock from 'vitest-fetch-mock';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import CommentCard from ".";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe("CommentCard", () => {
  beforeEach(() => {
    fetchMocker.mockResponseOnce(
      JSON.stringify({
        id: 123,
        username: "mockedUsername",
      })
    );

    render(<BrowserRouter><CommentCard commentData={{ user_id: 123, content: "Mocked comment content" }} /></BrowserRouter>);
  });

  afterEach(() => {
    cleanup();
    fetchMocker.resetMocks();
  });

 it("renders CommentCard with mocked user information", async () => {
  
  await screen.findByText("mockedUsername");

  const usernameLink = screen.getByRole('link', { name: /mockedUsername/i });
  expect(usernameLink).toBeTruthy();  

  expect(usernameLink.getAttribute('href')).toEqual('/profile/123'); 
  const commentContent = screen.getByText("Mocked comment content");
  expect(commentContent).toBeTruthy();  
});

});
