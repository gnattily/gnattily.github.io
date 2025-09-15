const notes = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'];
let tempNotes = [...notes];
let addNote;
let count = 0;

let bpm = 100;

function setNote() {
    document.getElementById('completion').style.width = `${tempNotes.length/12 * 100}%`;

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
    document.getElementById('count').textContent = count++ + ' notes';
}

document.addEventListener('click', setNote)

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') setNote(); 
    if (e.code === 'Enter') togglePlayer();
})

const slider = document.getElementById('bpm-slider');

window.onload = () => {
    setNote();

    // fixes the slider visually being different than the actual value on reload
    const event = new Event('input');
    slider.dispatchEvent(event);
}

slider.addEventListener("input", () => {
    bpm = slider.value;
    document.getElementById('bpm').textContent = bpm + 'bpm'
})

slider.addEventListener("click", (e) => {
    e.stopPropagation();
})

let intervalId;
let playing = false;

slider.addEventListener("mouseup", () => {
    if (!playing) return;

    clearInterval(intervalId);

    intervalId = setInterval(() => {
        setNote();
    }, 60/bpm * 1000)
})

function togglePlayer () {
    if (playing) stopPlayer();
    else startPlayer();
}

function startPlayer (e) {
    playing = true

    intervalId = setInterval(() => {
        setNote();
    }, 60/bpm * 1000);

    e?.stopPropagation();

    document.getElementById('play').classList.add('hidden');
    document.getElementById('pause').classList.remove('hidden');
}

function stopPlayer (e) {
    playing = false;

    clearInterval(intervalId);

    e?.stopPropagation();

    document.getElementById('play').classList.remove('hidden');
    document.getElementById('pause').classList.add('hidden');
}

const range = document.querySelector('input[type="range"]');
range.addEventListener('input', () => {
  const percent = ((range.value - range.min) / (range.max - range.min)) * 100;
  range.style.setProperty('--x', percent + '%');
});
