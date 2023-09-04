import Image from "next/image";
import Link from "next/link";
import profile from "../assets/images/Profile1.png";

export default function ({ photo, followers, following, _id, username }) {
  return (
    <div className="grid text-sm grid-cols-4  gap-2 border-primary-default/20 border rounded-md">
      <div className="p-2 col-span-1  flex flex-col items-center justify-center gap-2 border-r-2 border-primary-default/20">
        <Link href={`/user/${_id}`}>
          <ProfilePic />
        </Link>
        <p className="text-xs font-bold mt-2">@{username}</p>
      </div>
      <div className="p-2 col-span-3 flex-col flex items-start justify-center">
        <div className="grid grid-cols-2 w-full text-center divide-x-2 divide-primary-default">
          <div className="py-2">
            <p className="text-2xl text-primary-default break-words">
              {followers.length} <br />
              <span className="text-xs uppercase font-bold text-dark-default">
                Followers
              </span>
            </p>
          </div>
          <div className="p-2">
            <p className="text-2xl text-primary-default">
              <span className="text-xs uppercase font-bold text-dark-default">
                Following
              </span>{" "}
              <br />
              {following.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProfilePic = ({ photo }) => {
  return (
    <Image
      alt="profile_img"
      height={40}
      width={40}
      src={photo || profile}
      className="rounded-[40px] cursor-pointer ring-1 ring-primary-default ring-offset-2"
    />
  );
};
