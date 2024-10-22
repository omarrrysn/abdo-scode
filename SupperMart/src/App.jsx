import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Loader from "./common/Loader";
import PageTitle from "./components/adminComponents/PageTitle";

import FormElement from "./pages/Form/FormElements";
import FormLayout from "./pages/Form/FormLayout";

import DefaultLayout from "./common/layout/DefaultLayout";
import Alerts from "./pages/UiElements/Alerts";
import Buttons from "./pages/UiElements/Buttons";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";

import Overview from "./pages/Dashboard/Manager/Overview";
import Products from "./pages/Dashboard/Manager/Products";
import ManageStores from "./pages/Dashboard/Manager/ManageStores";
import CashierPage from "./pages/Dashboard/Cashier/CashierPage";

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
  <CashierPage/>
  );
}

export default App;
