const apiKey = 'd81c0010b9184ff3970de34048e71ef5';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Proxy de CORS
const apiUrl = 'https://api.football-data.org/v4/competitions/PL/standings';

async function fetchPremierLeagueStandings() {
    try {
        const response = await fetch(proxyUrl + apiUrl, {
            headers: {
                'X-Auth-Token': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching standings: ' + response.statusText);
        }

        const data = await response.json();
        console.log(data);

        const standingsTableBody = document.getElementById('standings');
        standingsTableBody.innerHTML = '';

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

document.addEventListener('DOMContentLoaded', fetchPremierLeagueStandings);
