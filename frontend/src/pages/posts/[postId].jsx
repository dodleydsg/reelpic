import { useRouter } from "next/router";
import postResolver from "../../presentation/resolvers/post.resolver";
import postActions from "../../presentation/actions/post.actions";
import { useDispatch } from "react-redux";
import { getUser } from "../../store/features/userSlice";
import Template from "../../templates/template";
import PostComponent from "../../components/post";
import { useEffect } from "react";
import { readCookie } from "../../utils/cookie";

export default function Post({ post }) {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const token = readCookie("token");
      dispatch(getUser({ token }));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Template>
      <PostComponent {...post} />
    </Template>
  );
}

export async function getServerSideProps(context) {
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
