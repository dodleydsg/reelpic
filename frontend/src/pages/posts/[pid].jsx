import { useRouter } from "next/router";

export default function User() {
  const router = useRouter();
  console.log(router);
  const { pid } = router.query;
  return <div>This is a post, {pid}</div>;
}
