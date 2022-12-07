import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'

import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


const UserListScreen = () => {
  const { store } = useContext(GlobalStoreContext);
  

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#f1ee8e",
    ...theme.typography.body2,
    padding: theme.spacing(4),
    textAlign: 'center',
  }));

  useEffect(() => {
    store.loadPublishedPlaylists();
    // console.log(store.publishedPlaylists);
    // console.log(store.idNamePairs);
  }, []);

  let listCard = "";
  if (store) {
    listCard =
      <Grid container
        direction="column"
        justifyContent="center"
        spacing={{ xs: 0, md: 2 }}
        columns={{ xs: 4, md: 12 }}>

        {
          store.publishedPlaylists.map((pair) => (

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

export default UserListScreen;