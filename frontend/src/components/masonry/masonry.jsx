import MasonryItem from "./masonryItem";
import Link from "next/link";

export default function Mansory({ data }) {
  let numberPerSection = Math.round(data.length / 4);

  return (
    <div className="transition-all duration-300 grid grid-cols-2 xl:grid-cols-4 gap-4">
      <div className="space-y-4 flex flex-col">
        {data.slice(0, numberPerSection).map((val) => (
          <Link href={`post/${val._id}`} key={val._id}>
            <MasonryItem key={val._id} images={val.content.images} />
          </Link>
        ))}
      </div>
      <div className="space-y-4 flex flex-col">
        {data.slice(numberPerSection, 2 * numberPerSection).map((val) => (
          <Link href={`post/${val._id}`} key={val._id}>
            <MasonryItem key={val._id} images={val.content.images} />
          </Link>
        ))}
      </div>
      <div className="space-y-4 flex flex-col">
        {data.slice(2 * numberPerSection, 3 * numberPerSection).map((val) => (
          <Link href={`post/${val._id}`} key={val._id}>
            <MasonryItem key={val._id} images={val.content.images} />
          </Link>
        ))}
      </div>
      <div className="space-y-4 flex flex-col">
        {data.slice(3 * numberPerSection).map((val) => (
          <Link href={`post/${val._id}`} key={val._id}>
            <MasonryItem key={val._id} images={val.content.images} />
          </Link>
        ))}
      </div>
    </div>
  );
}

