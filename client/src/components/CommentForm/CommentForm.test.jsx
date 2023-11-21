import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import createFetchMock from 'vitest-fetch-mock';
import CommentForm from ".";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe("CommentForm", () => {
  beforeEach(() => {
    render(<BrowserRouter><CommentForm/></BrowserRouter>);
  });

  afterEach(() => {
    cleanup();
    fetchMocker.resetMocks();
  });

  it("should handle form submission and mock fetch", async () => {
    fetchMocker.mockResponseOnce(JSON.stringify({ status: 201 }));

    const textarea = screen.getByPlaceholderText("Comment here...");
    fireEvent.change(textarea, { target: { value: "Test comment" } });

    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

  });
});
