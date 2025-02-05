import React from "react";

interface ListItemProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ text, isSelected, onClick }) => {
  return (
    <li
      className={`list-group-item mb-3 list-group-item-action dificulty-list-item ${
        isSelected ? "selected" : ""
      }`}
      onClick={onClick}
    >
      {text}
    </li>
  );
};

export default ListItem;
