import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

// common
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Pages
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import VerifyEmail from "./Pages/VerifyEmail";
import { SidebarDemo } from "./Pages/Dashboard";
import { Error } from "./Pages/Error";

// auth
import OpenRoute from "./components/core/auth/OpenRoute";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import CheckOut from "./Pages/CheckOut";

// Dashboard
import Settings from "./components/core/Dashboard/Settings";
import OrderHistory from "./components/core/Dashboard/OrderHistory";
import PosterDetails from "./Pages/PosterDetails";

function App() {
  const location = useLocation();

  // Specify the paths where the Navbar should be hidden
  const hideNavbarPaths = [
    "/login",
    "/signup",
    "/verify-email",
    "/authentication",
  ];
  const hideFooterPaths = ["/login", "/signup", "/verify-email"];

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <div className="flex flex-col">
      {/* Conditionally render Navbar */}
      {!shouldHideNavbar && (
        <div>
          <Navbar />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/poster/:id" element={<PosterDetails />} />

        {/* Open Route - for Only Non Logged in User */}
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        {/* Private Route - for Only Logged in User */}
        <Route
          element={
            <PrivateRoute>
              <SidebarDemo />
            </PrivateRoute>
          }
        >
          {/* Route for all users */}
          <Route path="dashboard/Settings" element={<Settings />} />
          <Route path="dashboard/order-history" element={<OrderHistory />} />
        </Route>

        <Route
          path="checkout"
          element={
            <PrivateRoute>
              <CheckOut />
            </PrivateRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<Error />} />
      </Routes>

      {/* Conditionally render Footer */}
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

export default App;
