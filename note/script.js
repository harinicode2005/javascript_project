let notes = JSON.parse(localStorage.getItem("notes")) || [];

const noteInput = document.getElementById("note-input");
const addBtn = document.getElementById("add-btn");
const notesContainer = document.getElementById("notes-container");
const search = document.getElementById("search");

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function displayNotes() {
    notesContainer.innerHTML = "";

    notes.forEach((note, index) => {
        const div = document.createElement("div");
        div.classList.add("note");

        div.innerHTML = `
            <p>${note.text}</p>
            <div class="actions">
                <button class="pin">Pin</button>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;

        // Pin
        div.querySelector(".pin").onclick = () => {
            let pinnedNote = notes.splice(index, 1)[0];
            notes.unshift(pinnedNote);
            saveNotes();
            displayNotes();
        };

        // Edit
        div.querySelector(".edit").onclick = () => {
            let newText = prompt("Edit your note:", note.text);
            if (newText !== null) {
                notes[index].text = newText;
                saveNotes();
                displayNotes();
            }
        };

        // Delete
        div.querySelector(".delete").onclick = () => {
            notes.splice(index, 1);
            saveNotes();
            displayNotes();
        };

        notesContainer.appendChild(div);
    });
}

addBtn.onclick = () => {
    if (noteInput.value.trim() === "") return alert("Please write a note!");

    notes.push({ text: noteInput.value });
    saveNotes();
    displayNotes();
    noteInput.value = "";
};

// Search notes
search.addEventListener("input", () => {
    const term = search.value.toLowerCase();
    const filtered = notes.filter(note => note.text.toLowerCase().includes(term));

    notesContainer.innerHTML = "";
    filtered.forEach(note => {
        const div = document.createElement("div");
        div.classList.add("note");
        div.innerHTML = `<p>${note.text}</p>`;
        notesContainer.appendChild(div);
    });
});

displayNotes();
