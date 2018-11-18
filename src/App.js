import React, { Component } from 'react';

import './App.css';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class App extends Component {
  addNote = this.addNote.bind(this);
  removeNote = this.removeNote.bind(this);
  app = firebase.initializeApp(DB_CONFIG);
  database = this.app.database().ref().child('notes');
  state = {
    notes: [],
  }

  componentWillMount() {
    const previousNotes = this.state.notes;


    // DataSnapshot
    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      })

      this.setState({
        notes: previousNotes
      })
    })
    this.database.on('child_removed', snap => {
      for (var i = 0; i < previousNotes.length; i++) {
        if (previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      })
    })
  }


  addNote(note) {
    this.database.push().set({ noteContent: note });
  }

  removeNote(noteId) {
    this.database.child(noteId).remove();
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">
          <FontAwesomeIcon icon={faGamepad} className="controller" />
            The Backlog
             </div>
        </div>
        <div className="noteAdd">
          <NoteForm addNote={this.addNote} />
        </div>
        <div>
          {
            this.state.notes.map((note) => {
              return (
                <Note noteContent={note.noteContent} noteId={note.id} key={note.id} removeNote={this.removeNote} />
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
