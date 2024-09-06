function updateCard(id_card,content_card){
    id_card.innerHTML = content_card;
}
function discoverCard(card){
    card.classList.add("discovered");
}
function preflopView(personalHand,rivalHand){
    let personalCard1 = document.getElementById("personal-card-1");
    let personalCard2 = document.getElementById("personal-card-2");
    let rivalCard1 = document.getElementById("rival-card-1");
    let rivalCard2 = document.getElementById("rival-card-2");
    discoverCard(personalCard1);
    discoverCard(personalCard2);
    discoverCard(rivalCard1);
    discoverCard(rivalCard2);

    updateCard(personalCard1,`<label for="">${personalHand[0].substring(1)}</label><img src="img/${personalHand[0][0]}.png" alt="">`);
    updateCard(personalCard2,`<label for="">${personalHand[1].substring(1)}</label><img src="img/${personalHand[1][0]}.png" alt="">`);
    updateCard(rivalCard1,`<label for="">${rivalHand[0].substring(1)}</label><img src="img/${rivalHand[0][0]}.png" alt="">`);
    updateCard(rivalCard2,`<label for="">${rivalHand[1].substring(1)}</label><img src="img/${rivalHand[1][0]}.png" alt="">`); 
}
function flopView(flopCards){
    let card1=document.getElementById("card-1");
    let card2=document.getElementById("card-2");
    let card3=document.getElementById("card-3");
    discoverCard(card1);
    discoverCard(card2);
    discoverCard(card3);
    updateCard(card1,`<label for="">${flopCards[0].substring(1)}</label><img src="img/${flopCards[0][0]}.png" alt="">`);
    updateCard(card2,`<label for="">${flopCards[1].substring(1)}</label><img src="img/${flopCards[1][0]}.png" alt="">`);
    updateCard(card3,`<label for="">${flopCards[2].substring(1)}</label><img src="img/${flopCards[2][0]}.png" alt="">`);

}
function postFlopView(card,phase){
    if(PHASES[phase] == "turn"){
        let card4=document.getElementById("card-4");
        discoverCard(card4);
        updateCard(card4,`<label for="">${card[0].substring(1)}</label><img src="img/${card[0][0]}.png" alt="">`);
    }
    else{
        let card5=document.getElementById("card-5");
        discoverCard(card5);
        updateCard(card5,`<label for="">${card[0].substring(1)}</label><img src="img/${card[0][0]}.png" alt="">`);
    }
    
}