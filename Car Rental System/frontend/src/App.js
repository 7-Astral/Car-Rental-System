import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AddCar from "./pages/AddCar";
import DeleteCar from "./pages/DeleteCar";
import EditCar from "./pages/EditCar";
import ListCar from "./pages/ListCar";
import Cars from "./pages/Cars";
import Error from "./pages/Error";
import Contactus from "./pages/Contactus";
import Car from "./pages/Car";
import Rents from "./pages/Rents";
import ListRent from "./pages/ListRent";

import ProtectedRoute from "./pages/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="cars" element={<Cars />} />
          <Route path="car/:id" element={<Car />} />
          <Route path="bookings" element={<Rents />} />
          <Route path="contactus" element={<Contactus />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="admin" element={<Admin />} />
          <Route path="admin/addcar" element={<AddCar />} />
          <Route path="admin/deletecar" element={<DeleteCar />} />
          <Route path="admin/editcar" element={<EditCar />} />
          <Route path="admin/list" element={<ListCar />} />
          <Route path="admin/listrent" element={<ListRent />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
