import React from "react";

function Advertisement() {
  return (
    <div className='ads-restaurant-frame'>
      <video className='ads-video' autoPlay={true} loop muted playsInline data-video-media=''>
        <source type='video/mp4' src='video/aurebliss-video.mp4' />
      </video>
    </div>
  );
}

export default Advertisement;
