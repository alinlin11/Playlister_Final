import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

import HomeScreen from './HomeScreen'
import AllListScreen from './AllListScreen';
import Button from '@mui/material/Button';
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
  // console.log(location.pathname == '/home');
  const history = useHistory();

  function handleHome() {
    history.push("/home");
  }

  function handleAllPublishedList() {
    history.push("/lists");
    return <AllListScreen />
  }

  function handleUserList() { }



  return (
    location.pathname == '/home' || location.pathname == '/lists' ?
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: "#000000" }}>
          <Toolbar>
            <Box sx={{ marginLeft: "-30px" }}>
              <Button
                onClick={handleHome}>
                <HomeIcon size="large" />
              </Button>
            </Box>
            <Box sx={{ marginLeft: "-20px" }}>
              <Button
                onClick={handleAllPublishedList}>
                <GroupsIcon size="large" />
              </Button>
            </Box>
            <Box sx={{ marginLeft: "-20px" }}>
              <Button>
                <PersonIcon size="large">
                </PersonIcon>
              </Button>
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