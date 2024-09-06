const CARDS=[{pinta: "D", valor:["2","3","4","5","6","7","8","9","10","J","Q","K","A"]},
{pinta: "C", valor:["2","3","4","5","6","7","8","9","10","J","Q","K","A"]},
{pinta: "T", valor:["2","3","4","5","6","7","8","9","10","J","Q","K","A"]},
{pinta: "P", valor:["2","3","4","5","6","7","8","9","10","J","Q","K","A"]}];
const PHASES = ["flop","turn","river"];

let btn_siguiente = document.querySelector("#btn_sig");
let currentPhase = -2;

const getRandomNumber= (min,max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
function getDeckOfCards(){
    let deck = [];
    for(let p of CARDS){
        for(let v of p.valor){
            deck.push(`${p.pinta}${v}`);
        }
    }

    return deck;
}
function repartir(){
    let pinta1 = CARDS[getRandomNumber(1,4) - 1].pinta;
    let pinta2 = CARDS[getRandomNumber(1,4) - 1].pinta;
    let valores = CARDS[0].valor;
    return [`${pinta1}${valores[getRandomNumber(1,13) - 1]}`,`${pinta2}${valores[getRandomNumber(1,13) - 1]}`];
}
function included(container,card){
    return container.includes(card);
}
function diffCards(streetCards){
    let aux = [];
    for(let c of streetCards){
        if(!aux.includes(c))
            aux.push(c);
        else
            return false;
    }
    return true;
}
function getFlop(){
    let pinta1,pinta2,pinta3="";
    let valueIndex1,valueIndex2,valueIndex3="";
    let flopCards = [];
    let valores = CARDS[0].valor;
    do{
        pinta1 = CARDS[getRandomNumber(1,4) - 1].pinta;
        pinta2 = CARDS[getRandomNumber(1,4) - 1].pinta;
        pinta3 = CARDS[getRandomNumber(1,4) - 1].pinta;
        valueIndex1 = getRandomNumber(1,13) - 1;
        valueIndex2 = getRandomNumber(1,13) - 1;
        valueIndex3 = getRandomNumber(1,13) - 1;
        flopCards = [`${pinta1}${valores[valueIndex1]}`,`${pinta2}${valores[valueIndex2]}`,`${pinta3}${valores[valueIndex3]}`];
    }while(diffCards(flopCards) && !included(deck,flopCards[0]) || !included(deck,flopCards[1]) || !included(deck,flopCards[2]));

    return flopCards;
}
function getPostFlop(){
    let pinta = "";
    let valueIndex = "";
    let valores = CARDS[0].valor;
    let postFlopCard = "";
    do{
        pinta = CARDS[getRandomNumber(1,4) - 1].pinta;
        valueIndex = getRandomNumber(1,13) - 1;
        postFlopCard = [`${pinta}${valores[valueIndex]}`];
    }while(!included(deck,postFlopCard[0]));

    return postFlopCard;
}
function getRivalHand(){
    let rivalHand =[];
    do{
        rivalHand = repartir();
    }while(included(personalHand,rivalHand[0]) || included(personalHand,rivalHand[1]));

    return rivalHand;
}
function updateCards(){
    return deck.filter( c => !revealedCards.includes(c));
}

let deck = getDeckOfCards();

let personalHand = repartir();
let rivalHand = getRivalHand();
let streetMatch = [];
let revealedCards = [`${personalHand[0]}`,`${personalHand[1]}`,`${rivalHand[0]}`,`${rivalHand[1]}`];

//-------------------------------MANEJADORES DE EVENTOS----------------------------------------------------
btn_siguiente.addEventListener('click', () => {
    if(currentPhase == -2){
        currentPhase++;
        preflopView(personalHand,rivalHand);
        updateGameInfo(personalHand,rivalHand,deck,streetMatch);
    }
    else if(currentPhase == -1)
    {
        currentPhase++;
        let flopCards = getFlop();
        streetMatch = streetMatch.concat(flopCards);
        revealedCards = revealedCards.concat(flopCards);
        deck = updateCards(); //Se reduce el mazo
        flopView(flopCards);
        updateGameInfo(personalHand,rivalHand,deck,streetMatch);
    }
    else{
        if(currentPhase < PHASES.indexOf("river")){
            currentPhase++;
            let postFlopCard = getPostFlop();
            streetMatch = streetMatch.concat(postFlopCard);
            revealedCards = revealedCards.concat(postFlopCard);
            deck = updateCards(); //Se reduce el mazo
            postFlopView(postFlopCard,currentPhase);
            updateGameInfo(personalHand,rivalHand,deck,streetMatch);
        }
        else
            console.log("---------------SE TERMINO LA PARTIDA!!----------------------------");
    }
});