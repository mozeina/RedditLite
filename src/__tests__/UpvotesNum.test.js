import UpvotesNum from "../components/UpvotesNum";
import { render, screen } from "@testing-library/react";

describe('upvotes', () => {
    it('cmon', () => {
        render(
            <p>
                <UpvotesNum ups={1000000} />
            </p>
        )
        screen.debug();
    })
    // expect(screen.getByText('1.00M')).toBeInTheDocument();
})