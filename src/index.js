// Your code here
document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "http://localhost:3000/characters";
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const nameDisplay = document.getElementById("name");
    const imageDisplay = document.getElementById("image");
    const voteCount = document.getElementById("vote-count");
    const voteForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");
    const characterForm = document.getElementById("character-form");
    const nameInput = document.getElementById("name");
    const imageUrlInput = document.getElementById("image-url");

// Fetch and display all characters in the character bar
fetch(baseURL)
    .then(response => response.json())
    .then(characters => {
        characters.forEach(character => displayCharacterName(character));
    });

function displayCharacterName(character) {
    const span = document.createElement("span");
    span.textContent = character.name;
    span.style.cursor = "pointer";
    span.addEventListener("click", () => displayCharacterDetails(character));
    characterBar.appendChild(span);
}

function displayCharacterDetails(character) {
    nameDisplay.textContent = character.name;
    imageDisplay.src = character.image;
    imageDisplay.alt = character.name;
    voteCount.textContent = character.votes;
    voteForm.dataset.id = character.id;
}

voteForm.addEventListener("submit", event => {
    event.preventDefault();
    const votesToAdd = parseInt(voteInput.value) || 0;
    const currentVotes = parseInt(voteCount.textContent);
    const newVotes = currentVotes + votesToAdd;
    voteCount.textContent = newVotes;
    voteInput.value = "";
});

resetButton.addEventListener("click", () => {
    voteCount.textContent = "0";
});

characterForm.addEventListener("submit", event => {
    event.preventDefault();
    const newCharacter = {
        name: nameInput.value,
        image: imageUrlInput.value,
        votes: 0
    };

    fetch(baseURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCharacter)
    })
    .then(response => response.json())
    .then(character => {
        displayCharacterName(character);
        displayCharacterDetails(character);
    });

    characterForm.reset();
});
});