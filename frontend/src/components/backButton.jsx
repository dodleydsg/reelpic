import { MdArrowBack } from "react-icons/md";

export default function BackButton({ clickCallback }) {
  return (
    <div onClick={() => clickCallback()} className="inline-block">
      <MdArrowBack className="w-6 h-auto text-dark-default/80 cursor-pointer" />
    </div>
  );
}
