import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation,matchPath } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./layout";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Write from "./pages/write";
import Singup from "./pages/singup";
import Login from "./pages/login";
import PublicRoute from "./publicRoute";
import PrivateRoute from "./privateRoute";
import BlogDetails from "./pages/BlogDetails";
import CategoryPage from "./pages/categoyPage";
import PrivacyPolicy from "./pages/privacy";
import TermsAndConditions from "./pages/termCond";
import MyBlogs from "./pages/myBlogs";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import BloggerDetail from "./pages/blogerDetail";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

// A component to conditionally wrap pages with Layout
const AppRoutes = () => {
  const location = useLocation();

  // Paths that should NOT use the Layout (no Header and Footer)
  const noLayoutPaths = ["/singup", "/login", "/write", "/blogger/:username","/privacy","/term"];

  const shouldUseLayout = !noLayoutPaths.some((path) =>
    matchPath(path, location.pathname)
  );

  return (
    <>
      {shouldUseLayout ? (
        <Layout>
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={500} // Transition duration
              classNames="fade"
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                

                {/* Protected Routes */}
                <Route
                  path="/contact"
                  element={
                    <PrivateRoute>
                      <Contact />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/blog/:id"
                  element={
                    <PrivateRoute>
                      <BlogDetails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/category/:categoryName"
                  element={
                    <PrivateRoute>
                      <CategoryPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/myblogs"
                  element={
                    <PrivateRoute>
                      <MyBlogs />
                    </PrivateRoute>
                  }
                />



              </Routes>
            </CSSTransition>
          </TransitionGroup>
        </Layout>
      ) : (
        <Routes location={location}>

          <Route path="/write" element={<Write />} />

             <Route
                  path="/blogger/:username"
                  element={<BloggerDetail/>}
                />

          <Route
            path="/singup"
            element={
              <PublicRoute>
                <Singup />
              </PublicRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/term" element={<TermsAndConditions />} />
        </Routes>

      )}
    </>
  );
};

export default App;
