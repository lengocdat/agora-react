import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack , ICameraVideoTrack, IMicrophoneAudioTrack} from "agora-rtc-sdk-ng";
import React, { useRef, useEffect, useState } from "react";

export interface VideoPlayerProps {
  videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
}

const MediaPlayer = (props: VideoPlayerProps) => {
  const container = useRef<HTMLDivElement>(null);
  const [Mic, setMic] = useState(true)
  useEffect(() => {
    if (!container.current) return;
    props.videoTrack?.play(container.current);
    return () => {
      props.videoTrack?.stop();
    };
  }, [container, props.videoTrack]);
  useEffect(() => {
    props.audioTrack?.play();
    return () => {
      props.audioTrack?.stop();
    };
  }, [props.audioTrack]);
  
  const toggleCam = () => {
    props.videoTrack?.getStats()
    if(props.videoTrack?.isPlaying){
    }
    else{
      if(container.current){
        props.videoTrack?.play(container.current)
      }
    }
  }
  const toggleMic = () => {
    if(props.audioTrack?.isPlaying) {
      props.audioTrack?.stop()
    }
    if(!props.audioTrack?.isPlaying) {
      props.audioTrack?.play()
    }
  }
  return (
    <>
    <button onClick={toggleMic}>toggle mic</button>
    <div ref={container}  className="video-player" style={{ width: "320px", height: "240px"}}></div>
    <button onClick={toggleCam}>toggle camera</button>
    </>
  );
}

export default MediaPlayer;