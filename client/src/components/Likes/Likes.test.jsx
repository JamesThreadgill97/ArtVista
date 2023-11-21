import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import createFetchMock from 'vitest-fetch-mock';
import Likes from ".";

describe("Likes", () => {
    afterEach(() => {
        cleanup();
    });

    const fetchMocker = createFetchMock(vi);
    fetchMocker.enableMocks();

    it("should handle like button click", async () => {
        const artwork = {
            user_id: 1,
            title: "Sample Artwork",
            description: "A beautiful artwork",
            likes: 0
        };

        render(<BrowserRouter><Likes id={123} artwork={artwork} /></BrowserRouter>);

        fetchMocker.mockResponseOnce(JSON.stringify({}));

        const likeImage = screen.getByAltText("");
        const likeCount = screen.getByText("0");

        fireEvent.click(likeImage);

        await new Promise(resolve => setTimeout(resolve, 0));

        expect(likeImage.src).toContain("heart.png");
        expect(likeCount.textContent).toBe("1");
    });
});
