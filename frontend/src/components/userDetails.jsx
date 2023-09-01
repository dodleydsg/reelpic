import { useRouter } from "next/router";

const TABS = ["posts", "catalogues"];

function UserDetails({ user }) {
  const [activeTab, toggleTab] = useState("posts");
  const router = useRouter();

  const TopTab = () => (
    <div className="sticky z-20 lg:top-0 top-[72px]  py-4 bg-white">
      <div className="flex  p-2 mx-auto justify-around items-center gap-4 bg-light-default border-2">
        {TABS.map((val, idx) => {
          let classes = "px-4 py-2 rounded cursor-pointer";
          if (val === activeTab) {
            classes += " bg-gray-300";
          }
          return (
            <p key={idx} className={classes} onClick={() => toggleTab(val)}>
              {val.charAt(0).toLocaleUpperCase() + val.substring(1)}
            </p>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <Mask />
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile image={user.photo} />}
        headerText="Profile"
        pageTitle="My profile"
      >
        <div className="space-y-4 py-4 relative">
          <IoChevronBack
            onClick={() => router.back()}
            className="cursor-pointer text-dark-default text-lg lg:text-2xl"
          />

          <div className="flex flex-col justify-center space-y-4">
            <div className="gap-2 self-center flex flex-col items-center">
              <NavbarProfile image={profile} />
              <p className="text-sm text-medium text-dark-default">
                Stephen King
              </p>
              <p className="text-xs text-dark-default/80">@{user.username}</p>
            </div>
            <div className="flex max-w-lg self-center justify-between gap-12 px-6">
              <div className="flex gap-4 flex-col items-center">
                <p>Followers</p>
                <p className="text-sm text-dark-default/80">
                  {user.followers.length}
                </p>
              </div>
              <div className="flex gap-4 flex-col items-center">
                <p>Following</p>
                <p className="text-sm text-dark-default/80">
                  {user.following.length}
                </p>
              </div>
            </div>
            <p className="max-w-sm self-center text-justify text-dark-default/90 text-sm text-dark">
              {user.bio}
            </p>
          </div>
          <TopTab />
          {activeTab === "posts" ? (
            <div>
              <div className="grid grid-cols-2 gap-2 lg:gap-4 lg:grid-cols-4">
                {user.posts.map((val) => {
                  return (
                    <Image
                      width="500"
                      height="300"
                      src={val.content.images[0]}
                    />
                  );
                })}
                {posts.length === 0 ? (
                  <h1 className="text-center">You have no posts</h1>
                ) : null}
              </div>
            </div>
          ) : null}
          {activeTab === "catalogues" ? (
            <h1 className="text-center ">Coming Soon !!!</h1>
          ) : null}
        </div>
      </NavbarTemplate>
    </>
  );
}

export default UserDetails;
