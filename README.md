## Klant 
Onze klant is JEF!. JEF is een filmfestival gemaakt door jongeren. Elk jaar in februari organiseert het festival tentoonstellingen van films en workshops. Ook zijn er gasten, zoals regisseurs en acteurs, die na afloop van de tentoonstellingen deelnemen aan Q&A's.

## Team LOBJIM Producions
APP: Mohamed Mankouchi, Ilias Omari en Juan-Luca Lozano hebben gedurendre 3 weken gewerkt aan front-end en back-end van de app. Ze hebben ervoor gezorgd dat de app functioneel en mooi eruit zag. 
SPELLETJES : Dina Bouazzafen en Mey-Lin Mus hebben ervoor gezorgd dat de spelletjes van de WEB APP functioneel zijn alsook hebben ze de interactieve installaties gecreërd.
COMMUNICATION : Quentin hield zich voornamelijk bezig met administratieve taken zoals presentaties, klantenrelaties enzovoort.


## Algemene informatie app
We hebben een API aangemaakt en gepubliceerd aan de hand van Render.com en Node.js (expressJS). Om deze aan te maken hebben we 3 dagen gespendeerd. 

### Source links
> Ardiuno code (Zie file [/arduino.txt]) 
- https://arduinogetstarted.com/tutorials/arduino-button-servo-motor

> API parken in Antwerpen
- https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek6/MapServer/758/query?where=1%3D1&outFields=*&outSR=4326&f=json 

> API bushaltes
- https://geo.api.vlaanderen.be/Haltes/ogc/features/collections/Halte/items?f=application%2Fjson&limit=50 

> API stations
- https://api.irail.be/stations/?format=json&lang=en 

> API toiletten in Antwerpen
- https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek1/MapServer/8/query?where=1%3D1&outFields=*&outSR=4326&f=json 

> JEF festival 2023 vertoningsschema's & communicatie
- https://datastudio.google.com/reporting/b99f3e6a-aa96-4475-949e-cdf6e5824daa?s=qPgYTFK-Ogg 

//TODO:
> Npm packages 
- https://www.npmjs.com/ 


