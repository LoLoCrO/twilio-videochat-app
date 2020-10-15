import React from "react";
import './startForm.scss';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 4,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    textDecoration: 'white',
    width: "300px",
    color: "white",
  },
  buttonStyle: {
    width: "300px",
    margin: "15px",
    color: "white",
    "&:hover": {
      backgroundColor: "solid",
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    }

  },
  input: {
    color: "white"
  },


});
function StartForm({
  handleUsernameChange,
  handleRoomNameChange,
  handleSubmit,
}) {

  const classes = useStyles();


  return (

    <form onSubmit={handleSubmit} className="startForm">
      <TextField
        label="Display Name"
        margin="normal"
        id="name"
        name="name"
        variant="filled"
        className={classes.root}
        InputProps={{
          className: classes.input
        }}
        InputLabelProps={{ className: "startForm__label" }}

        onChange={handleUsernameChange}
      />

      <TextField
        label="Room Code"
        margin="normal"
        id="room"
        name="room"
        InputLabelProps={{ className: "startForm__label" }}
        InputProps={{
          className: classes.input
        }}
        className={classes.root}
        variant="filled"
        onChange={handleRoomNameChange} />

      <Button
        type="submit"

        className={classes.buttonStyle}

      >
        Join Room
        </Button>


    </form>

  )
}

export default StartForm