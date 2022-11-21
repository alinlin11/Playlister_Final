import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import MUIDeleteModal from './MUIDeleteModal'


import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "#f1ee8e",
        ...theme.typography.body2,
        padding: theme.spacing(4),
        textAlign: 'center',
    }));

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard =
            <Grid container
                direction="column"
                justifyContent="center"
                spacing={{ xs: 0, md: 2 }}
                columns={{ xs: 4, md: 12 }}

            >
                {
                    store.idNamePairs.map((pair) => (
                        <Grid item
                            xs
                            key={pair._id}
                            // idNamePair={pair}
                            selected={false} >
                            <Box
                                sx={{
                                    width: 690,
                                    height: 100,
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
                                    {pair.name}
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

                                <ThumbUpOffAltIcon
                                    sx={{
                                        position: "relative",
                                        marginLeft: "400px",
                                        bottom: "80px"
                                    }}>
                                </ThumbUpOffAltIcon>

                                <ThumbDownOffAltIcon
                                    sx={{
                                        position: "relative",
                                        marginLeft: "80px",
                                        bottom: "80px"
                                    }}>
                                </ThumbDownOffAltIcon>

                                <KeyboardDoubleArrowDownIcon size="large"
                                    sx={{
                                        position: "relative",
                                        marginLeft: "100px",
                                        bottom: "20px"
                                    }}>
                                </KeyboardDoubleArrowDownIcon>
                            </Box>
                        </Grid>
                    ))
                }
            </Grid >;
    }
    return (

        <div id="list-selector-list">

            {
                listCard
            }
            <MUIDeleteModal />
        </div>)

}

export default HomeScreen;