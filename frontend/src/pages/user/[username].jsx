import { useRouter } from "next/router";

export default function User() {
  const router = useRouter();
  const { username } = router.query;
  return <div>Hello, {username}</div>;
}
