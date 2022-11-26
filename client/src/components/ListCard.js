import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import SongCard from './SongCard'
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { style } from '@mui/system';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [expand, setExpand] = useState(0);
    const { idNamePair, selected } = props;

    // console.log(store.currentList);

    function handleLoadList(event, id) {
        event.stopPropagation();
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = id;
        _id = ("" + _id).substring("delete-list-".length);
        //console.log(id);
        store.markListForDeletion(id);
    }

    function handleDuplicateList(event, id) {
        event.stopPropagation();
    }

    function handleAddSong(event) {
        event.stopPropagation();
        store.addNewSong();
    }

    function handleDeleteSong(event, index, song) {
        event.stopPropagation();
        store.showRemoveSongModal(index, song);
    }

    function handleEditSong(event, index, song) {
        event.stopPropagation();

        if (event.detail === 2) {
            store.showEditSongModal(index, song);
        }
    }

    function handleUndo(event) { 
        event.stopPropagation();
        store.undo();
    }

    function handleRedo(event) {
        event.stopPropagation();
        store.redo();
     }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleClick(event, id) {
        event.stopPropagation();
        if (event.detail === 2)
            handleToggleEdit(event);

        if (event.detail === 1)
            handleExpand(event, id);
    }

    function handleExpand(event, id) {
        event.stopPropagation();
        store.setCurrentList(id);
        setExpand(true);
    }

    function handleCollapse(event) {
        event.stopPropagation();
        setExpand(false);
    }


    let cardClass = "list-card unselected-list-card";


    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }

    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair}
            sx={{ marginTop: '-10px', display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '48pt' }}
            button
            onClick={(event) => { handleClick(event, idNamePair._id) }}

        >
            {expand == false ?
                <Box
                    sx={{
                        width: 690,
                        height: 100,
                        backgroundColor: 'white',
                        marginLeft: "5px",
                        borderRadius: 3
                    }}>
                    <Typography
                        sx={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginLeft: "5px"
                        }}>
                        {idNamePair.name}
                    </Typography>



                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            marginLeft: "5px",
                            marginTop: "5px"
                        }}>
                        by:
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            marginLeft: "5px",
                            marginTop: "16px"
                        }}>
                        Published:
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            marginLeft: "450px",
                            marginTop: "-20px"
                        }}>
                        Listens: {idNamePair.listens}
                    </Typography>

                    <Box>
                        <Button
                            sx={{
                                position: "relative",
                                marginLeft: "400px",
                                bottom: "110px"
                            }}>
                            <ThumbUpOffAltIcon
                            >
                            </ThumbUpOffAltIcon>
                        </Button>
                        <Typography
                            sx={{
                                position: "relative",
                                marginLeft: "450px",
                                bottom: "150px",
                                fontWeight: "bold"
                            }}>
                            {idNamePair.likes}
                        </Typography>
                    </Box>

                    <Box>
                        <Button
                            sx={{
                                position: "relative",
                                marginLeft: "530px",
                                bottom: "207px"
                            }}>
                            <ThumbDownOffAltIcon>
                            </ThumbDownOffAltIcon>
                        </Button>

                        <Typography
                            sx={{
                                position: "relative",
                                marginLeft: "580px",
                                bottom: "249px",
                                fontWeight: "bold"

                            }}>
                            {idNamePair.dislikes}
                        </Typography>
                    </Box>

                    <Button
                        sx={{
                            position: "relative",
                            marginLeft: "630px",
                            bottom: "250px"
                        }}
                    >
                        <KeyboardDoubleArrowDownIcon size="large" style={{ color: "black" }}>
                        </KeyboardDoubleArrowDownIcon>
                    </Button>
                </Box> :


                //         // EXPANDED LIST
                //         <Box
                //             sx={{
                //                 width: 690,
                //                 height: 480,
                //                 backgroundColor: 'white',
                //                 marginLeft: "10px",
                //                 borderRadius: 3
                //             }}>
                //             <Typography
                //                 sx={{
                //                     fontSize: "20px",
                //                     fontWeight: "bold",
                //                     marginLeft: "5px"
                //                 }}>
                //                 {idNamePair.name}
                //             </Typography>

                //             <Typography
                //                 sx={{
                //                     fontSize: "14px",
                //                     fontWeight: "bold",
                //                     marginLeft: "5px",
                //                     marginTop: "5px"
                //                 }}>
                //                 by:
                //             </Typography>

                //             <Button
                //                 sx={{
                //                     position: "relative",
                //                     marginLeft: "400px",
                //                     bottom: "60px"
                //                 }}>
                //                 <ThumbUpOffAltIcon>
                //                 </ThumbUpOffAltIcon>
                //             </Button>


                //             <Button
                //                 sx={{
                //                     position: "relative",
                //                     marginLeft: "80px",
                //                     bottom: "60px"
                //                 }}>
                //                 <ThumbDownOffAltIcon>
                //                 </ThumbDownOffAltIcon>
                //             </Button>

                //             <Box
                //                 sx={{
                //                     position: "relative",
                //                     width: 640,
                //                     height: 300,
                //                     marginLeft: "20px",
                //                     bottom: "50px",
                //                     backgroundColor: 'primary.dark',
                //                     borderRadius: 3,
                //                 }}
                //                 style={{ overflow: "auto" }}
                //             >
                //                 {store.currentList !== null ?
                //                     store.currentList.songs.map((song, index) => (
                //                         <Typography
                //                             sx={{ color: "orange", fontWeight: "bold", marginLeft: "5px", m: 1 }}
                //                         >
                //                             {index + 1}.  {song.title} by {song.artist}
                //                         </Typography>
                //                     )) : ""
                //                 }
                //             </Box>

                //             <Button
                //                 variant="outlined"
                //                 sx={{
                //                     bottom: "65px",
                //                     marginLeft: "450px"
                //                 }}
                //                 onClick={(event) => { handleDeleteList(event, idNamePair._id) }}
                //             >
                //                 Delete
                //             </Button>


                //             <Button
                //                 variant="outlined"
                //                 sx={{
                //                     bottom: "138px",
                //                     marginLeft: "550px"
                //                 }}
                //                 onClick={(event) => { handleDuplicateList(event, idNamePair._id) }}
                //             >
                //                 Duplicate
                //             </Button>

                //             <Typography
                //                 sx={{
                //                     fontSize: "14px",
                //                     fontWeight: "bold",
                //                     position: "relative",
                //                     marginLeft: "5px",
                //                     bottom: "130px"
                //                 }}>
                //                 Published:
                //             </Typography>

                //             <Typography
                //                 sx={{
                //                     fontSize: "14px",
                //                     fontWeight: "bold",
                //                     position: "relative",
                //                     marginLeft: "400px",
                //                     bottom: "150px"
                //                 }}>
                //                 Listens:
                //             </Typography>

                //             <Button
                //                 sx={{
                //                     position: "relative",
                //                     marginLeft: "600px",
                //                     bottom: "200px"
                //                 }}
                //                 onClick={(event) => { handleCollapse(event) }}>
                //                 <KeyboardDoubleArrowUpIcon size="large" style={{ color: "black" }}>
                //                 </KeyboardDoubleArrowUpIcon>
                //             </Button>

                //         </Box>
                //     }
                // </ListItem >

                //////////////////////////////  WORKSPACE WHEN LIST IS CLICKED  //////////////////////////////////////
                <Box
                    sx={{
                        width: 690,
                        height: 480,
                        backgroundColor: 'white',
                        marginLeft: "10px",
                        borderRadius: 3
                    }}>
                    <Typography
                        sx={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginLeft: "5px"
                        }}>
                        {idNamePair.name}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            marginLeft: "5px",
                            marginTop: "5px"
                        }}>
                        by:
                    </Typography>

                    <List
                        id="playlist-cards"
                        sx={{ width: '100%', height: '60%', overflow: "auto" }}
                    >
                        {
                            store.currentList !== null ?
                                store.currentList.songs.map((song, index) => (

                                    <div
                                        key={index}
                                        id={'song-' + index + '-card'}
                                        className={cardClass}
                                        onClick={(event) => { handleEditSong(event, index, song) }}
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
                                            song={song}
                                        />

                                        <Button
                                            sx={{
                                                marginLeft: "600px",
                                                marginTop: "-10px"
                                            }}
                                            onClick={(event) => { handleDeleteSong(event, index, song) }}
                                        >
                                            <ClearIcon size="large" style={{ color: "white" }}></ClearIcon>
                                        </Button>

                                        {/* <input
                                type="button"
                                id={"remove-song-" + index}
                                className="list-card-button"
                                value={"\u2715"}
                            // onClick={handleRemoveSong}
                            /> */}

                                    </div>
                                )) : <></>
                        }

                        <div
                            className={cardClass}
                            onClick={(event) => { handleAddSong(event) }}>
                            <Button
                                sx={{ marginLeft: "300px" }} >
                                <AddIcon size="large" style={{ color: "white" }}></AddIcon>
                            </Button>
                        </div>
                    </List>

                    <Button variant="outlined"
                        sx={{
                            marginLeft: "20px"
                        }}
                        onClick={handleUndo}>
                        Undo
                    </Button>

                    <Button variant="outlined"
                        sx={{
                            marginLeft: "5px"
                        }}
                        onClick={handleRedo}>
                        Redo
                    </Button>

                    <Button variant="outlined"
                        sx={{
                            marginLeft: "190px"
                        }}>
                        Publish
                    </Button>

                    <Button variant="outlined"
                        sx={{
                            marginLeft: "5px"
                        }}
                        onClick={(event) => { handleDeleteList(event, idNamePair._id) }}>
                        Delete
                    </Button>

                    <Button variant="outlined"
                        sx={{
                            marginLeft: "5px"
                        }}>
                        Duplicate
                    </Button>

                    <Button
                        sx={{
                            position: "relative",
                            marginLeft: "630px",
                            bottom: "20px"
                        }}>
                        <KeyboardDoubleArrowUpIcon size="large">
                        </KeyboardDoubleArrowUpIcon>
                    </Button>

                </Box >

            }
            {modalJSX}
        </ListItem >

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{ style: { fontSize: 48 } }}
                InputLabelProps={{ style: { fontSize: 24 } }}
                autoFocus
            />
    }
    return (
        cardElement

    );
}

export default ListCard;