import React from 'react';
import { Button } from '@material-ui/core';
import './warning.scss';


function Warning({message,handleYes,handleWarning}){

    return(
        <div className="warning">
            <h4 className="warning__text">{message}</h4>
            <div className ="message__buttons">
                <Button color="primary" onClick={handleYes}>Yes</Button>
                <Button color="secondary" onClick={handleWarning}>No</Button>
            </div>
        </div>
    );
}

export default Warning;