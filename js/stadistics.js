function indexTypeHand(hand,valueStreetCards,pintaStreetCards){

    let valuesRepeat = [numbRepeat(hand[0].substring(1),valueStreetCards),numbRepeat(hand[1].substring(1),valueStreetCards)];
    let pintasRepeat = [numbRepeat(hand[0][0],pintaStreetCards),numbRepeat(hand[1][0],pintaStreetCards)];
    let indexHand = 0;

    for(let i=0; i < MANOS.length; i++){
        if(i == 0){
            if(!isMatchingCards(hand)){
                indexHand = i;
                console.log(`\n<${hand[0]},${hand[1]}> --> Formó ${MANOS[i]}`);
            }
                
        }
        else if(i == 1){
            if(isPareja(hand,valueStreetCards)){
                indexHand = i;
                console.log(`\n<${hand[0]},${hand[1]}> --> Formó ${MANOS[i]}`);
            }
        }
        else if(i == 2){
            if(isDoblePareja(hand,valuesRepeat,valueStreetCards)){
                indexHand = i;
                console.log(`\n<${hand[0]},${hand[1]}> --> Formó ${MANOS[i]}`);
            }
        }        
        else if(i == 3){
            if(isTrio(hand,valueStreetCards)){
                indexHand = i;
                console.log(`\n<${hand[0]},${hand[1]}> --> Formó ${MANOS[i]}`);
            }
                
        }
        else if(i == 4){
            if(isEscalera(hand,valueStreetCards)){
                indexHand = i;
                console.log(`\n<${hand[0]},${hand[1]}> --> Formó ${MANOS[i]}`);
            }
                
        }
        else if(i == 5){
            if(isColor(pintasRepeat, pintaStreetCards)){
                indexHand = i;
                console.log(`\n<${hand[0]},${hand[1]}> --> Formó ${MANOS[i]}`);
            }
                
        }
        else if(i == 6){
            if(isFullHouse(hand, valueStreetCards)){
                indexHand = i;
                console.log(`\n<${hand[0]},${hand[1]}> --> Formó ${MANOS[i]}`);
            }
                
        }
        else if(i == 7){
            if(isPoker(hand,valueStreetCards)){
                indexHand = i;
                console.log(`\n<${hand[0]},${hand[1]}> --> Formó ${MANOS[i]}`);
            }
                
        }
        else if(i == 8){
            if(isEscaleraColor(hand,valueStreetCards,pintasRepeat,pintaStreetCards)){
                indexHand = i;
                console.log(`\n<${hand[0]},${hand[1]}> --> Formó ${MANOS[i]}`);
            }
                
        }
        else{
            if(isEscaleraReal(hand,valueStreetCards,pintasRepeat,pintaStreetCards)){
                indexHand = i;
                console.log(`\n<${hand[0]},${hand[1]}> --> Formó ${MANOS[i]}`);
            }
                
        }
    }

    return indexHand;
}
function betterHand(hand,index_hand,deck){
    let favored_cards = [];

    if(index_hand != MANOS.indexOf("escalera real")){
        if(index_hand == MANOS.indexOf("escalera de color") - 1 || index_hand == MANOS.indexOf("escalera real") - 1){
            //Solo me van a servir aquellas cartas de la misma pinta que tengo en las 2 cartas de la mano.

            if(index_hand == MANOS.indexOf("escalera real") - 1){
                //Solo me van a servir las del mismo color que sean A,K,Q,J o 10.
                favored_cards = deck.filter(c => (c[0] == hand[0][0]
                    || c[0] == hand[1][0]) && ['A','K','Q','J','10'].includes(c.substring(1)) 
                    && (Math.abs(hand[0].substring(1) - c.substring(1)) == 1 || Math.abs(hand[1].substring(1) - c.substring(1)) == 1));
            }
            else{
                favored_cards = deck.filter(c => (c[0] == hand[0][0] || c[0] == hand[1][0]) 
                    && (Math.abs(hand[0].substring(1) - c.substring(1)) == 1 || Math.abs(hand[1].substring(1) - c.substring(1)) == 1));
            }
        }
        else{
            /*Cualquier carta que haga match con las que tengo, o que sea consecutiva para escalera (A estas 2 las puedo unificar con la 
            condición que la diferencia sea menor a 1 o igual) o de la misma pinta*/
            return (favored_cards = deck.filter(c => Math.abs(hand[0].substring(1) - c.substring(1)) <= 1 
            || Math.abs(hand[1].substring(1) - c.substring(1)) <= 1 || c[0] == hand[0][0] || c[0] == hand[1][0]));
        }
        
    }
    
    return favored_cards;
}