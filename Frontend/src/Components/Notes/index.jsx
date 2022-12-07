import React from "react";
import { AiTwotoneDelete, AiOutlineExclamationCircle } from "react-icons/ai";
import './notes.css'
import './priority.css'

const Notes = ({ data }) => {
  return (
    <div>
      <li className={data.priority ? "notepad-infos-priority" : "notepad-infos"}>
        <div>
          <strong>{data.title}</strong>
          <div className="trash"><AiTwotoneDelete size="20" /></div>
        </div>

        <textarea defaultValue={data.notes}></textarea>
        <span><AiOutlineExclamationCircle size="20" /></span>
      </li>
    </div>
  );
};

export default Notes;
