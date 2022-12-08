import React, {useState} from "react";
import api from '../../services/api';
import { AiTwotoneDelete, AiOutlineExclamationCircle } from "react-icons/ai";
import './notes.css'
import './priority.css'

const Notes = ({ data, handleDelete, handlePriority }) => {
  const [changedNote, setChangedNote] = useState('');

  const handleSave = async (e, notes) => {
    if(changedNote && changedNote !== notes){
      await api.post(`contents/${data._id}`,{
        notes: changedNote
      });
    }

    // cursor normal
    e.style.cursor = 'default';
    e.style.boxShadow = 'none'
  }

  const handleEdit = async (e,priority) => {
    e.style.cursor = 'text';
    e.style.borderRadius = '5px';

    if(priority){
      e.style.boxShadow = '0 0 5px white';
    }else{
      e.style.boxShadow = '0 0 5px gray';
    }
  }

  return (
    <div>
      <li className={data.priority ? "notepad-infos-priority" : "notepad-infos"}>
        <div>
          <strong>{data.title}</strong>
          <div className="trash"><AiTwotoneDelete size="20" onClick={() => handleDelete(data._id)} /></div>
        </div>

        <textarea 
          defaultValue={data.notes}
          onClick={e => handleEdit(e.target, data.priority)}
          onChange={e => setChangedNote(e.target.value)}
          //desfoca do card
          onBlur={e => handleSave(e.target, data.notes)}
        />
        <span><AiOutlineExclamationCircle size="20" onClick={() => handlePriority(data._id)} /></span>
      </li>
    </div>
  );
};

export default Notes;
