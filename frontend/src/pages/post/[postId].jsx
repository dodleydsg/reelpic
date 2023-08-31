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
  const dispatch = useDispatch();
  const [post, setPost] = useState({});

  useEffect(() => {
    try {
      const token = readCookie("token");
      const postId = router.query.postId;
      if (postId) {
        dispatch(getUser({ token }));
        postResolver(postActions.READ_POST, token, { postId }).then(
          ({ data }) => {
            console.log(data);
            setPost(data);
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [router]);

  return (
    <Template>
      <PostComponent {...post} postOwner={post.user} />
    </Template>
  );
}


