import Link from "next/link";

export default function NavIcon({
  path,
  SolidIcon,
  OutlineIcon,
  href,
  display,
}) {
  if (path === href) {
    return (
      <Link
        href={href}
        className="flex justify-center lg:justify-start items-start gap-2 w-full text-[24px]  text-primary-default"
      >
        <SolidIcon className="w-6 lg:w-8 h-auto" />
        <p className="text-xl hidden lg:block">{display}</p>
      </Link>
    );
  } else {
    return (
      <Link
        href={href}
        className=" flex justify-center lg:justify-start items-start gap-2 w-full text-[24px] text-dark-default/80"
      >
        <OutlineIcon className=" w-6 lg:w-8 h-auto" />
        <p className="text-xl hidden lg:block">{display}</p>
      </Link>
    );
  }
}
