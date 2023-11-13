import React from 'react';

const VideoBackground = () => {
    console.log("Video path:", "your-video-file.mp4");
  return (
    <div className="video-background">
      <video autoPlay loop>
        <source src="Background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;