import React from "react";

import '../styling/homepage.css';
import '../styling/mobile.css';
import '../styling/tablet.css';
import '../styling/desktop.css';
import '../styling/searchbarstyle.css';


function SearchpageMobile() {
   
    return (
        <>
            <header>
                <div className='searchbar-searchpage'>
                    <form method="get" action="" >
                        <div className="tb">
                            <div className="td">
                                <input type="text" placeholder="Search Reddit" required />
                                </div>
                            <div className="td" id="s-cover">
                                <button type="submit">
                                    <div id="s-circle"></div>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </header>
            <main></main>
        </>
    )
}

export default SearchpageMobile;