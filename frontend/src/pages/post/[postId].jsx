import { useRouter } from "next/router";
import postResolver from "../../presentation/resolvers/post.resolver";
import postActions from "../../presentation/actions/post.actions";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/features/userSlice";
import Template from "../../templates/template";
import PostComponent from "../../components/post";
import { useEffect, useState } from "react";
import { readCookie } from "../../utils/cookie";
import LoadingScreen from "@/components/components/loadingScreen";

export default function Post() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [post, setPost] = useState({
    usersLike: [],
    user: { photo: "", username: "" },
    content: { images: [] },
    tags: [],
    created: "",
    _id: "",
    views: "",
  });
  const { postId } = router.query;

  useEffect(() => {
    try {
      const token = readCookie("token");
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

  if (postId) {
    return (
      <Template>
        <PostComponent {...post} postOwner={post.user} />
      </Template>
    );
  } else return <LoadingScreen />;
}


