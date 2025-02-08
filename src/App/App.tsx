import { Suspense } from "react";
import HomePage from "../pages/HomePage/HomePage";
import paths from "../Paths/paths";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Header/Header";

const App = (): React.ReactElement => {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path={paths.root}
          element={<Navigate to={paths.inicio} />}
        ></Route>
        <Route
          path={paths.inicio}
          element={
            <Suspense>
              <HomePage />
            </Suspense>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
