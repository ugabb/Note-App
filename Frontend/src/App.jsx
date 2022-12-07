import React, { useState, useEffect } from "react";

import api from './services/api';

import "./App.css";
import "./global.css";
import "./sidebar.css";
import "./main.css";

import Notes from "./Components/Notes/index";
import RadioButton from "./Components/RadioButton";

function App() {

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    const getAllNotes = async () =>{
      const response = await api.get('/annotations');
      setAllNotes(response.data)
    } 
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

    setAllNotes([...allNotes, response.data])

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

  return (
    <div className="App">
      <aside>
        <strong>Caderno de Notas</strong>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="title">Título da Anotação</label>
            <input value={title} required maxLength={50} onChange={e => setTitle(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="nota">Anotações</label>
            <textarea value={notes} required onChange={e => setNotes(e.target.value)} />
          </div>

          <button type="submit" id="btnSubmit">Salvar</button>
        </form>

        <RadioButton />

      </aside>
      <main>
        <ul>
          {allNotes.map(data => (
             <Notes data={data} />
          ))}
          
        </ul>
      </main>
    </div>
  );
}

export default App;
