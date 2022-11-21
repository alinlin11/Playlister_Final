import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useLocation } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SortIcon from '@mui/icons-material/Sort';


export default function Navigation() {
  const { store } = useContext(GlobalStoreContext);
  let location = useLocation();
  console.log(location.pathname == '/home');

  return (
    location.pathname == '/home' ?
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: "#000000" }}>
          <Toolbar>
            <Box sx={{ xs: 'none', md: 'incline' }} m={1}>
              <HomeIcon size="large">
              </HomeIcon>
            </Box>
            <Box sx={{ xs: 'none', md: 'incline' }} m={1}>
              <GroupsIcon size="large">
              </GroupsIcon>
            </Box>
            <Box sx={{ xs: 'none', md: 'incline' }} m={1}>
              <PersonIcon size="large">
              </PersonIcon>
            </Box>

            <Box>
              <TextField id="outlined-basic" label="Search" variant="filled"
                sx={{ background: "#FFFFFF", marginLeft: "200px" }}
                size="small"
                style={{ width: 500 }}
                inputProps={{}}
              />
            </Box>

            <Typography
              sx={{ fontWeight: "bold", marginLeft: "250px" }}>
              Sort By
            </Typography>

            <Box sx={{ marginLeft: "5px" }}>
              <SortIcon size="large">
              </SortIcon>
            </Box>

          </Toolbar>
        </AppBar>
      </Box > : <></>
  );

}