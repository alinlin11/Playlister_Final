import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useLocation } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'


/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    let location = useLocation();

    let text = "";
    if (store.currentList)
        text = store.currentList.name;

    function handleCreateNewList() {
        // console.log("CALLED");
        store.createNewList();
    }

    return (
        // <div id="playlister-statusbar">
        //     <Typography variant="h4">{text}</Typography>
        // </div> );

        location.pathname == '/home' ?
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="absolute" sx={{ background: "#000000", top: "100%" }}>
                    <Toolbar>
                        <div id="playlister-statusbar">
                            <div id="list-selector-heading">
                                <Typography variant="h3">Your Lists</Typography>
                            </div>
                            <Fab
                                color="primary"
                                aria-label="add"
                                id="add-list-button"
                                onClick={handleCreateNewList}
                            >
                                <AddIcon />
                            </Fab>
                        </div >
                    </Toolbar>
                </AppBar>
            </Box> :

            location.pathname == '/lists' ?
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="absolute" sx={{ background: "#000000", top: "100%" }}>
                        <Toolbar>
                            <div id="playlister-statusbar">
                                <div id="list-selector-heading">
                                    <Typography variant="h3">Playlists</Typography>
                                </div>
                            </div >
                        </Toolbar>
                    </AppBar>
                </Box> : <></>
    )

}

export default Statusbar;