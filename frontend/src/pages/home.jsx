import ScrollCard from "../components/scrollCard";

import Post from "../components/post";

import NavbarTemplate from "../templates/template_with_navbar";

export default function Home() {
  return (
    <>
      <NavbarTemplate>
        <div>
          <div className="mt-20 lg:mt-0">
            <h3 className="text-subheading mt-3">Trending catalogues</h3>
            <ScrollCard />
          </div>
          <div className="space-y-4">
            <Post />
            <Post />
          </div>
        </div>
      </NavbarTemplate>
    </>
  );
}
