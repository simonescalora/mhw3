//API 1 con autenticazione OAuth2
function onJson(json) 
{
    console.log('JSON ricevuto');
    console.log(json);

    const library = document.querySelector('#artist-view');
    library.innerHTML = '';

    const results = json.artists.items;

    const artist_data = results[0];

    const title = artist_data.name;
    const selected_image = artist_data.images[0].url;

    const album = document.createElement('div');
    album.classList.add('artist');

    const img = document.createElement('img');
    img.src = selected_image;

    const caption = document.createElement('span');
    caption.textContent = title;

    album.appendChild(img);
    album.appendChild(caption);
    library.appendChild(album);
}
  
function onResponse(response) 
{
    console.log('Risposta ricevuta');
    return response.json();
}
  
function search(event)
{
    event.preventDefault();

    const artist_input = document.querySelector('#artist');
    const artist_value = encodeURIComponent(artist_input.value);

    console.log('Eseguo ricerca: ' + artist_value);

    fetch("https://api.spotify.com/v1/search?type=artist&q=" + artist_value,
      {
        headers:
        {
          'Authorization': 'Bearer ' + token
        }
      }
    ).then(onResponse).then(onJson);
}
  
function onTokenJson(json)
{
    console.log(json)
    token = json.access_token;
}
  
  function onTokenResponse(response)
{
    return response.json();
}
   
const client_id = '11f1eaddcbd14077bc99bb6eef397e90';
const client_secret = 'd01959b448cb469fa5dd225aa303692c';

let token;

fetch("https://accounts.spotify.com/api/token",
        {
        method: "post",
        body: 'grant_type=client_credentials',
        headers:
            {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
            }
        }
    ).then(onTokenResponse).then(onTokenJson);

//API 2 senza autenticazione

function lyrics(event)
{
    event.preventDefault();
    const singer_input = testo.querySelector('#artist_name');
    const singer_value = encodeURIComponent(singer_input.value);

    const song_input = testo.querySelector('#song_name');
    const song_value = encodeURIComponent(song_input.value);

    console.log('Eseguo ricerca cantante: ' + singer_value + '\nEseguo ricerca brano: ' + song_value);

    const url = "https://api.lyrics.ovh/v1/" + singer_value + "/" + song_value;

      fetch(url).then(onResponseTwo).then(onJsonTwo);
  }
  
  function onResponseTwo(response)
  {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
  function onJsonTwo(json)
  {
    console.log('JSON ricevuto');
    console.log(json);
    const text_song = testo.querySelector('#text');

    text_song.innerHTML = "";
    text_song.innerHTML = json.lyrics;
}



const form = document.querySelector('form');
form.addEventListener('submit', search);

const testo = document.querySelector('#testo');
const botton = testo.querySelector('#submit');
botton.addEventListener('click', lyrics); 
