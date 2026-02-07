import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Landing from "./pages/LandingPage/LandingPage";
import Login from "./pages/AdmLogin/AdmLogin";
import Material from "./pages/Materials/MaterialPage";
import MaterialForm from "./pages/MaterialForms/MaterialForm";
import Mural from "./pages/Mural/MuralPage";
import Lesson from "./pages/Lesson/LessonPage";
import Post from "./pages/Post/PostPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Post />} />
        <Route path="/materials" element={<Material />} />
        <Route path="/materials/new" element={<MaterialForm />} />
        <Route path="/mural" element={<Mural />} />
        <Route path="/lesson" element={<Lesson />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;