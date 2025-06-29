//notes  array
let notes = [];

//currently editing note ID
let editingNotesId = null;

//random color for each notes
function getRandomColor() {

    const colors = ['#f9c2ff', '#ffd699', '#d0f4de', '#caffbf', '#a0c4ff', '#bdb2ff', '#fffffc'];

    return colors[Math.floor(Math.random() * colors.length)];
}

//add or update note
function addNote() {
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if(title === "" && content === "") return;

    if(editingNotesId !== null){
        const note = notes.find(n => n.id === editingNotesId);
        note.title = title;
        note.content = content;
        editingNotesId = null;
    }
    else {
        const note = {
            id:Date.now(),
            title,
            content,
            color: getRandomColor()
        };
        notes.push(note);
    }

    saveNotes();
    renderNotes();

    titleInput.value = "";
    contentInput.value = "";

}

//delete note

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    saveNotes();
    renderNotes();
}

//edit note

function editNote(id) {
    const note = notes.find(note => note.id === id);
    document.getElementById("title").value = note.title;

    document.getElementById("content").value = note.content;
    editingNotesId = id;
}

//save notes to local storage

function saveNotes() {
    localStorage.setItem("notes",JSON.stringify(notes));
}

//render notes 

function renderNotes() {
    const container = document.getElementById("notesContainer");

    container.innerHTML = "";

    notes.forEach(note => {
        const noteEl = document.createElement("div");
        noteEl.className = "note-card";
        noteEl.style.backgroundColor = note.color;

        noteEl.innerHTML = `
            <i class="fas fa-trash"
            onclick="deleteNote(${note.id})"></i>
            <i class="fas fa-pen"
            onclick="editNote(${note.id})"></i>
            <h3>${note.title}</h3>
            <p>${note.content}</p>`;

            container.appendChild(noteEl);
    });
    
}

//load notes from local storage

function loadNotes() {
    const saved = localStorage.getItem("notes");

    if(saved){
        notes = JSON.parse(saved);
        renderNotes();
    }
}

window.onload = loadNotes;