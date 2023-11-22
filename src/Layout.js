import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Outlet />
      <Link to="/ref">Ref</Link>
      <div></div>
      <Link to="/ex">Example</Link>
      <div>    <Link to="/ref1117">Ref1117</Link></div>
    </>
  );
};

export default Layout;
