import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import SongCard from './SongCard'


import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

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

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            let _id = event.target.id;

            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            store.setCurrentList(id)
        }
    }

    useEffect(() => {
        store.loadIdNamePairs();
        // console.log(store.idNamePairs);
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
                columns={{ xs: 4, md: 12 }}>

                {
                    store.idNamePairs.map((pair) => (

                        <Grid item xs >
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        </Grid>

                    ))
                }
            </Grid >


        return (

            <div id="list-selector-list">

                {
                    listCard
                }
                <MUIDeleteModal />
            </div>)

    };
}

export default HomeScreen;