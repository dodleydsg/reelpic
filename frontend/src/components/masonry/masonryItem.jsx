import template from "../../assets/images/landscape.jpg";

export default function MasonryItem({ images }) {
  if (images.length > 2) {
    return (
      <div className=" shrink-0 last:grow">
        <img alt="item" src={template} className="object-cover h-full" />
      </div>
    );
  }
  return (
    <div className=" shrink-0 last:grow">
      <img alt="item" src={images[0]} className="object-cover h-full" />
    </div>
  );
}
