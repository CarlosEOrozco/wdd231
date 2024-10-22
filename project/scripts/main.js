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

const apiUrlMatches = 'https://api.football-data.org/v4/competitions/PL/matches?status=SCHEDULED';

async function fetchPremierLeagueSchedules() {
    try {
        const response = await fetch(proxyUrl + apiUrlMatches, {
            headers: {
                'X-Auth-Token': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching schedules: ' + response.statusText);
        }

        const data = await response.json();
        console.log(data);

        const matchesContainer = document.getElementById('team-matches');
        matchesContainer.innerHTML = '';

        // Filtrar y mostrar solo los próximos 10 partidos
        const upcomingMatches = data.matches.slice(0, 10); // Limitar a 10 partidos

        upcomingMatches.forEach(match => {
            const matchCard = document.createElement('div');
            matchCard.classList.add('col-md-4', 'mb-4');

            const matchDate = new Date(match.utcDate).toLocaleString();
            const homeTeam = match.homeTeam.name;
            const awayTeam = match.awayTeam.name;

            matchCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${homeTeam} vs ${awayTeam}</h5>
                        <p class="card-text">Date: ${matchDate}</p>
                        <p class="card-text">Status: ${match.status}</p>
                    </div>
                </div>
            `;
            matchesContainer.appendChild(matchCard);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}


const apiUrlScores = 'https://api.football-data.org/v4/competitions/PL/matches?status=FINISHED';
async function fetchPremierLeagueScores() {
    try {
        const response = await fetch(proxyUrl + apiUrlScores, {
            headers: {
                'X-Auth-Token': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching scores: ' + response.statusText);
        }

        const data = await response.json();
        console.log(data);

        const scoresContainer = document.getElementById('team-scores');
        scoresContainer.innerHTML = '';

        // Filtrar y mostrar solo los últimos 10 partidos finalizados
        const finishedMatches = data.matches.slice(-10); // Últimos 10 partidos

        finishedMatches.forEach(match => {
            const scoreCard = document.createElement('div');
            scoreCard.classList.add('col-md-4', 'mb-4');

            const matchDate = new Date(match.utcDate).toLocaleString();
            const homeTeam = match.homeTeam.name;
            const awayTeam = match.awayTeam.name;
            const homeScore = match.score.fullTime.home;  // Cambiado a 'home'
            const awayScore = match.score.fullTime.away;  // Cambiado a 'away'

            scoreCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${homeTeam} ${homeScore} - ${awayTeam} ${awayScore}</h5>
                        <p class="card-text">Fecha: ${matchDate}</p>
                    </div>
                </div>
            `;
            scoresContainer.appendChild(scoreCard);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchPremierLeagueScores);

document.addEventListener('DOMContentLoaded', fetchPremierLeagueSchedules);

document.addEventListener('DOMContentLoaded', fetchPremierLeagueStandings);
