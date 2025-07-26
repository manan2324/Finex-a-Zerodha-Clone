import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/jest-globals";
import Hero from "../landing_page/home/Hero";

//Test suite for Hero component
describe("Hero component", () => {
    test("renders hero section", () => {
        render(<Hero />);
        const heroImage = screen.getByAltText("Hero");
        expect(heroImage).toBeInTheDocument();
        expect(heroImage).toHaveAttribute("src", "media/images/homeHero.png");
    });
});
