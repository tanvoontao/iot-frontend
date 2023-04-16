/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

function BackToTopButton() {
  return (
    <div className="text-center">
      <button type="button" className="rounded-full border border-none p-3 relative bottom-4" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img src="/images/Double_Arrow.png" alt="Back-to-Top-Image" className="w-8 h-8 transform rotate-180 z-50" />
        <div className="absolute inset-0 rounded-full bg-blue-700 opacity-30 z-0" />
      </button>
    </div>
    // <a href="#section">
    //   <div className="bg-blue4 bg-opacity-40 rounded-full w-8 h-8 p-2.5 overflow-hidden lg:w-16 lg:h-16 lg:p-5 transform rotate-180 ">
    //     <img className="w-4 h-4 lg:h-8 lg:w-8" src="/images/Double_Arrow.png" alt="go-to-next-section" />
    //   </div>
    // </a>
  );
}

export default BackToTopButton;
