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
        className="flex justify-center lg:justify-start items-start gap-2 w-full text-lg text-primary-default font-medium"
      >
        <SolidIcon className="text-2xl" />
        <p className="text-xl hidden lg:block">{display}</p>
      </Link>
    );
  } else {
    return (
      <Link
        href={href}
        className=" flex justify-center lg:justify-start items-start gap-2 w-full text-lg text-dark-default font-medium"
      >
        <OutlineIcon  className='text-2xl' />
        <p className="text-xl hidden lg:block">{display}</p>
      </Link>
    );
  }
}
