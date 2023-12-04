// elementos
const notesContainer = document.querySelector("#notes-container");
const noteInput = document.querySelector("#note-content");
const addNoteBtn = document.querySelector(".add-note");

// funcoes
function showNotes() {
  const notes = getNotes();

  if (notes.length > 0) {
    cleanNotes();
  }

  notes.forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content, note.fixed);

    appendNoteElement(noteElement);
  });
}

function createNoteElement(id, content, fixed) {
  // create note element logic
}

function appendNoteElement(noteElement) {
  notesContainer.appendChild(noteElement);
}


function cleanNotes() {
  notesContainer.replaceChildren([]);
}

function addNote() {
  try {
    const notes = getNotes();

    if (noteInput.value !== "") {
      const noteObject = {
        id: generateId(),
        content: noteInput.value,
        fixed: false,
      };
      const noteElement = createNote(noteObject.id, noteObject.content);

      notesContainer.insertAdjacentElement('beforeend', noteElement);

      notes.push(noteObject);

      saveNotes(notes);

      noteInput.value = "";

      showMessage("Note added successfully");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle the error and provide a fallback
  }
}

function generateId() {
  return Math.floor(Math.random() * 5000);
}

function createNote(id, content, fixed) {
  // create div
  const element = document.createElement("div");
  // add class to the div
  element.classList.add("note");

  // create textarea
  const textarea = document.createElement("textarea");
  // pass content to textarea
  textarea.value = content;

  // add placeholder
  textarea.placeholder = "Adicione algum elemento...";

  // add textarea to the div
  element.appendChild(textarea);

  const pinIcon = document.createElement("i");
  pinIcon.classList.add(...["bi", "bi-pin"]);
  element.appendChild(pinIcon);

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add(...["bi", "bi-x-lg"]);
  element.appendChild(deleteIcon);

 

  if (fixed) {
    element.classList.add("fixed");
  }

  // eventos do elemento
  element.querySelector(".bi-pin").addEventListener("click", () => {
    toggleFixeNote(id);
  });

  element.querySelector(".bi-x-lg").addEventListener("click", () => {
    deleteNote(id, element);
  });

 

  return element;
}

function toggleFixeNote(id) {
  const notes = getNotes();

  const targetNotes = notes.filter((note) => note.id === id)[0];

  targetNotes.fixed = !targetNotes.fixed;

  saveNotes(notes);

  showNotes();
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id !== id);

  saveNotes(notes);

  notesContainer.removeChild(element);
}


// Local Storage
function getNotes() {
    const notesString = localStorage.getItem('notes');
    let notes = [];
  
    if (notesString) {
      try {
        notes = JSON.parse(notesString);
      } catch (error) {
        console.error('Error parsing notes JSON:', error);
      }
    }
  
    return notes;
  }

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// eventos
addNoteBtn.addEventListener("click", () => addNote());

// inicializacao
showNotes();
