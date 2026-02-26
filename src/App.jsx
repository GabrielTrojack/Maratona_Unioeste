import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";

import AdminRoute from "./auth/AdminRoute.jsx";
import FullScreenLoader from "./components/FullScreenLoader/FullScreenLoader.jsx";

import NavBar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

const Material = lazy(() => import("./pages/Materials/MaterialPage"));
const MaterialForm = lazy(() => import("./pages/MaterialForms/MaterialForm"));

const Login = lazy(() => import("./pages/AdmLogin/AdmLogin"));
const Lesson = lazy(() => import("./pages/Lesson/LessonPage"));
const Landing = lazy(() => import("./pages/LandingPage/LandingPage"));

const Class = lazy(() => import("./pages/classSignup/ClassSignup.jsx"));
const ClassRegister = lazy(() => import("./pages/classRegistration/ClassRegistration.jsx"));
const Mural = lazy(() => import("./pages/Mural/MuralPage"));
const Post = lazy(() => import("./pages/Post/PostPage"));

const Contests = lazy(() => import("./pages/ContestPage/ContestPage.jsx"));
const ContestSignup = lazy(() => import("./pages/ContestSignup/ContestSignup.jsx"));
const ContestForm = lazy(() => import("./pages/ContestForm/ContestForm.jsx"));
const ContestRegister = lazy(() => import("./pages/ContestRegister/ContestRegister.jsx"));

const NotFound = lazy(() => import("./pages/NotFound/NotFound.jsx"));

import { AuthProvider } from "./context/AuthContext";
import  AuthGate from "./auth/AuthGate.jsx";

function App() {
  return (
    <AuthProvider>
      <AuthGate>
        <BrowserRouter>
          <NavBar />
          <Suspense fallback={<FullScreenLoader />}>
            <Toaster />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />

              <Route path="/materials" element={<Material />} />
              <Route path="/materials/:id" element={<Lesson />} />

              <Route path="/class" element={<Class />} />

              <Route path="/contests" element={<Contests />} />
              <Route path="/contests/form/:id" element={<ContestSignup />} />

              <Route element={<AdminRoute />}>
                <Route path="/materials/new" element={<MaterialForm />} />
                <Route path="/materials/edit/:id" element={<MaterialForm />} />

                <Route path="/class/register" element={<ClassRegister />} />

                <Route path="/mural/post" element={<Post />} />
                <Route path="/mural" element={<Mural />} />

                <Route path="/contests/new" element={<ContestForm />} />
                <Route path="/contests/edit/:id" element={<ContestForm />} />
                <Route path="/contests/teams/:id" element={<ContestRegister />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </BrowserRouter>
      </AuthGate>
    </AuthProvider>
  );
}

export default App;