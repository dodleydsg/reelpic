import InputElement from "../form/input";
import UploadLabel from "../form/uploadLabel";

export default function AddPost() {
  return (
    <form className="lg:w-4/5 mx-auto py-4 space-y-4 flex flex-col items-center justify-center">
      <input type="file" id="media" className="hidden" />
      <UploadLabel
        htmlFor="media"
        text="Add images"
        className="mx-auto inline-block"
      />
      <div>{/* Section for images */}</div>
      <div className="w-full space-y-4">
        <h4 className="font-medium">Content</h4>
        <div className="flex items-start gap-4">
          <label htmlFor="post_description">Body</label>
          <textarea
            id="post_description"
            rows="5"
            className="grow border p-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark resize-none"
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
    </form>
  );
}
