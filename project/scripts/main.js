const apiKey = 'd81c0010b9184ff3970de34048e71ef5'; // Asegúrate de que tu API Key es válida
const apiUrl = 'https://api.football-data.org/v4/competitions/PL/standings'; // URL de la API

async function fetchPremierLeagueStandings() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-Auth-Token': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching standings: ' + response.statusText);
        }

        const data = await response.json();
        console.log(data); // Verifica que obtienes los datos

        const standingsDiv = document.getElementById('standings');
        data.standings[0].table.forEach(team => {
            const teamRow = document.createElement('div');
            teamRow.innerHTML = `
                <h3>${team.position}. ${team.team.name} - ${team.points} puntos</h3>
                <p>J: ${team.playedGames} | G: ${team.won} | E: ${team.draw} | P: ${team.lost}</p>
            `;
            standingsDiv.appendChild(teamRow);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchPremierLeagueStandings);
