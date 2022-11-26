import React, { useEffect } from "react";
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import AuthContext from '../auth';
import { Typography } from "@mui/material";
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    store.history = useHistory();

    console.log(auth.loggedIn);
    console.log(store.currentList);

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    // useEffect to use history.push to homescreen if store is null || or if logged in and has no current list
    // to login screen if logged out
    // useEffect(() => {
    //     console.log("USE EFFECT CALL");
    //     if (store.currentList === null && auth.loggedIn === false)
    //         store.history.push("/");
    // });


    let cardClass = "list-card unselected-list-card";
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                bgcolor: '#777373'
            }}>

            {store.currentList != null ?
                <div>
                    <Box>
                        <Typography
                            sx={{
                                fontWeight: "bold",
                                fontSize: "24px",
                                marginLeft: "10px"
                            }}
                        >
                            {store.currentList.name}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontWeight: "bold",
                                marginLeft: "10px"
                            }}>
                            by:
                        </Typography>
                    </Box>
                </div>
                : <></>}

            <List
                id="playlist-cards"
                sx={{ width: '90%', height: 500, overflowY: "scroll" }}
            >
                {
                    store.currentList !== null ?
                        store.currentList.songs.map((song, index) => (

                            <div
                                key={index}
                                id={'song-' + index + '-card'}
                                className={cardClass}
                            // onDragStart={handleDragStart}
                            // onDragOver={handleDragOver}
                            // onDragEnter={handleDragEnter}
                            // onDragLeave={handleDragLeave}
                            // onDrop={handleDrop}
                            // draggable="true"
                            // onClick={handleClick}
                            >

                                <SongCard
                                    id={'playlist-song-' + (index)}
                                    key={'playlist-song-' + (index)}
                                    index={index}
                                    song={song} />

                                <input
                                    type="button"
                                    id={"remove-song-" + index}
                                    className="list-card-button"
                                    value={"\u2715"}
                                // onClick={handleRemoveSong}
                                />
                            </div>


                        )) : ""
                }
            </List>
            {modalJSX}
        </Box >
    )
}

export default WorkspaceScreen;