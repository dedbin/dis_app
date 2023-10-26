import React, { useRef } from 'react';

type VideoPlayerProps = React.VideoHTMLAttributes<HTMLVideoElement>;

const CustomVideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <video ref={videoRef} {...props}>
      Your browser does not support the video tag.
    </video>
  );
};

export default CustomVideoPlayer;