import React from "react";
import UploadButton from "./nav-items/UploadButton";
import WorkspaceMenu from "./nav-items/WorkspaceMenu";
import ProfileSettings from "./nav-items/ProfileSettings";
/**
 * Navbar component that provides a navigation bar with upload button, workspace selection dropdown, and user avatar.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar = ({ onUpload, setUserID }) => {
  return (
    <nav className="navbar">
      <div className="flex flex-row justify-between w-full">
        <UploadButton onUpload={onUpload} />
        <WorkspaceMenu />
        <ProfileSettings setUserID={setUserID} />
      </div>
    </nav>
  );
};

export default Navbar;
