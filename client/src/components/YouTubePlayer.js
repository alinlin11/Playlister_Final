import React from 'react';

import YouTube from 'react-youtube';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Toolbar } from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function YouTubePlayerExample() {
  // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
  // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
  // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
  // FROM ONE SONG TO THE NEXT

  // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
  let playlist = [
    "mqmxkGjow1A",
    "8RbXIMZmVv8",
    "8UbNbor3OqQ"
  ];

  // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
  let currentSong = 0;

  const playerOptions = {
    height: '320',
    width: '483',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  // THIS FUNCTION LOADS THE CURRENT SONG INTO
  // THE PLAYER AND PLAYS IT
  function loadAndPlayCurrentSong(player) {
    let song = playlist[currentSong];
    player.loadVideoById(song);
    player.playVideo();
  }

  // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
  function incSong() {
    currentSong++;
    currentSong = currentSong % playlist.length;
  }

  function onPlayerReady(event) {
    loadAndPlayCurrentSong(event.target);
    event.target.playVideo();
  }

  // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
  // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
  // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
  // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
  function onPlayerStateChange(event) {
    let playerStatus = event.data;
    let player = event.target;
    if (playerStatus === -1) {
      // VIDEO UNSTARTED
      console.log("-1 Video unstarted");
    } else if (playerStatus === 0) {
      // THE VIDEO HAS COMPLETED PLAYING
      console.log("0 Video ended");
      incSong();
      loadAndPlayCurrentSong(player);
    } else if (playerStatus === 1) {
      // THE VIDEO IS PLAYED
      console.log("1 Video played");
    } else if (playerStatus === 2) {
      // THE VIDEO IS PAUSED
      console.log("2 Video paused");
    } else if (playerStatus === 3) {
      // THE VIDEO IS BUFFERING
      console.log("3 Video buffering");
    } else if (playerStatus === 5) {
      // THE VIDEO HAS BEEN CUED
      console.log("5 Video cued");
    }
  }


  return (
    <div>
      <Box
        sx={{
          width: "80px",
          height: "30px",
          marginLeft: "730px",
          position: "relative",
          backgroundColor: "white",
          borderRadius: 2,
          textAlign: "center"
        }}>
        <Button>
          <Typography
            sx={{ fontSize: "16px", fontWeight: "bold" }}>
            Player
          </Typography>
        </Button>
      </Box>

      <Box sx={{ marginLeft: "731px", marginTop: "0px", position: "relative" }}>
        <YouTube
          videoId={playlist[currentSong]}
          opts={playerOptions}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange} />
      </Box>
      <Box
        sx={{
          width: "483px",
          height: "250px",
          marginLeft: "730px",
          marginTop: "-40px",
          position: "relative",
          backgroundColor: "#ADD8E6",
          borderRadius: 3
        }}>

        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center"
          }}>
          Now Playing
        </Typography>

        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "left",
            marginLeft: "20px"
          }}>
          Playlist:
        </Typography>

        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "left",
            marginLeft: "20px"
          }}>
          Song #:
        </Typography>

        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "left",
            marginLeft: "20px"
          }}>
          Title:
        </Typography>

        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "left",
            marginLeft: "20px"
          }}>
          Artist:
        </Typography>

        <Box
          sx={{
            width: "400px",
            marginLeft: "40px",
            marginTop: "20px"
          }}>
          <Toolbar
            sx={{
              background: "white",
              borderRadius: 3
            }}>

            <Button
              sx={{ marginLeft: "50px" }}>
              <SkipPreviousIcon />
            </Button>

            <Button>
              <StopIcon />
            </Button>

            <Button>
              <PlayArrowIcon />
            </Button>

            <Button>
              <SkipNextIcon />
            </Button>
          </Toolbar>
        </Box>

      </Box>
    </div>

  )

}