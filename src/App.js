import React, { useState, useCallback, useRef, useEffect } from "react";
import StartForm from "./components/startForm/startForm";
import Room from "./components/room/room";
import axios from "axios";
import imgPic from "./components/assets/404.png";
import Loader from "./components/loader/loader";
import Reconnection from "./components/reconnection/reconnecting";
import "./app.scss";

function App() {
  const [name, setUsername] = useState(null); // stores the name of the local participant
  const [roomName, setRoomName] = useState(null); // Stores the name of the room
  const [token, setToken] = useState(false); // Stores the token given by twilio api
  const [handleError, setError] = useState(false); // is true when an error occurs in the axios api
  const [loading, setLoader] = useState(false); // When true loader component is rendered
  const [reconnecting, setReconnection] = useState(false); // when true the reconnecting component is rendered
  const [isMobile, setIsMobile] = useState(false); // When true the animation to the room component is removed

  let appRef = useRef();

  let jwt = ""; // jwt is set to null

  let url = "http://localhost:8081/token"; // Enter your server url here

  const handleSubmit = async (event) => {
    event.preventDefault();
    setReconnection(false);
    setLoader(true);

    if (!reconnecting && name !== null && !roomName !== null) {
      let body = {
        identity: name,
        roomName: roomName,
      };

      axios.head(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      await axios
        .post(url, body)
        .then((res) => {
          if (res.status !== 404) {
            console.log(res);
            console.log("res token", res.data);
            jwt = res.data;
            setToken(jwt);
            setLoader(false);
          } else {
            setLoader(false);
            setError(true);
          }
        })
        .catch((error) => {
          setLoader(false);
          console.error(error);
          setError(true);
        });

      setToken(jwt);
      console.log("token", token);
    } else {
      setLoader(false);
    }
  };

  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  useEffect(() => {
    if (appRef.current.offsetWidth <= 1360) {
      setIsMobile(true);
    }
  }, []);

  if (handleError) {
    return (
      <div className="error">
        <img src={imgPic} alt="404 Error" />
      </div>
    );
  } else if (loading) {
    return <Loader type="Connecting" />;
  } else if (reconnecting) {
    return <Reconnection handleSubmit={handleSubmit} setToken={setToken} />;
  } else {
    return (
      <div className="App" ref={appRef}>
        {!token ? (
          <StartForm
            storeToken={setToken}
            handleUsernameChange={handleUsernameChange}
            handleRoomNameChange={handleRoomNameChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <Room
            roomName={roomName}
            token={token}
            setToken={setToken}
            setReconnection={setReconnection}
            setLoader={setLoader}
            isMobile={isMobile}
          />
        )}
      </div>
    );
  }
}

export default App;
