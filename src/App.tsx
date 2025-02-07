import { lazy, Suspense } from "react";

import "./App.css";

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { GlobalProvider } from "./Context/GlobalContext";
import SpinnerLoader from "./components/Spinner/Spinner";
const MyFavFood = lazy(() => import("./pages/MyFav/MyFavFood"));
const Login = lazy(() => import("./pages/Login/Login"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const Home = lazy(() => import("./pages/Home/Home"));
const Profile = lazy(() => import("./pages/ProfilePage/Profile"));
const CreateFood = lazy(() => import("./pages/CreateFood/CreateFood"));
const FoodTable = lazy(() => import("./pages/TablePage/TablePage"));

const SingleFood = lazy(() => import("./pages/SingleFood/SingleFood"));
function App() {
  return (
    <>
    <GlobalProvider>
      <Suspense fallback={<SpinnerLoader/>}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login/>}></Route>
   
            <Route path="/register" element={<SignUp />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            
            <Route path="/table" element={<FoodTable />}></Route>
            
            <Route path="/single-food/:id" element={<SingleFood />}></Route>
            <Route path="/create-food" element={<CreateFood />}></Route>
            
            <Route path="/my-food" element={<MyFavFood />}></Route>
            
          </Route>
        </Routes>
      </Suspense>
    </GlobalProvider>
    </>
  );
}

export default App;
