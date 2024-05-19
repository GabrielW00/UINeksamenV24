import React from "react";
import NavBar from "./NavBar";
import PropTypes from "prop-types";

import BackgroundImage from "../../components/ui/BackgroundImage";
/*Layout children med med utforming av siden*/ 
function Layout({ children, onSearch }) {
  return (
    <div className="bg-gray-100 w-full min-h-screen">
      <NavBar onSearch={onSearch} />
      <main className="mx-auto my-12 w-100">
        <BackgroundImage>{children}</BackgroundImage>
      </main>
    </div>
  );
}
 
Layout.propTypes = {
  children: PropTypes.node,
  onSearch: PropTypes.func,
};

export default Layout;
