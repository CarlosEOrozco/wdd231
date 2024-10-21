const apiKey = 'd81c0010b9184ff3970de34048e71ef5';
const teamId = 86; // Reemplaza con el ID del equipo que quieras (por ejemplo, 86 para Real Madrid)
const teamMatchesURL = `https://api.football-data.org/v4/teams/${teamId}/matches`;

function fetchTeamMatches() {
    fetch(teamMatchesURL, {
        headers: { 'X-Auth-Token': apiKey }
    })
    .then(response => response.json())
    .then(data => {
        const matches = data.matches;
        let matchesHTML = '';

        if (matches.length === 0) {
            matchesHTML = '<p>No matches found for this team.</p>';
        } else {
            matches.forEach(match => {
                matchesHTML += `
                    <div class="match-card">
                        <h5>${match.homeTeam.name} vs ${match.awayTeam.name}</h5>
                        <p>Kick-off: ${new Date(match.date).toLocaleString()}</p>
                        <p>Status: ${match.status}</p>
                    </div>
                `;
            });
        }

        document.getElementById('team-matches').innerHTML = matchesHTML; // Asegúrate de tener un div con este ID
    })
    .catch(error => console.error('Error fetching team matches:', error));
}

document.addEventListener('DOMContentLoaded', fetchTeamMatches);

