import { Route, Routes } from "react-router-dom";
import Article from "../../pages/Article/Article";
import ArticleList from "../../pages/Article/ArticleList";
import Login from "../../pages/Auth/Login";
import Logout from "../../pages/Auth/Logout";
import Register from "../../pages/Auth/Register";
import Home from "../../pages/Home";
import Feed from "../../pages/Preferences/Feed";
import Preferences from "../../pages/Preferences/Preferences";
import NotFound from "../Common/NotFound";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/articles" element={<ArticleList />} />
      <Route path="/articles/:id" element={<Article />} />
      <Route path="/feeds" element={<Feed />} />
      <Route path="/preferences" element={<Preferences />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
