import React, { useState,useEffect } from 'react';
import {Card,CardContent,CardMedia,Typography,Button,IconButton,Slider} from '@mui/material';
import { Add } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import {connect} from "react-redux";
import VideoElement from '../video/VideoCard/videoCard';

const useStyles = makeStyles({ // handling styles for the component
  root: {
  //   maxWidth: 600,
  // backgroundColor: 'black',
    width: '100%',
    height:'100%',
    borderRadius: '10px',
    // margin: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    // justifyContent: 'space-between',
   

  },
 
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 10,
    backgroundColor: '#ddd',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2196f3',
  },
  arrowButton: {
    // position: 'absolute',
    bottom: '5',
    marginLeft: '5px',
    marginRight: '5px',
    // top: '50%',
    // transform: 'translateY(-50%)',
  },
  leftArrow: {
    left: 0,
  },
  rightArrow: {
    right: 0,
  },
});

function VideoSlider(props) {
  
  const classes = useStyles();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [addDummy,setAddDummy] = useState(true)
  const [videos,setVideos]= useState([])
  const [progressWidth, setProgressWidth] = useState(0);
    // console.log("videoslider props", videos)
  const handleLeftArrowClick = () => {
    setCurrentVideoIndex((prevIndex) => prevIndex === 0 ? videos.length - 1 : prevIndex - 1);
  };

  useEffect(() => {
    console.log("calling set videos", JSON.stringify(props.video));
    setVideos(props.video.videos.videos);
}, [props.video]);


  const handleRightArrowClick = () => {
    setCurrentVideoIndex((prevIndex) => prevIndex === videos.length - 1 ? 0 : prevIndex + 1);
  };  

  // useEffect(() => {
  //   console.log("video updated:", videos);
  //   setCurrentVideoIndex(0);
  // }, [videos]);
  const formatVideoPosition = () => {
    return `${currentVideoIndex + 1}/${videos.length}`;
  };
  const renderVideos = (videos) => {
    console.log("videos exists",videos)
    return(
      <Card className={classes.root}>
        <VideoElement 
          setEvent= {setAddDummy}
          video={videos[currentVideoIndex]}
      />
    
        <div  style={{
          display: 'flex',
          flexDirection: 'row',
          // flexDirection: 'row',
        }}>
        <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          // flexDirection: 'row',
        }}
        >
                <Button
                  variant='contained'
                  color='primary'
                  className={`${classes.arrowButton} ${classes.leftArrow}`}
                  onClick={handleLeftArrowClick}
                >
                  {'<'}
                </Button>
                <Typography variant="body2">
                  {formatVideoPosition()}
              </Typography>
        {/* place a counter in here */}
                <Button
                  variant='contained'
                  color='primary'
                  className={`${classes.arrowButton} ${classes.rightArrow}`}
                  onClick={handleRightArrowClick}
                >
                  {'>'}
                </Button>
        </div>
           {
              addDummy ? <IconButton
              style={{
                  position: 'relative',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              }}
              onClick={props.handleAddEvent}
              >
      <Add  />
      </IconButton> :null
           }                 
        </div> 
    </Card>
    )
    
  }

  return (
    // console.log("videoslider props", props.video.status),
    videos? renderVideos(props.video.videos.videos):null
       
  );
}

const mapStateToProps =({ video}) =>({
  video
})

export default connect(mapStateToProps)(VideoSlider);
