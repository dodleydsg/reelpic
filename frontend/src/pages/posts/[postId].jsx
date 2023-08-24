import { useRouter } from "next/router";
import postResolver from "../../presentation/resolvers/post.resolver";
import postActions from "../../presentation/actions/post.actions";


export default function Post({ post }) {
  return <div>This is a post {post._id}</div>;
}

export async function getServerSideProps(context) {
  console.log(context.req.cookies);
  const { data } = await postResolver(
    postActions.READ_POST,
    context.req.cookies.token,
    {
      postId: context.params.postId,
    }
  );
  return {
    props: {
      post: data,
    },
  };
}
