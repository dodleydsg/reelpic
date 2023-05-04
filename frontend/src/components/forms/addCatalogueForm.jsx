import InputElement from "./input";
export default function AddCatalogueForm() {
  return (
    <form className="space-y-4">
      <label htmlFor="title" className="sr-only">
        Title
      </label>
      <InputElement
        type="text"
        className="w-full"
        placeholder="Title"
        name="title"
      />
      <label htmlFor="description" className="sr-only">
        Description
      </label>
      <textarea
        type="textarea"
        rows="5"
        placeholder="Description"
        name="description"
        className="border p-4 w-full rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark "
      />
      <button className="btn-primary hover:bg-[#4900EB]">Confirm</button>
    </form>
  );
}
