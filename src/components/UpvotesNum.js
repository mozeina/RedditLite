import React from "react";

function UpvotesNum({ ups }) {

    function configureUps(ups) {
        if (ups) {
            ups = ups.toString();
        if (ups < 10000) return ups;
        else if (ups > 9999 && ups < 100000){
                return `${ups.slice(0, 2)}.${ups.slice(2,3)}k`;
        } else if (ups > 99999 && ups < 1000000) {
            return `${ups.slice(0,3)}.${ups.slice(3,4)}k`;
        } else  if (ups > 999999 && ups < 10000000) {
            return `${ups.slice(0, 1)}.${ups.slice(1, 3)}M`
        } else return `${ups.slice(0,1)}??`
        }
        
    }
    return (
       <p className='ups'>{configureUps(ups)}</p>
    )
}

export default UpvotesNum;
