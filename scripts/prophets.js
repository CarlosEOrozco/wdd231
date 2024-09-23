// URL to the JSON data
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

// Select the div where cards will be added
const cards = document.querySelector('#cards');

// Function to fetch prophet data
async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  displayProphets(data.prophets);
}

// Function to create and display prophet cards
const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create a card section
    const card = document.createElement('section');
    card.classList.add('card');

    // Create fullName element
    const fullName = document.createElement('h2');
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // Create img element for the portrait
    const portrait = document.createElement('img');
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '200');
    portrait.setAttribute('height', '260');

    // Create elements for birth details
    const birthDate = document.createElement('p');
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;

    const birthPlace = document.createElement('p');
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

    // Append elements to the card
    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);

    // Append card to the cards div
    cards.appendChild(card);
  });
};

// Call the function to fetch and display data
getProphetData();
