# AndreaMartinLavoro.github.io

Sito portfolio statico (HTML/CSS/JS puro, nessuna build).

## Struttura

```
├── index.html, about.html, experience.html,      pagine del sito, tutte condividono
│   projects.html, downloads.html, contacts.html,  la stessa sidebar/nav e lo stesso
│   games.html, git.html, music.html                css/style.css
├── flappy.html, pong.html, breakout.html          giochi arcade standalone (si aprono
│                                                    in una nuova scheda da games.html)
├── partials/sidebar.html                          markup della sidebar, caricato via
│                                                    fetch da js/app.js in ogni pagina
├── css/
│   ├── style.css        stili condivisi del sito (layout, card, nav, bottoni)
│   ├── games.css         stili condivisi dai 3 giochi (reset, pulsanti circolari)
│   └── carousel.css      stili della carousel Spotify (pagina Musica)
├── js/
│   ├── app.js            carica la sidebar, gestisce il menu mobile e il link attivo
│   ├── github-repos.js   fetch delle repository pubbliche da GitHub (pagina git.html)
│   └── carousel.js       logica della carousel Spotify (pagina music.html)
├── data/playlists.json   contenuto delle playlist mostrate in music.html
├── images/, files/       asset statici (foto profilo, CV, tesi)
```

## Aggiungere una voce al menu

Basta modificare `partials/sidebar.html`: la voce compare automaticamente su
tutte le pagine (lo stato "attivo" viene calcolato in automatico da `js/app.js`
in base all'URL corrente).

## Sviluppo locale

La sidebar e le playlist vengono caricate con `fetch()`, che nella maggior parte
dei browser non funziona se il file viene aperto direttamente (`file://`). Per
sviluppare in locale avvia un server statico dalla root del progetto, ad es.:

```
python3 -m http.server 8000
```

e apri `http://localhost:8000`. Su GitHub Pages funziona senza alcuna configurazione.
