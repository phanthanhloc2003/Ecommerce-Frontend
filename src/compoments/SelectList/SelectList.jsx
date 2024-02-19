
import React from "react";
import PageButton from "../PageButton/PageButton";

const SelectList = ({ pages, onSelect }) => {
  return (
    <div className="select-list">
      <h3>Select a page</h3>
      <ul>
        {pages.map((page) => (
          <PageButton key={page.link} page={page} onSelect={onSelect} />
        ))}
      </ul>
    </div>
  );
};

export default SelectList;