#### front end
**leaflet**
Use the package manager [npm](https://www.npmjs.com/package/leaflet) to install leaflet.

```bash
npm install leaflet
```
#### back end
**Cors**
Use the package manager [npm](https://www.npmjs.com/package/cors) to install cors.
```bash
npm install cors
```

**Dotenv**
Use the package manager [npm](https://www.npmjs.com/package/dotenv) to install dotenv.
```bash
npm install dotenv
```

**Express**
Use the package manager [npm](https://www.npmjs.com/package/express) to install express.
```bash
npm install express
```

**Mongodb**
Use the package manager [npm](https://www.npmjs.com/package/mongodb) to install mongodb.
```bash
npm install mongodb
```

**Nodemon**
Use the package manager [npm](https://www.npmjs.com/package/nodemon) to install nodemon.
```bash
npm install nodemon
```
**uuid**
Use the package manager [npm](https://www.npmjs.com/package/webpack) to install uuid.

```bash
npm install uuid
```
**jsonwebtoken**
Use the package manager [npm](https://www.npmjs.com/package/jsonwebtoken) to install jsonwebtoken.

```bash
npm install jsonwebtoken
```
**bcrypt**
Use the package manager [npm](https://www.npmjs.com/package/bcrypt) to install bcrypt.

```bash
npm install bcrypt
```

> Google maps
- https://www.google.be/maps  

> Leaflet map
- https://leafletjs.com/ 

> Alert popup 
- https://sweetalert2.github.io/ 

> Leaflet Routing Machine
- https://github.com/perliedman/leaflet-routing-machine 

> Geolocation
- https://github.com/domoritz/leaflet-locatecontrol 

 

### Used servers

- Mongodb as a database (NoSQL) 

- Node JS and express JS to create API.  

- Render.com for API hosting  

- SweetAlert 2 for clean alerts on the webapp  

- Google maps for the redirect, alternative to take a look of the route overview. 

### All the detailed versions of the installed software

- Leaflet -> version 1.9 

- Leaflet-Routing-Machine -> version 3.2.12 

- Leaflet-Locatecontrol -> version 0.79.0 

- SweetAlert 2 -> version 11.7.1 


# JEF Festival - web app & installations

## Welkompagina
Op de welkompagina hebben we een animatie gemaakt van een draaiende popcorn. Dit met het logo van JEF en de naam van de applicatie. Ook hebben we deze gestyled naar de huisstijl van JEF. 

## Homepagina
Het document home.html bevat de hoofdpagina van de applicatie. Hier navigeren gebruikers door de kaart en vinden ze allerlei informatie. Ten eerste, bevat de pagina een kaart die de locatie van de gebruiker bevraagt, zodat deze live kan worden bekeken. De pagina bevat vervolgens een aantal filters, onder meer voor toiletten, restaurants, parken en bushaltes. Afhankelijk van welke filters u aanklikt, verschijnen er markeringen op de kaart. Gebruikers kunnen dan op de marker klikken om meer informatie te bekijken. Dit zal inzoomen op de kaart en een informatiebox weergeven met de nodige gegevens zoals naam en adres. U kunt dan uw weg vinden door te klikken op de Route-knop of de Google Maps-knop om rechtstreeks naar de kaartentoepassing of website voor de geselecteerde route te gaan. De app bevat ook een datumkiezer die festivallocaties op datum weergeeft. Ten laatste, kunnen gebruikers plaatsen liken en toevoegen aan hun profiel. Als u op de Like-knop klikt, wordt het hart automatisch gevuld en verschijnt er een melding dat de locatie is opgeslagen.

## Myprofile
De pagina myprofile.html bevat alle inhoud van de profielen van onze gebruikers. Wanneer een gebruiker zich registreert of inlogt op onze web-app, worden de gegevens van de gebruiker verzonden naar mijnprofiel.html. Deze gegevens zijn de naam en het e-mailadres die de klant tijdens de registratie heeft ingevoerd. 

Dan vindt u uw favoriete plaatsen die u leuk vond op home.html. Deze plaatsen zullen zo worden aangegeven. Allereerst het type plaats, bijvoorbeeld een park, restaurant, bushalte of openbaar toilet. Dan is er de naam van de plaats. Daarnaast komt een kruis. Met dit kruisje kunt u de locatie uit uw favorietenlijst verwijderen. 

Wij bieden gebruikers ook de mogelijkheid om direct naar onze kaart te gaan met de knop "gaan". Gebruikers worden dan doorgestuurd naar home.html met het pad getekend op de kaart. 

## Over JEF
Wanneer je op de pagina “Over JEF” terecht komt. Krijg je informatie over wat JEF festival is en in welke locatie deze zullen doorgaan. Daarnaast vind je de datum van deze festivals. Tenslotte vind je ook een telefoonnummer, een e-mail adres en de link naar de officiële website.

## JEFBOX
Wanneer je op deze pagina komt krijg je allemaal spelletjes over de film "Yuku en de Himalayabloem". Alle spelletjes zijn gesloten behalve het spelletje "Duizelige kat". De spelletjes die gesloten zijn moeten worden geopend door een wachtwoord (JEFwoord) dat aan de installaties zullen staan. Ook staat er meer informatie iver de photobooth.<strong> Zelf hebben we de Duizelige kat en Bevrijd Yuku uitgewerkt in onze webapp en als interactieve installatie. </strong>

Uitleg van de spelletjes: 

- Duizelige kat:  Deze interactie gaat over het draaien van de kat totdat de kat misselijk wordt en gaat
beginnen overgeven. Het draaien van de kat gaat door touchscreen gebeuren. 


- Bevrijd Yuku: Yuku is gevangen genomen en de kindjes kunnen haar helpen door meermaals op de
knop te drukken. Door elke keer op de knop te drukken gaat de gevangenis meer om
meer openen tot als Yuku vrij is.
<details>
           <summary>JEFwoord</summary>
           <p>GEVANGENIS</p>
</details>

- Op een dag: In het begin van het verhaal gaan de kinderen een boek moeten openen om met het
verhaal te beginnen. Eens ze het boek opendoen gaat het boek licht geven en gaat er
muziek gespeeld worden. 
<details>
           <summary>JEFwoord</summary>
           <p>BOEK</p>
</details>

- Happy Ukulele: Hier is het de bedoeling om de vos blij te maken door een mooi muziekje te spelen op
de ukulele. Het kind heeft daar 30 seconde voor en na dat het kind gespeeld heeft op de
ukelele gaat de kleur van de rode knop veranderen naar groen en als het kind dan op die
knop drukt gaat de vos blij worden. 
<details>
           <summary>JEFwoord</summary>
           <p>UKULELE</p>
</details>

- Blinkende bloem: Bij dit deel van het verhaal gaat het kind zijn/haar vinger moeten plaatsen waar de
vingerprint staat en doordat ze dat doen gaan de bloemetjes die er rond zijn gaan beginnen schijnen en twinkelen. 
<details>
           <summary>JEFwoord</summary>
           <p>BLOEM</p>
</details>

- Mieren muziek: Bij deze interactie gaat er een muziek, licht patroon worden afgespeeld en de kinderen
zouden dit patroon moeten nadoen aan de hand van de knoppen die het licht patroon
heeft getoont. 
<details>
           <summary>JEFwoord</summary>
           <p>MIEREN</p>
</details>


## Accesspagina
Op deze pagina zal je een wachtwoord moeten invoeren om access te krijgen tot bepaalde spelletjes van de web applicatie. Je zal een tekstveldje zien staan, daarin moet je het wachtwoord invoeren dat je fysiek zal zien op het festival zelf.

## Loginpagina
Als jij de app op de meest nuttige manier wil gebruiken, log je best in. Als je een eigen account hebt kan je plaatsen van op de Homepagina liken en ze bijhouden in een lijstje van de Myprofile pagina.

Zoals je kan zien moet je een email en wachtwoord ingeven. Je kan op het oogje klikken om je wachtwoord te tonen. 

Met de login knop log je in. Door op sign up te klikken kan je registreren als je nog geen account hebt.
## Downloadpagina (PWA)
De pwa.html-pagina is voor gebruikers die de QR-code scannen, die op verschillende plaatsen in het JEF-festival te vinden zal zijn, om onze web-app op hun telefoon te downloaden. 

Als onze gebruikers een Android-telefoon hebben, kunnen zij de applicatie downloaden door op de knop op de pagina te klikken. 

Als onze gebruiker een iPhone heeft, moet hij/zij de link op safari openen. Dan moet hij naar het "delen"-pictogram gaan en de optie "toevoegen aan beginscherm" kiezen. De applicatie staat dan op hun startscherm. 








