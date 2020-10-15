import React from 'react';
import './loader.scss'

function Loader({type}){
    return(
        <div className="loader">
            <h3 className="loader__title">{type}</h3>
            <div className="loader__dots">
                <div className="loader__dots__dot"></div>
                <div className="loader__dots__dot"></div>
                <div className="loader__dots__dot"></div>
            </div>

        </div>
    )
}

export default Loader;