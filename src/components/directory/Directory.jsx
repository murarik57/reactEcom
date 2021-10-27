import React from "react";
import "./directory.scss";
import MenuItem from "../menu-item/MenuItem";
import { connect } from "react-redux";

const Directory = ({ sections }) => {
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherProps }) => (
        <MenuItem key={id} {...otherProps} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ directory: { sections } }) => ({
  sections,
});

export default connect(mapStateToProps)(Directory);
