import { Button } from '@material-ui/core';
import React from 'react';
import './reconnecting.scss';


function Reconnecting({handleSubmit,setToken}){

return(
    <div className="reconnecting">
        <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 612 612"
      version="1.1"
      viewBox="0 0 612 612"
      xmlSpace="preserve"
    >
      <path d="M494.7 229.5c-17.851-86.7-94.351-153-188.7-153-38.25 0-73.95 10.2-102 30.6l38.25 38.25c17.85-12.75 40.8-17.85 63.75-17.85 76.5 0 140.25 63.75 140.25 140.25v12.75h38.25c43.35 0 76.5 33.15 76.5 76.5 0 28.05-15.3 53.55-40.8 66.3l38.25 38.25C591.6 438.6 612 400.35 612 357c0-66.3-53.55-122.4-117.3-127.5zM76.5 109.65l71.4 68.85C66.3 183.6 0 249.9 0 331.5c0 84.15 68.85 153 153 153h298.35l51 51 33.15-33.15L109.65 76.5 76.5 109.65zM196.35 229.5l204 204H153c-56.1 0-102-45.9-102-102s45.9-102 102-102h43.35z"></path>
    </svg>

    <h4 className="reconnecting__title">Connection Lost</h4>
    <p className="reconnecting__des">Would you like to reconnect or leave ?</p>
    <div className="reconnecting__buttons">
        <Button onClick={handleSubmit} color="primary">Reconnect</Button>
        <Button onClick={()=>{setToken(false);}}  color="secondary">Leave</Button>
    </div>
    </div>
);
    


};


export default Reconnecting;