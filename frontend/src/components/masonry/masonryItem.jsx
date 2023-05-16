import template from "../../assets/images/landscape.jpg";
import Image from "next/image";

export default function MasonryItem({ className }) {
  return (
    <div className={className + " shrink-0 last:grow"}>
      <Image alt="item" src={template} className="object-cover h-full" />
    </div>
  );
}
