import React, { useState, useEffect } from "react";

import api from './services/api';

import "./App.css";
import "./global.css";
import "./sidebar.css";
import "./main.css";

import Notes from "./Components/Notes/index";
import ColorRadioButtons from "./Components/RadioButton";

function App() {

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [selectedValue, setSelectedValue] = useState('all')


  const getAllNotes = async () =>{
    const response = await api.get('/annotations');
    setAllNotes(response.data)
  } 

  useEffect(() => {
    getAllNotes();
  },[]);

   const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await api.post('/annotations', {
      title,
      notes,
      priority:false
    })

    setTitle('');
    setNotes('');

    if(selectedValue !== 'all'){
      getAllNotes();
    }else{
      setAllNotes([...allNotes, response.data])
    }

    setSelectedValue('all');

  };

  useEffect(() =>{
    const enableSubmitButton = () => {
      let btn = document.getElementById("btnSubmit");
      btn.style.background = '#ffd3ca';
      if(title && notes){
        btn.style.background = '#eb8f7a'
      }
    }
    enableSubmitButton();
  }, [title,notes]);

  // Deletar nota
  const handleDelete = async (id) => {
    const deletedNote = await api.delete(`/annotations/${id}`);

    // se o id das notas forem diferente do id-excluido, entao retorna a nota
    if(deletedNote){
      setAllNotes(allNotes.filter(note => note._id !== id));
    }
  }

  const changePriority = async (id) => {
    const changedPriority = await api.post(`/priorities/${id}`);

    if(changedPriority && selectedValue !== 'all'){
      loadNotes(selectedValue);
    } else if(changedPriority){
      getAllNotes();
    }
  }

  const loadNotes = async (option) =>{
    const params = {priority:option};
    const response = await api.get('/priorities', {params});

    if(response){
      setAllNotes(response.data);
    }
  }

  const handleChange = async (e) => {
    setSelectedValue(e.value);

    if(e.checked && e.value !== 'all'){
      loadNotes(e.value);
    }else{
      getAllNotes();
    }
  }

  return (
    <div className="App">
      <aside>
        <strong>Note App</strong>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="title">Title</label>
            <input value={title} required maxLength={50} onChange={e => setTitle(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="nota">Annotation</label>
            <textarea value={notes} required onChange={e => setNotes(e.target.value)} />
          </div>

          <button type="submit" id="btnSubmit">Save</button>
        </form>

        <ColorRadioButtons
          selectedValor={selectedValue}
          switchChange={handleChange}
        />

      </aside>
      <main>
        <ul>
          {allNotes.map(data => (
             <Notes key={data._id} data={data} handleDelete={handleDelete} handlePriority={changePriority}/>
          ))}
          
        </ul>
      </main>
    </div>
  );
}

export default App;
