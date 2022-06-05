# Journary - progetto programmazione web 2021/22
_di Luigi Bjorn Cortellino_

## Introduzione
Journary è un Express web app su Node.JS che permette agli utenti di tenere traccia dei propri viaggi salvandoli in un database Mongo DB e visualizzandoli su una mappa. 

## Codice e deployment dell'app
Il codice sorgente dell'applicazione è visibile su github al seguente URL:
https://github.com/L-B-C/journary

L'applicazione è visibile seguendo questo URL:
https://fathomless-fortress-94783.herokuapp.com/

### Per accedere ai contenuti e al servizio forniti dalla web app
Per effettuare ogni tipo di operazione (ovvero visualizzare, inserire, modificare ed eliminare i viaggi) è necessario registrarsi. 
L'app usa l'autenticazione in modo basilare e non invierà mai nessun messaggio e-mail né di conferma né di verifica all'indirizzo fornito in fase di registrazione.
Si è deciso di fornire una breve spiegazione, che appare solo se non vi sono viaggi nel DB, per permettere ad un utente appena registrato
di capire lo scopo dell'applicazione e di creare correttamente un nuovo viaggio.

### Inserimento nuovo viaggio
Ogni viaggio è composto da: data, mezzo di trasporto, tappe principali (non coordinate geografiche ma nome dei luoghi). Le tappe principali sono chiamate waypoints. 
Il nome dei luoghi inseriti verrà ricercato attravarso il servizio offerto da mapbox.com e convertito in formato GeoJSON.
I dati del viaggio saranno quindi salvatisu un server attraverso il servizio Mongo DB Atlas

### Modifica ed eliminazione viaggio
Nella pagina di visualizzazione del singolo viaggio "show journey" ogni tappa principale è rappresentata sulla mappa con un marker e sono elencati i dettagli del viaggio. Con i due pulsanti edit e delete si possono rispettivamente modificare e cancellare il viaggio

### Visualizzazione dei viaggi e ricerca singolo viaggio
Nella pagina "Journeys" sono presenti tutti i viaggi sia in forma di marker sulla mappa (solo sulla prima tappa principale) e popup contenente i dettagli del viaggio che in forma di lista sotto la mappa. 
Si può selezionare una data e i viaggi effettuati in quel giorno (se esistenti) verranno mostrati sulla mappa e in forma di elenco.

## Tools, piattaforme, linguaggi 

### PaaS (Platform as a Service) utilizzate
- Heroku Cloud Application platform: per ospitare l'applicazione web
- Mongo DB Atlas: per gestire il database Mongo DB usato da journary

### Linguaggi utilizzati
- HTML
- CSS 
- JavaScript anche in forma EJS (Embedded JavaScript)

### Gestione del progetto e dei sorgenti
- Git
- Github

### Breve lista di quanto usato sia per frontend che backend
- Express.js: piattaforma per lo sviluppo della web app https://expressjs.com/
- Node.js: runtime JavaScript environment basato sull'engine V8 di Chrome https://nodejs.org/
- NPM: Node Package Manager per la gestione dei moduli di Node.js https://www.npmjs.com/ 
- Nodemon: modulo per rieseguire la web app ogni volta che vengono eseguite modifiche https://nodemon.io/
- mongoose: object modelling Mongo DB su Node.js https://mongoosejs.com/
- Joi: per la creazione di schemi e la validazione dei vari input inseriti dall'utente prima di salvari nel database https://joi.dev/
- Passport (con passport-local e passport-local-mongoose): gestione autenicazione per Node.js (usate funzionalità base) https://www.passportjs.org/
- Helmet: modulo per settare HTTP headers dell'app Express JS https://helmetjs.github.io/
- Bootstrap: HTML, CSS e JS framework per la rendere la web app responsive https://getbootstrap.com/
- EJS: linguaggio di templating JS https://ejs.co/
- Leaflet JS: libreria JS per realizzare mappe geografiche interattive https://leafletjs.com/
- mapbox: mappe, Geocoding API e SDK (usati solo per il geocoding) https://www.mapbox.com/

### Tools utilizzati per lo sviluppo
- Visual Studio Code
- Git Bash su Windows per l'esecuzione di Node.js, mongod (mongo daemon) e mongo shell
- Heroku CLI (Command Line Interface di heroku eseguita con Git Bash) per il deployment della web app su Heroku
