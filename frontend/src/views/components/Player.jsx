import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Container, Row, Col, Badge } from "react-bootstrap";
import screenfull from "screenfull";
import {
  Forward10,
  FullScreen,
  Play,
  Pause,
  Replay10,
  VolumeHigh,
  VolumeMute,
  VolumeLow,
  VolumeMid,
  FullScreenExit
} from "../../assets/Icons";
import { formatTime } from "../../assets/Helper";
import Slider from "@mui/material/Slider";
import "./Css/Player.css";

export const VideoPlayer = ({ url, title }) => {
  // Reference of Video Player
  const videoRef = useRef(null);
  // Reference of Video Player Wrapper
  const videoWrapperRef = useRef(null); 

  // State if controls are visible or not
  const [controlsVisibility, setControlsVisibility] = useState(false);

  // State for all controls of video player
  const [videoControls, setVideoControls] = useState({
    playing: false,
    muted: false,
    volume: 0.5,
    speed: 1,
    played: 0,
    seeking: false,
    isFullScreen: false
  });

  // Function to handle onHover on video player
  const handleOnHover = () => {
    if (!controlsVisibility) {
      setControlsVisibility(true);
      setTimeout(() => setControlsVisibility(false), 3000);
    }
  };

  // Function to handle OnProgress of Video
  const handleOnProgress = (state) => {
    if (!videoControls.seeking) {
      setVideoControls({ ...videoControls, played: state.played });
    }
  };

  // Function to handle onClick on video player wrapper
  const handleOnClick = () => {
    if (!controlsVisibility)
      setVideoControls((current) => ({
        ...current,
        playing: !current.playing
      }));
  };

  const [volumeSlider, setVolumeSlider] = useState(false);

  // Number of seconds video already played
  const currentSeconds = videoRef.current ? videoRef.current.getCurrentTime() : 0;
  // Total number of seconds in video
  const totalSeconds = videoRef.current ? videoRef.current.getDuration() : 0;

  // In hh:mm:ss format
  const currentTime = formatTime(currentSeconds);
  const totalTime = formatTime(totalSeconds);

  // Function to Handle Play/Pause Button
  const handlePlayPause = () => {
    setVideoControls({
      ...videoControls,
      playing: !videoControls.playing
    });
  };

  // Function to Handle Forward10 Button
  const handleForward10 = () => {
    videoRef.current.seekTo(videoRef.current.getCurrentTime() + 10);
  };

  // Function to Handle Replay10 Button
  const handleReplay10 = () => {
    videoRef.current.seekTo(videoRef.current.getCurrentTime() - 10);
  };

  // Function to Mute the Volume
  const handleMuted = () => {
    setVideoControls({
      ...videoControls,
      muted: !videoControls.muted
    });
  };

  // Function to Handle Change in Volume
  const handleVolumeChange = (e, newVolume) => {
    setVideoControls({
      ...videoControls,
      volume: newVolume / 100,
      muted: newVolume === 0 ? true : false
    });
  };

  // Function to Handle Commit in Volume
  const handleVolumeCommitted = (e, newVolume) => {
    setVideoControls({
      ...videoControls,
      volume: newVolume / 100,
      muted: newVolume === 0 ? true : false
    });
  };

  // Function to Handle Speed of Video
  const handleSpeed = () => {
    let newSpeed = videoControls.speed === 2 ? 0 : videoControls.speed;
    setVideoControls({
      ...videoControls,
      speed: newSpeed + 0.25
    });
  };

  // Function to Handle FullScreen Button
  const handleFullScreen = () => {
    screenfull.toggle(videoWrapperRef.current);
    setVideoControls({
      ...videoControls,
      isFullScreen: !videoControls.isFullScreen
    });
  };

  // Function to Handle Video Seekbar Slider Change
  const handleSeekbarChange = (e, newPlayed) => {
    setVideoControls({
      ...videoControls,
      played: newPlayed / 100
    });
    videoRef.current.seekTo(newPlayed / 100, "fraction");
  };

  // Function to Handle Mouse Down on Video Seekbar Slider
  const handleSeekbarMouseDown = () => {
    setVideoControls({
      ...videoControls,
      seeking: true
    });
  };

  // Function to Handle Mouse Up on Video Seekbar Slider
  const handleSeekbarMouseUp = (e, newPlayed) => {
    setVideoControls({
      ...videoControls,
      seeking: false
    });
    videoRef.current.seekTo(newPlayed / 100, "fraction");
  };

  // Function to Handle onClick on controls-overlay
  const handleOverlayOnClick = (e) => {
    if (e.target.getAttribute("name") === "controls-overlay") {
      setVideoControls((current) => ({ ...current, playing: !current.playing }));
    }
  };

  return (
    <div className="VideoPlayerWrapper bg-dark" onMouseMove={handleOnHover} ref={videoWrapperRef} onClick={handleOnClick}>
      <ReactPlayer
        ref={videoRef}
        url={url}
        width="100%"
        height="100%"
        playing={videoControls.playing}
        muted={videoControls.muted}
        volume={videoControls.volume}
        playbackRate={videoControls.speed}
        onProgress={handleOnProgress}
        onEnded={() => setVideoControls({ ...videoControls, playing: false })}
      />
      {controlsVisibility && (
        <Container
          fluid
          className="controls-overlay"
          onClick={handleOverlayOnClick}
          name="controls-overlay"
        >
          {/* TOP: Title */}
          <Row className="w-100 title">
            {!videoControls.playing && (
              <Col className="video-title" name="controls-overlay">
                {title}
              </Col>
            )}
          </Row>

          {/* BOTTOM: Controls */}
          <Row className="w-100 controls">
            <Col>
              <Row className="mx-1">
                <Slider
                  min={0}
                  max={100}
                  color="primary" 
                  value={videoControls.played * 100}
                  onChange={handleSeekbarChange}
                  onMouseDown={handleSeekbarMouseDown}
                  onChangeCommitted={handleSeekbarMouseUp}
                  valueLabelDisplay="auto"
                  scale={(x) => parseInt((totalSeconds * x) / 100)} 
                  className="video-slider"
                />
              </Row>
              <Row>
                <Col xs={8} className="d-flex align-items-center">
                  {/* CONTROL: Play/Pause */}
                  <Icon onClick={handlePlayPause}>
                    {videoControls.playing ? <Pause /> : <Play />}
                  </Icon>
                  {/* CONTROL: Replay10 */}
                  <Icon onClick={handleReplay10}>
                    <Replay10 />
                  </Icon>
                  {/* CONTROL: Forward10 */}
                  <Icon onClick={handleForward10}>
                    <Forward10 />
                  </Icon>
                  {/* CONTROL: Volume */}
                  <span
                    className="d-flex align-items-center"
                    onMouseEnter={() => setVolumeSlider(true)}
                    onMouseLeave={() => setVolumeSlider(false)}
                  >
                    <Icon onClick={handleMuted}>
                      {videoControls.muted ? (
                        <VolumeMute />
                      ) : videoControls.volume < 0.33 ? (
                        <VolumeLow />
                      ) : videoControls.volume < 0.66 ? (
                        <VolumeMid />
                      ) : (
                        <VolumeHigh />
                      )}
                    </Icon>
                    {volumeSlider && (
                      <span style={{ width: "100px", marginRight: "1rem" }} className="d-flex">
                        <Slider
                          min={0}
                          max={100}
                          value={videoControls.muted ? 0 : videoControls.volume * 100}
                          onChange={handleVolumeChange}
                          onChangeCommitted={handleVolumeCommitted}  
                          className="video-slider"
                        />
                      </span>
                    )}
                  </span>
                  <span className="video-timer d-flex">{`${currentTime} / ${totalTime}`}</span>
                </Col>
                <Col xs={4} className="d-flex justify-content-end align-items-center">
                  {/* CONTROL: Speed */}
                  <Badge
                    onClick={handleSpeed}
                    className="speed-control bg-transparent"
                  >
                    {`${videoControls.speed}x`}
                  </Badge>
                  {/* CONTROL: FullScreen */}
                  <Icon onClick={handleFullScreen} >
                    {videoControls.isFullScreen ? <FullScreenExit /> : <FullScreen />}
                  </Icon>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

const Icon = ({ children, onClick }) => {
  return <span onClick={onClick}>{children}</span>;
};
