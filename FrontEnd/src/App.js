import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Pages/auth/main";
import MainAdmin from "./Pages/auth/admin/mainAdmin";
import LoginAdministrador from "./Pages/auth/Login/LoginAdministrador";
import LoginPortero from "./Pages/auth/Login/LoginPortero";
import LoginPropietario from "./Pages/auth/Login/LoginPropietario";
import MainPropietario from "./Pages/auth/propietario/mainPropietario";
import MainPortero from "./Pages/auth/portero/mainPortero.";
import RegisterPropietario from "./Pages/auth/Login/RegisterPropietario";
import InsertForm from "./Pages/auth/admin/insertForm";
function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          {/* <Route path="/" exact element={<Main />}></Route>
          <Route path="MainAdmin" exact element={<MainAdmin />}></Route>
          <Route
            path="LoginAdministrador"
            exact
            element={<LoginAdministrador />}
          ></Route>
          <Route path="LoginPortero" exact element={<LoginPortero />}></Route>
          <Route
            path="LoginPropietario"
            exact
            element={<LoginPropietario />}
          ></Route>
          <Route
            path="VistaPropietario"
            exact
            element={<VistaPropietario />}
          ></Route> */}
          <Route path="/" exact element={<Main />}></Route>
          <Route path="MainAdmin" exact element={<MainAdmin />}></Route>
          <Route path="MainPortero" exact element={<MainPortero />}></Route>
          <Route
            path="LoginAdministrador"
            exact
            element={<LoginAdministrador />}
          ></Route>
          <Route path="LoginPortero" exact element={<LoginPortero />}></Route>
          <Route
            path="RegisterPropieterio"
            exact
            element={<RegisterPropietario />}
          ></Route>
          <Route
            path="LoginPropietario"
            exact
            element={<LoginPropietario />}
          ></Route>
          <Route
            path="MainPropietario"
            exact
            element={<MainPropietario />}
          ></Route>
          <Route path="InsertForm" exact element={<InsertForm />}></Route>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
