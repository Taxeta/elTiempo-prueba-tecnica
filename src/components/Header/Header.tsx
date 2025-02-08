import NavigationBar from "../NavigationBar/NavigationBar";
import "./Header.css";

const Header = (): React.ReactElement => {
  return (
    <div className="header_container">
      <img src="./favicon.png" alt="" />
      <NavigationBar />
    </div>
  );
};

export default Header;
