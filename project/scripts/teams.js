const apiKey = '137238e0d9fd9e50035c63ec4c3db5e2';  
const apiHost = 'https://v3.football.api-sports.io/';

const requestOptions = {
  method: 'GET',
  headers: {
    'x-apisports-key': apiKey
  }
};

console.log('teams.js correctly loaded.'); // Verification

//API call, teams from season 2022 
fetch(`${apiHost}teams?league=39&season=2022`, requestOptions)  // Number 39 = Premier League, Season = 2022
  .then(response => {
    if (!response.ok) {
      throw new Error('API response failed');
    }
    return response.json();
  })
  .then(data => {
    console.log('Data received:', data); // Data Verification
    const teams = data.response;
    displayTeams(teams);
  })
  .catch(error => console.error('Error fetching data:', error));

function displayTeams(teams) {
    const container = document.getElementById('teams-container');
    container.innerHTML = '';  // Clean container
    teams.forEach(team => {
      // div for each team
      const teamBox = document.createElement('div');
      teamBox.classList.add('team-box', 'col-md-3', 'text-center', 'mb-4');  // Agrega estilos de Bootstrap
  
      // Create team logo
      const logo = document.createElement('img');
      logo.src = team.team.logo;
      logo.alt = `${team.team.name} logo`;
      logo.classList.add('img-fluid', 'mb-2');  // Bootstrap class to make it responsive
  
      // Create team name
      const teamName = document.createElement('h3');
      teamName.textContent = team.team.name;
      teamName.classList.add('team-name');  
  
      // Add more elements div
      teamBox.appendChild(logo);
      teamBox.appendChild(teamName);
  
      // Add the team div to the container
      container.appendChild(teamBox);
    });
}
