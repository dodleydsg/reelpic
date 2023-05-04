import React from "react";

export default function UploadLabel({
  mobile,
  desktop,
  text,
  htmlFor,
  className,
  ...rest
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={
        `px-4 rounded inline-block text-primary-default/60 border-gray-300 border py-2 hover:text-primary-default hover:bg-light-default transition cursor-pointer ` +
        className
      }
      {...rest}
    >
      {text}
    </label>
  );
}
