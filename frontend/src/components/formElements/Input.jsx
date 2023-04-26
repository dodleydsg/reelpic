import { useState } from "react";

export default function InputElement(props) {
  const [inputVal, onChangeInput] = useState("");
  // use state data

  return (
    <>
      <input
        {...props}
        type={props.type}
        className={
          "h-12 border px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark " +
          props.className
        }
        placeholder={props.placeholder}
      />
      <label aria-label={props.name} className="sr-only">
        Enter your email
      </label>
    </>
  );
}
