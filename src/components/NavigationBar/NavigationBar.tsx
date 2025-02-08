import { NavLink, useLocation } from "react-router-dom";
import paths from "../../Paths/paths";

const NavigationBar = (): React.ReactElement => {
  const { pathname } = useLocation();
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            className={
              pathname === paths.inicio
                ? "navigation-active"
                : "navigation-inactive"
            }
            to="/consulta-el-tiempo"
          >
            Busca el tiempo
          </NavLink>
        </li>
        <li>
          <NavLink
            className={
              pathname === paths.consultasRealizadas
                ? "navigation-active"
                : "navigation-inactive"
            }
            to="/consultas-realizadas"
          >
            Consultas realizadas
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
