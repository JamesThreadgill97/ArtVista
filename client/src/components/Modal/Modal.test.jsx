import React from 'react';
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Modal from ".";
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

describe("Modal", () => {
    afterEach(() => {
        cleanup();
    });

    const closeModalMock = vi.fn();

    it("should render the modal when isOpen is true", () => {
        render(
            <BrowserRouter>
                <Modal isOpen={true} onClose={() => {}} closeModal={closeModalMock}>
                    <div>Modal Content</div>
                </Modal>
            </BrowserRouter>
        );

        const modalElement = screen.getByText("Modal Content");
        expect(modalElement).toBeTruthy();
    });

    it("should not render the modal when isOpen is false", () => {
        render(
            <BrowserRouter>
                <Modal isOpen={false} onClose={() => {}} closeModal={closeModalMock}>
                    <div>Modal Content</div>
                </Modal>
            </BrowserRouter>
        );

        const modalElement = screen.queryByText("Modal Content");
        expect(modalElement).toBeFalsy();
    });

    it("should call closeModal when clicking on the close button", () => {
        render(
            <BrowserRouter>
                <Modal isOpen={true} onClose={() => {}} closeModal={closeModalMock}>
                    <div>Modal Content</div>
                </Modal>
            </BrowserRouter>
        );

        const closeButton = screen.getByText("×"); 
        fireEvent.click(closeButton);

        expect(closeModalMock).toHaveBeenCalledTimes(1);
    });

    // it("should call closeModal when clicking outside the modal content", () => {
    //     render(
    //         <BrowserRouter>
    //             <Modal isOpen={true} onClose={() => {}} closeModal={closeModalMock}>
    //                 <div>Modal Content</div>
    //             </Modal>
    //         </BrowserRouter>
    //     );

    //     const modalContent = screen.getByTestId("modal-content");
    //     fireEvent.click(modalContent);

    //     expect(closeModalMock).toHaveBeenCalledTimes(1);
    // });
});
