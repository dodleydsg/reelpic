import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import userResolver from "@/components/presentation/resolvers/user.resolver";
import userActions from "@/components/presentation/actions/user.actions";
import UserDetails from "@/components/components/userDetails";
import LoadingScreen from "@/components/components/loadingScreen";
import Template from "@/components/templates/template";
import { readCookie } from "@/components/utils/cookie";
import { getUser } from "@/components/store/features/userSlice";

export default function User() {
  const router = useRouter();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user.user);
  const [user, setUser] = useState({
    usersLike: [],
    user: { photo: "", username: "" },
    content: { images: [] },
    tags: [],
    created: "",
    _id: "",
    views: "",
    followers: [],
    following: [],
    posts: [],
  });
  const { username } = router.query;

  useEffect(() => {
    try {
      if (username) {
        const token = readCookie("token");
        if (token) {
          dispatch(getUser({ token }));
        }
        userResolver(userActions.HY_READ, "", {
          username,
          populate: [
            {
              field: "posts",
              subFields: ["content", "_id"],
            },
            {
              field: "followers",
              subFields: ["followers", "following", "username", "photo"],
            },
            {
              field: "following",
              subFields: ["followers", "following", "username", "photo"],
            },
          ],
        }).then(({ data }) => {
          // console.log(data);
          setUser(data);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [router]);

  if (username) {
    return (
      <Template>
        <UserDetails authUser={authUser} user={user} />
      </Template>
    );
  } else return <LoadingScreen />;
}


