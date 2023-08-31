import { useRouter } from "next/router";
import postResolver from "../../presentation/resolvers/post.resolver";
import postActions from "../../presentation/actions/post.actions";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/features/userSlice";
import Template from "../../templates/template";
import PostComponent from "../../components/post";
import { useEffect, useState } from "react";
import { readCookie } from "../../utils/cookie";

export default function Post() {
  const router = useRouter();
  const [post, setPost] = useState({});
  useEffect(() => {
    try {
      const token = readCookie("token");
      const postId = router.query;
      const { data } = postResolver(postActions.READ_POST, token, { postId });
      setPost(data);
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


