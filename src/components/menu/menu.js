import React from 'react';
import { makeStyles } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import GroupIcon from '@material-ui/icons/Group';
import CallEndIcon from '@material-ui/icons/CallEnd';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';

import './menu.scss'

const useStyles = makeStyles({
  active: {
    marginLeft:"20px",
    color:"white",
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    "&:hover": {
      backgroundColor: "solid",
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    }
  },
  inactive: {
    color:"white",
    marginLeft:"20px",
    background: '#FF0F0F',
    "&:hover": {
      backgroundColor: "solid",
      background: '#FF0F0F',
    }
  },
  endCall: {
    color:"white",
    marginLeft:"20px",
    background: '#FF0F0F',
    "&:hover": {
      backgroundColor: "solid",
      background: '#FF0F0F',
    }
  }

});
function Menu({ handleCallDisconnect, handleAudioToggle, handleVideoToggle, handleParticipantListToggle, toggleMenu, toggleAudio, toggleVideo,style }) {
  const classes = useStyles();
  let menuClass = 'Menu';
  if (toggleMenu) {
    menuClass = 'Menu open';
  }

  return (
    <div className={menuClass} style={style} >
      {toggleAudio ? <IconButton onClick={handleAudioToggle} className={classes.active}>< MicIcon /></IconButton> : <IconButton onClick={handleAudioToggle} className={classes.inactive}><MicOffIcon /></IconButton>}
      {toggleVideo ? <IconButton onClick={handleVideoToggle} className={classes.active}><VideocamIcon /></IconButton> : <IconButton onClick={handleVideoToggle} className={classes.inactive}><VideocamOffIcon /></IconButton>}

      <IconButton onClick={handleParticipantListToggle} className={classes.active}>
        <GroupIcon />
      </IconButton>
      <IconButton onClick={handleCallDisconnect} className={classes.endCall}>
        <CallEndIcon />
      </IconButton>

    </div>
  );
}

export default Menu;
