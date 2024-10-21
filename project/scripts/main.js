const apiKey = 'd81c0010b9184ff3970de34048e71ef5';

async function fetchPremierLeagueStandings() {
    const apiUrl = 'https://api.football-data.org/v4/competitions/PL/standings'; // URL de la API

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

        // Aquí puedes agregar lógica para mostrar la tabla en el HTML
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

// Asegúrate de que se llama a esta función al cargar la página
document.addEventListener('DOMContentLoaded', fetchPremierLeagueStandings);

