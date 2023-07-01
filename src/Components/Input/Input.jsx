import { useState, useEffect, useCallback } from "react";
import NotesGrid from "../NotesGrid/NotesGrid";
import "./Input.css";
const Input = () => {
  const [notes, setNotes] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const userNotes = JSON.parse(localStorage.getItem("notes"));
    if (userNotes) {
      setNotes(userNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsExpanded(false);

    const formData = new FormData(e.currentTarget);
    const newNote = Object.fromEntries(formData);

    setNotes((currentNotes) => {
      const date = new Date().toLocaleDateString();
      const finalNote = { ...newNote, date };
      return [...currentNotes, finalNote];
    });
    e.currentTarget.reset();
  };

  const handleDelete = (index) => {
    setNotes((currentNotes) => {
      const newNotes = [...currentNotes];
      newNotes.splice(index, 1);
      return newNotes;
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        {isExpanded && (
          <input type="text" placeholder="Title" name="title" id="title" />
        )}
        <textarea
          onClick={() => setIsExpanded(true)}
          name="note"
          id="note"
          rows="4"
          placeholder="Take a note..."
        />
        <button type="submit" className="submit-btn">
          +
        </button>
      </form>
      {notes.length === 0 ? null : (
        <NotesGrid notes={notes} delete={handleDelete} />
      )}
    </>
  );
};
export default Input;