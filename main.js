const notes = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'];
let tempNotes = [...notes];
let addNote;

function setNote() {
    // APPARENTLY Math.random() is [0,1) so no need to clamp!!!!!!!!
    const noteIndex = Math.floor(Math.random() * (tempNotes.length))
    const note = tempNotes[noteIndex];

    tempNotes.splice(noteIndex, 1);

    if (tempNotes.length === 0) {
        tempNotes = [...notes];

        // ensures that the same note is not repeated twice
        tempNotes = tempNotes.filter(note1 => note1 !== note);
        addNote = note;
    }

    if (addNote) {
        tempNotes.push(addNote);
        addNote = undefined;
    }

    document.getElementById('note').textContent = note;
}

window.addEventListener('load', setNote)
document.addEventListener('click', setNote)

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') setNote();
})