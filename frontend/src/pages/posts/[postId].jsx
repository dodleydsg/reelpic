import { useRouter } from "next/router";
import postResolver from "../../presentation/resolvers/post.resolver";
import postActions from "../../presentation/actions/post.actions";
const userId = localStorage.getItem("id");
const token = localStorage.getItem("token");

export default function Post({ post }) {
  return (
    <div>
      This is a post {post._id} {post}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { data } = await postResolver(postAction.READ_POST, userId, token, {
    postId: context.params.postId,
  });
}
