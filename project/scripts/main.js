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

        const standingsTableBody = document.getElementById('standings');
        standingsTableBody.innerHTML = ''; // Limpiar contenido previo

        data.standings[0].table.forEach(team => {
            const teamRow = document.createElement('tr');
            teamRow.innerHTML = `
                <td>${team.position}</td>
                <td>${team.team.name}</td>
                <td>${team.playedGames}</td>
                <td>${team.won}</td>
                <td>${team.draw}</td>
                <td>${team.lost}</td>
                <td>${team.points}</td>
            `;
            standingsTableBody.appendChild(teamRow);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

// Asegúrate de que se llama a esta función al cargar la página
document.addEventListener('DOMContentLoaded', fetchPremierLeagueStandings);
