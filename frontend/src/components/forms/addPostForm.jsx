import { useState } from "react";
import InputElement from "./input";
import UploadLabel from "./uploadLabel";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function AddPostForm() {
  const MAX_STEPS = 2;
  const [steps, updateSteps] = useState(1);

  const MediaDisplay = ({ images }) => {
    if (images) {
      return <div className="h-2/3 lg:h-72"></div>;
    } else {
      return <div className="h-2/3 lg:h-72 bg-gray-100 aspect-video"></div>;
    }
  };
  const _updateSteps = (direction) => {
    if (direction === "forward") {
      if (steps < MAX_STEPS) {
        updateSteps(steps + 1);
      }
    } else {
      if (steps > 1) {
        updateSteps(steps - 1);
      }
    }
  };
  return (
    <form className="lg:w-3/5  mx-auto py-4 space-y-4 flex flex-col items-center h-full">
      <div className="flex w-full items-center justify-between py-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            _updateSteps("backward");
          }}
          className="p-2 border-primary-default/10 rounded border hover:bg-primary-default/10 transition duration-200"
        >
          <IoChevronBack />
        </button>
        <h5 className="font-medium text-xl">
          {steps === 1 ? "Media" : null}
          {steps === 2 ? "Content" : null}
        </h5>
        <button
          onClick={(e) => {
            e.preventDefault();
            _updateSteps("forward");
          }}
          className="p-2 border-primary-default/10 rounded border hover:bg-primary-default/10 transition duration-200"
        >
          <IoChevronForward />
        </button>
      </div>
      {steps === 1 ? (
        <>
          <MediaDisplay />
          <input type="file" id="media" className="hidden" />
          <UploadLabel
            htmlFor="media"
            text="Add images"
            className="mx-auto inline-block"
          />
        </>
      ) : null}
      {steps === 2 ? (
        <div className="w-full space-y-4 ">
          <div className="flex items-start gap-4 ">
            <label htmlFor="post_description">Body</label>
            <textarea
              id="post_description"
              rows="5"
              className="grow border p-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark resize-none h-64"
              placeholder="Give a useful description to your post"
            />
          </div>
          <div className="flex gap-4  items-start">
            <label htmlFor="tag">Tags</label>
            <div className="w-52 lg:w-72 flex flex-wrap items-center gap-2">
              <InputElement
                name="tag"
                id="tag"
                type="text"
                placeholder="Add tags"
              />
              <button className="border block h-full px-4 py-2 rounded text-primary-default bg-light-default hover:text-dark-default transition">
                Add
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
}
