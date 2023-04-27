import Image from "next/image";

export default function NavbarProfile({ image, clickCallback }) {
  return (
    <Image
      alt="profile_img"
      height={40}
      width={40}
      src={image}
      className="rounded-[40px] cursor-pointer"
      onClick={() => clickCallback}
    />
  );
}
