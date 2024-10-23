const apiKey = '137238e0d9fd9e50035c63ec4c3db5e2';  // Tu clave API
const apiHost = 'https://v3.football.api-sports.io/';

const requestOptions = {
  method: 'GET',
  headers: {
    'x-apisports-key': apiKey
  }
};

console.log('Archivo teams.js cargado correctamente.'); // Verificación básica

// Llamada a la API para obtener los equipos de la temporada 2022 (última temporada disponible)
fetch(`${apiHost}teams?league=39&season=2022`, requestOptions)  // Liga 39 = Premier League, Temporada = 2022
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    return response.json();
  })
  .then(data => {
    console.log('Datos recibidos:', data); // Verifica los datos
    const teams = data.response;
    displayTeams(teams);
  })
  .catch(error => console.error('Error fetching data:', error));

function displayTeams(teams) {
    const container = document.getElementById('teams-container');
    container.innerHTML = '';  // Limpieza del contenedor previo por si hay recarga
    teams.forEach(team => {
      // Crear un div para cada equipo
      const teamBox = document.createElement('div');
      teamBox.classList.add('team-box', 'col-md-3', 'text-center', 'mb-4');  // Agrega estilos de Bootstrap
  
      // Crear el logo del equipo
      const logo = document.createElement('img');
      logo.src = team.team.logo;
      logo.alt = `${team.team.name} logo`;
      logo.classList.add('img-fluid', 'mb-2');  // Clase Bootstrap para que el logo sea responsivo
  
      // Crear el nombre del equipo
      const teamName = document.createElement('h3');
      teamName.textContent = team.team.name;
      teamName.classList.add('team-name');  // Puedes agregar más estilos si lo deseas
  
      // Agregar los elementos al div del equipo
      teamBox.appendChild(logo);
      teamBox.appendChild(teamName);
  
      // Agregar el div del equipo al contenedor
      container.appendChild(teamBox);
    });
}
