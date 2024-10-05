// Load Members Data from JSON and display
async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        const memberContainer = document.getElementById('member-container');

        // Filter and shuffle gold/silver members
        const goldAndSilver = members.filter(member => member.level === "Gold" || member.level === "Silver");
        const shuffledMembers = goldAndSilver.sort(() => 0.5 - Math.random()).slice(0, 3);

        // Display shuffled members
        shuffledMembers.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');

            // Add member image
            const img = document.createElement('img');
            img.src = member.image;
            img.alt = `${member.name} logo`;
            memberCard.appendChild(img);

            // Add member details
            const memberDetails = document.createElement('div');
            const name = document.createElement('h3');
            name.textContent = member.name;
            const address = document.createElement('p');
            address.textContent = `Address: ${member.address}`;
            const phone = document.createElement('p');
            phone.textContent = `Phone: ${member.phone}`;
            const website = document.createElement('a');
            website.href = member.website;
            website.textContent = member.website;
            website.target = "_blank";

            // Append details to card
            memberDetails.appendChild(name);
            memberDetails.appendChild(address);
            memberDetails.appendChild(phone);
            memberDetails.appendChild(website);
            memberCard.appendChild(memberDetails);

            // Append card to container
            memberContainer.appendChild(memberCard);
        });
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

// Display current year and last modified date in footer
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Load members when page loads
loadMembers();
