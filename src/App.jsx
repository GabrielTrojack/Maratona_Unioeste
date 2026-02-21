import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import FullScreenLoader from "./components/FullScreenLoader/FullScreenLoader.jsx";
import NavBar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

const Material = lazy(() => import("./pages/Materials/MaterialPage"));
const Login = lazy(() => import("./pages/AdmLogin/AdmLogin"));
const Lesson = lazy(() => import("./pages/Lesson/LessonPage"));
const Landing = lazy(() => import("./pages/LandingPage/LandingPage"));
const MaterialForm = lazy(() => import("./pages/MaterialForms/MaterialForm"));
const Class = lazy(() => import("./pages/classSignup/ClassSignup.jsx"));
const ClassRegister = lazy(() => import("./pages/classRegistration/ClassRegistration.jsx"));
const Mural = lazy(() => import("./pages/Mural/MuralPage"));
const Post = lazy(() => import("./pages/Post/PostPage"));

const Contests = lazy(() => import("./pages/ContestPage/ContestPage.jsx"));
const ContestSignup = lazy(() => import("./pages/ContestSignup/ContestSignup.jsx"));
const ContestForm = lazy(() => import("./pages/ContestForm/ContestForm.jsx"));

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<FullScreenLoader />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/postagem" element={<Post />} />
            <Route path="/materials" element={<Material />} />
            <Route path="/materials/new" element={<MaterialForm />} />
            <Route path="/mural" element={<Mural />} />
            <Route path="materials/lesson/:id" element={<Lesson />} />
            <Route path="/class" element={<Class />} />
            <Route path="/classRegister" element={<ClassRegister />} />

            <Route path="/contests" element={<Contests />} />
            <Route path="/Contests/form" element={<ContestSignup />} />
            <Route path="/Contests/handle" element={<ContestForm />} />

          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;