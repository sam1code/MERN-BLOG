import Footer from "./components/Atom/Footer";
import TopMenu from "./components/Atom/TopMenu";
import { AddPost, PostGrid, PostPage, NotFound } from "./components/Molecule";
import { Route, Routes } from "react-router-dom";
import { ReactElement } from "react";

export const App = (): ReactElement => {
  console.log = function() {}
  return (
    <div>
      <TopMenu />
      <Routes>
        <Route path="/" element={<PostGrid />} />

        <Route path="/:id" element={<PostPage />} />

        <Route path="/post/new" element={<AddPost />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};
