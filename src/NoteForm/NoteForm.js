import React, { Component } from 'react';
import './NoteForm.css';

class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newNoteContent: '',
        };
        this.writeNote = this.writeNote.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(e) {
        this.setState({
            newNoteContent: e.target.value, //value of text input
        })
    }

    writeNote() {

        this.props.addNote(this.state.newNoteContent);
        this.setState({
            newNoteContent: '',
        });
    }
    render() {
        return (
            <div className="formWrapper">
                <input className="noteInput"
                    placeholder="Add a new game..."
                    value={this.state.newNoteContent}
                    onChange={this.handleUserInput} />
                <button className="noteButton"
                    onClick={this.writeNote}>Add</button>
            </div>
        )
    }
}

export default NoteForm;
