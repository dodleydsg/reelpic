import NavbarTemplate from "../templates/template_with_navbar";
import Mask from "../components/mask";
import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CompleteLogin } from "../components/requireLogin";
import { useEffect } from "react";
import userResolver from "../presentation/resolvers/user.resolver";
import userActions from "../presentation/actions/user.actions";
import UserDetails from "../components/userDetails";

function Profile() {
  const authUser = useSelector((state) => state.user.user);
  const { username } = authUser;
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
  useEffect(() => {
    try {
      if (username) {
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
          setUser(data);
        });
      }
    } catch (error) {
      // console.log(error);
    }
  }, []);
  return (
    <>
      <Mask />
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile username={authUser.username} image={profile} />}
        headerText="Profile"
        pageTitle="My profile"
      >
        <UserDetails authUser={authUser} user={user} />
      </NavbarTemplate>
    </>
  );
}

export default () => (
  <CompleteLogin>
    <Profile />
  </CompleteLogin>
);
