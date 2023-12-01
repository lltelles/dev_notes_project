// elementos
const notesContainer = document.querySelector("#notes-container");
const noteInput = document.querySelector("#note-content");
const addNoteBtn = document.querySelector(".add-note");

// funcoes
function showNotes() {
    getNotes().forEach((note) => {
        const noteElement = createNote(note.id, note.content, note.fixed)

        notesContainer.appendChild(noteElement)
    })
}


function addNote() {
const notes = getNotes()

  const noteObject = {
    id: generateId(),
    content: noteInput.value,
    fixed: false,
  };
  const noteElement = createNote(noteObject.id, noteObject.content);

  notesContainer.appendChild(noteElement)

  notes.push(noteObject)

  saveNotes(notes)

  noteInput.value = ""
}

function generateId() {
  return Math.floor(Math.random() * 5000);
}

function createNote(id, content, fixed){
    // create div
    const element = document.createElement("div")
    // add class to the div
    element.classList.add('note')

    // create textarea
    const textarea = document.createElement('textarea')
    // pass content to textarea
    textarea.value = content

    // add placeholder
    textarea.placeholder = "Adicione algum elemento..."

    // add textarea to the div
    element.appendChild(textarea)

    return element
}

// Local Storage
function getNotes(){
    const notes = JSON.parse(localStorage.getItem('notes') || "[]")

    return notes
}

function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// eventos
addNoteBtn.addEventListener("click", () => addNote());

// inicializacao
showNotes()
