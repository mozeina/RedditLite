import SearchpageMobile from "../components/SearchpageMobile.js";
import { render, screen } from "@testing-library/react";


describe('Seachpage for Mobile', () => {
    it('renders the searchbar', () => {
        render (<SearchpageMobile />);
        expect(screen.getByPlaceholderText('Search Reddit')).toBeInTheDocument();
    })
});
