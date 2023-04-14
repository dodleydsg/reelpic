import Link from "next/link";
import testImg from "../assets/images/1.png";
import Image from "next/image";

export default function TrashCard() {
  return (
    <div className="rounded-lg col-span-1 border border-gray-300 flex flex-col">
      <div>
        <Image src={testImg} />
      </div>
      <div className="flex justify-between items-center p-2">
        <Link href="/home" className="text-green-500">
          Restore
        </Link>
        <Link href="/home" className="text-danger-default">
          Delete
        </Link>
      </div>
    </div>
  );
}
