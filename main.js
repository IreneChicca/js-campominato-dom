// RECUPERO ELEMENTI DI INTERESSE E LI INSERISCO ALL'INTERNO DI VARIABILI

const cellContainer = document.getElementById('cell-container');
const btnGreed = document.getElementById('grid-btn');
const difficultySelect = document.getElementById('difficulty');

// VARIABILI GLOBALI di score e cells

let cellTotal;
let bombs;
let score;
let freeCells;



// RICHIAMO LA FUNZIONE CHE GENERA LA GRIGLIA ON LOAD

// generateGrid(cellTotal, cellContainer);

// E CICLO SULLA CELLA TANTE VOLTE QUANTE CELLE VOGLIO STAMPARE


// collego al bottone la creazione della griglia

btnGreed.addEventListener('click', function () {

    //raccolgo l'informazione della difficoltà selezionata dall'utente e la utilizzo per generare il numero di celle relativo
    cellTotal = parseInt(difficultySelect.value);


    //richiamo la funzione che genera la griglia con le celle
    generateGrid();


    // creo l'array di bombe

    bombs = generateBombsArray(1, cellTotal, 16);

    // inizializzo punteggio

    score = 0;

    // creo variabile con il conteggio delle celle libere, dato dalla sottrazione delle totali - le bombe presenti sul campo

    freeCells = cellTotal - bombs.length;


  

})


    


// CREO UNA FUNZIONE E LA COLLEGO AL CICLO CHE GENERA LE CELLE

function generateCell(cellText, cellTotal) {
    // CREO LA CELLA
    const cell = document.createElement('li');

    // scrivo all'interno della cella
    cell.innerText = cellText;

    // assegno classe alla cella così da poter modificare lo stile della cella in css
    cell.classList.add('cell');

    // assegno classe alla cella così da poter modificare lo stile della cella in css
    cell.classList.add('cell-' + cellTotal);



    // CLICK DELLA CELLA

    //faccio colorare le celle al click
    cell.addEventListener('click', function () {
        
        

        // determino se la cella cliccata è una bomba

        const cellNumber = parseInt(this.innerText);
        if(bombs.includes(cellNumber)){

            this.classList.add('cell-bomb')
           
            endgame('Fine partita! Hai totalizzato '+score+' punti :( Hai perso..');
        }

        else {

            this.classList.add('cell-style')
            score++;
            
            if( score >= freeCells){

                endgame('Perfect! Hai totalizzato '+score+' punti (: HAI VINTO');
            }

        }
    });

    // INSERISCO/APPENDO LA CELLA ALL'INTERNO DELLA PAGINA
    return cell;



}

// GENERIAMO UNA NUOVA FUNZIONE CHE RICHIEDA COME PARAMETRI IL NUMERO DI CELLE E IL CONTAINER PER RICHIAMARLA AL CLICK DEL BOTTONE

function generateGrid() {

    cellContainer.innerHTML = ''; // svuoto la griglia ugni volta che genero una nuova griglia

    let cellTotal = parseInt(difficultySelect.value);

    for (let i = 1; i <= cellTotal; i++) {

        const generatedCell = generateCell(i, cellTotal);
        cellContainer.append(generatedCell)

    }
}


// GENERA NUMERO RANDOMICO

const generateNumber = function (min,max){

    return Math.floor(Math.random() * max - min + 1) + min;

}


// GENERA ARRAY DELLE BOMBE

const generateBombsArray = function(min,max,qty){

const bombsArray = [];

    while (bombsArray.length < qty) {

    const bomb = generateNumber(min,max);
     if(!bombsArray.includes(bomb)) {bombsArray.push(bomb)}

 }

 return bombsArray;
}



// GENERO FUNZIONE PER LA FINE DEL GAME

const endgame = function (msg) {

    alert(msg)

}