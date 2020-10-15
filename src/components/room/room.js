import React, { useState, useEffect} from 'react';
import Video from 'twilio-video';
import Participant from '../participant/participant';
import ParticipantList from '../participantList/participantList';
import './room.scss';
import Menu from '../menu/menu';
// import Warning from '../warning/warning';
import Loader from '../loader/loader';
// import axios from "axios";


const Room = ({ roomName, token, setToken,setReconnection,isMobile }) => {


    // All the states 

    const [roomWidth, setRoomWidth] = useState(false);        // Is true when the participant list is opened and adds 400px margin right to the room class
    const [room, setRoom] = useState(null);                   // Stores the room object 
    const [participants, setParticipants] = useState([]);     // Stores the participant details
    const [toggleAudio, setToggleAudio] = useState(true);     // Is true when local participant's mic is on
    const [toggleVideo, setToggleVideo] = useState(true);     // Is true when local participant's mic is off
    const [toggleParticipantsList, setParticipantsList] = useState(false);  //Is true when participant's list menu button is pressed and thus the menu slides open
    const [toggleMenu, setToggleMenu] = useState(false);      // Is true when move moves or hover over the menu component and the menu appears
    const [toggleFullScreen, setFullScreen] = useState(false) //Is true when a local participant pins a remote participants video thus making it fullscreen
    // const [toggleWarning, setWarning] = useState(false); // If true, the waring component will be displayed
    
 

    useEffect(() => {

        // Function to store the remote participant details

        const participantConnected = participant => {
            setParticipants(prevParticipants => [...prevParticipants, participant]);
        };

        // Function to remove the remote participant details of whom disconnected from the state

        const participantDisconnected = participant => {
            setParticipants(prevParticipants =>
                prevParticipants.filter(p => p !== participant)
            );
        };

        // Establishing a connection to the twilio server

        Video.connect(token, {
            name: roomName,

        }).then(room => {
            setRoom(room);
            room.on('participantConnected', participantConnected);
            room.on('participantDisconnected', participantDisconnected);
            room.participants.forEach(participantConnected);
            room.on('dominantSpeakerChanged', participant => {
                console.log('The new dominant speaker in the Room is:', participant);
            });
            room.once('disconnected', (room, error) => {
                if (error) {
                  console.log('You were disconnected from the Room:', error.code, error.message);
                  setReconnection(true);
                }
              });
            
        }).catch(error => {
            if ('code' in error) {
              // Handle connection error here.
              console.error('Failed to join Room:', error.code, error.message);
              setReconnection(true);
            }
          });
          

        const cleanup= () =>{
            setRoom(currentRoom => {
                    if (currentRoom && currentRoom.localParticipant.state === 'connected') {
                        currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
                            trackPublication.track.stop();
                        });
                        currentRoom.disconnect();
                        console.log("disconnected")
                        return null;
                    } else {
                        return currentRoom;
                    }
                });
        

        }

        // Removes the local participant from the room when he/she closes the window

        return () => {

            cleanup();
        };
    }, [roomName, token,setReconnection]);

    // Function to disconnect the local participant from the room

    const handleCallDisconnect = () => {
        room.disconnect();
        setToken(null);
    };

    // Function to disable or enable the local participant's audio

    const handleAudioToggle = () => {
        room.localParticipant.audioTracks.forEach(track => {
            if (track.track.isEnabled) {
                track.track.disable();
            } else {
                track.track.enable();
            }
            setToggleAudio(track.track.isEnabled);

        });
    };

    // Function to disable or enable the local participant's audio

    const handleVideoToggle = () => {
        room.localParticipant.videoTracks.forEach(track => {
            if (track.track.isEnabled) {
                track.track.disable();
            } else {
                track.track.enable();
            }
            setToggleVideo(track.track.isEnabled);
        });
    };

    // Function the open or close the participant list component

    const handleParticipantListToggle = () => {
        setParticipantsList((prevState) => !prevState);
        if(!isMobile){
            setRoomWidth(!roomWidth);
        }
        
    }

    // Function to open and close the menu when the mouse moves 

    const handleMenuOpen = () => {
        setToggleMenu(true);
        setTimeout(
            () => setToggleMenu(false),
            3000
        );


    }

    // Function to make a participant's video full screen

    const handleFullScreen = (event) => {
        setFullScreen(prevState => !prevState);
        if (toggleFullScreen) {
            event.target.parentElement.style.position = "absolute";
            event.target.parentElement.style.zIndex = "3"
        }
        else {
            event.target.parentElement.style.position = "relative";
            event.target.parentElement.style.zIndex = "1"
        }

    }

    // Function to set warning 

    // const handleWarning = ()=>{
    //     setWarning(prevState=>!prevState);
    // }


    // const handleRemoveParticipant =  (event)=>{

        // var data ={
        //     room : roomName,
        //     identity : participant.identity
        // }
        
        // var url = "http://192.168.31.168:5000/room/removeparticipant";

        // await axios.post(url, data).then(res => {
        //     if(res.status!==404){
        //     console.log("Participant Removed");

        //     }
        //   })
        //     .catch(error => {
              
        //       console.error(error)
           
        //     })
        
    // }

    // Adds a margin right of 400px to the room component when the participant list component is opened

    var style;

    if (roomWidth) {

        style = { marginRight: "400px" }
    }

    // Adds remote participant's video and audio to the room component 

    const remoteParticipants = participants.map(participant => (
        <Participant key={participant.sid} participant={participant} toggleFullScreen={toggleFullScreen} handleFullScreen={handleFullScreen} />
    ));






    return (
        

            room ? (
                <div className="room"  onMouseMove={handleMenuOpen} style={style}>
                    <Participant key={room.localParticipant.sid} participant={room.localParticipant} toggleVideo={toggleVideo} toggleAudio={toggleAudio} />
                 {remoteParticipants}
                    <ParticipantList key={participants.sid} participants={participants} toggleParticipantsList={toggleParticipantsList}/>
                    <Menu
                        handleAudioToggle={handleAudioToggle}
                        handleVideoToggle={handleVideoToggle}
                        handleCallDisconnect={handleCallDisconnect}
                        handleParticipantListToggle={handleParticipantListToggle}
                        toggleMenu={toggleMenu}
                        toggleAudio={toggleAudio}
                        toggleVideo={toggleVideo}
                        style={style}
                    />
                </div>) : <Loader type="Connecting"/>


        
    );
    // return(
    //     <Warning message="Are you sure to remove this participant ?"/>
    // )

};

export default Room;