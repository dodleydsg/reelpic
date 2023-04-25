import MasonryItem from "./masonryItem";
export default function Mansory() {
  return (
    <div className="transition-all duration-300 grid grid-cols-2 xl:grid-cols-4 gap-4">
      <div className="space-y-4 flex flex-col">
        {" "}
        <MasonryItem className="h-56" />
        <MasonryItem className="" />
        <MasonryItem className="h-56" />
        <MasonryItem className="" />
        <MasonryItem className="h-56" />
      </div>
      <div className="space-y-4 flex flex-col h-full ">
        {" "}
        <MasonryItem />
        <MasonryItem className="h-72" />
        <MasonryItem />
        <MasonryItem className="h-72" />
        <MasonryItem />
      </div>
      <div className="space-y-4 flex flex-col">
        {" "}
        <MasonryItem />
        <MasonryItem className="h-56" />
        <MasonryItem className="h-72" />
        <MasonryItem className="h-56" />
        <MasonryItem className="h-72" />
      </div>
      <div className="space-y-4 flex flex-col">
        {" "}
        <MasonryItem />
        <MasonryItem className="h-72" />
        <MasonryItem /> <MasonryItem className="h-72" />
        <MasonryItem />
      </div>
    </div>
  );
}
