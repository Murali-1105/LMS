import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Menu from '../components/Menubar.jsx';
import useAxios from '../../utils/useAxios.js';

const Notes = () => {
  const param = useParams();
  const api = useAxios();
  const [notes, setNotes] = useState([]);
  const [noteShow, setNoteShow] = useState(false);
  const [noteEdit, setNoteEdit] = useState(null);
   
  console.log(noteEdit)

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await api.get(`/user/subject/notes/${param.id}`); 
      setNotes(response.data.notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleNoteClose = () => {
    setNoteShow(false);
    setNoteEdit(null);
  };

  const handleNoteShow = (note = null) => {
    setNoteEdit(note);
    setNoteShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content } = e.target.elements; 

    try {
      if (noteEdit) { 
        await api.put(`/user/subject/editdelete/notes/${param.id}`, { id: noteEdit.id, title: title.value, content: content.value });
      } else {
        await api.post(`/user/subject/notes/${param.id}`, { title: title.value, content: content.value });
      }
      fetchNotes();
      handleNoteClose();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDelete = async (noteId) => { 
    try {
      await api.delete(`/user/subject/editdelete/notes/${param.id}`,{data: { id: noteId }}); 
    } catch (error) {
      fetchNotes();
      console.error('Error deleting note:', error);
    }
  };

  return (
    <section className='px-2 px-lg-5 py-2'>
      <div className="container-fluid my-4">
        <Menu id={param.id} progress={param.progress} title={param.title} />
        <div className="d-block">  
          <div className="d-flex justify-content-between pb-1">
             <h5 className="text-uppercase text-center">{param.title}</h5>
             <button type="button" className="btn btn-primary btn-sm" onClick={() => handleNoteShow()}><i class="bi bi-patch-plus-fill me-2"></i>Add Note</button> 
          </div>
          <div className='pt-4'>
            {notes.map(note => (
              <div key={note.id} className="card shadow-sm p-3 p-md-4 rounded-4 mb-3">
                <div className='card-title d-flex justify-content-between align-items-center mb-0'>
                  <h6 className='w-75'>{note.title}</h6>
                  <div className="hstack gap-3 flex-wrap" >
                    <a onClick={() => handleNoteShow(note)} className="btn btn-sm btn-outline-primary rounded-circle">
                      <i className="bi bi-pencil-square" />
                    </a>
                    <a onClick={() => handleDelete(note.id)} className="btn btn-sm btn-outline-danger rounded-circle">
                      <i className="bi bi-trash3"></i>
                    </a>
                  </div>
                </div>
                <div className='card-body p-1'>
                  <p>{note.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal show={noteShow} size='md' onHide={handleNoteClose} centered>
        <div className=''>
          <button className="btn btn-danger float-end close-btn" onClick={handleNoteClose}><i className="bi bi-x-lg fw-bolder"></i></button>
          <h2 className="fs-6 fw-bold mt-3 px-4 text-muted">{noteEdit ? `Edit Note: ${noteEdit.title}` : 'Add New Note'}</h2>
        </div>
        <Modal.Body>
          <div className='mx-2'>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="noteTitle" className="form-label">Note Title</label>
                <input defaultValue={noteEdit?.title || ''} name='title' type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="noteContent" className="form-label">Note Content</label>
                <textarea defaultValue={noteEdit?.notes || ''} name='content' className='form-control' cols="30" rows="10"></textarea>
              </div>
              <button type="submit" className="btn btn-primary float-end">Save</button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Notes;
