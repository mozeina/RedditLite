import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import store from '../app/store.js';
import React, {act} from "react";


import App from "../app/App.js"

describe('App', () => {
    describe('Routes', () => {
        it('renders Homepage on path "/"', () => {
            act(() => {
                render(
                    <Provider store={store}>
                        <App />
                    </Provider>
                )
            });
            expect(screen.getByText('RedditLite')).toBeInTheDocument();
        })
    })
})