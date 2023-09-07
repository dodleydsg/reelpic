import Image from "next/image";
import { useRouter } from "next/router";
import GenerateProfile from "../generateProfile";

export default function NavbarProfile({ image, username, clickCallback }) {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    // <Image
    //   alt="profile_img"
    //   height={40}
    //   width={40}
    //   src={image}
    //   className={`rounded-[40px] cursor-pointer ${
    //     pathname === "/profile"
    //       ? "ring-1 ring-primary-default ring-offset-2"
    //       : ""
    //   }`}
    //   onClick={() => router.push("/profile")}
    // />
    <GenerateProfile username={username}/>
  );
}
