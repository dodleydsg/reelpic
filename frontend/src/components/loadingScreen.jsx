import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="h-10 w-10 bg-primary-default animate-ping rounded-full"></div>
    </div>
  );
}
