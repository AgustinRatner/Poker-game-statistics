//Clasificar manos por puntajes (Estan ordenadas de manor a mayor, asique puedo tomar el "indice" como puntaje)
const MANOS = ["carta alta","pareja","doble pareja","trio","escalera","color","full house","poker","escalera de color","escalera real"];
function updateHand(personalHand,rivalHand,index_mano_personal, index_mano_rival,valuesPersonalHand, valuesRivalHand,valueStreetCards){

    function updateColors(hand_personal,hand_rival,personal_color,rival_color){
        hand_personal.style.color= personal_color;
        hand_rival.style.color= rival_color;
    }

    let hand_personal = document.getElementById("hand-p");
    let hand_rival = document.getElementById("hand-r");
    let allValues = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];

    //Aca obtengo el valor realmente de cada carta, recordemos que tenemos "letras" en el mazo, por eso se complica
    let values_personal_index = [allValues.indexOf(valuesPersonalHand[0]),allValues.indexOf(valuesPersonalHand[1])];
    let values_rival_index = [allValues.indexOf(valuesRivalHand[0]),allValues.indexOf(valuesRivalHand[1])];

    if(index_mano_personal == index_mano_rival){

        if(MANOS[index_mano_personal] == "carta alta")
        {
            //Se define por carta alta
            if(Math.max(...values_personal_index) == Math.max(...values_rival_index)){
                if(Math.min(...values_personal_index) != Math.min(...values_rival_index)){
                    if(Math.min(...values_personal_index) > Math.min(...values_rival_index)){
                        updateColors(hand_personal,hand_rival,"lime","crimson");
                    }
                    else{
                        updateColors(hand_personal,hand_rival,"crimson","lime");
                    }
                }
                
            }
            else if(Math.max(...values_personal_index) > Math.max(...values_rival_index)){
                updateColors(hand_personal,hand_rival,"lime","crimson");
            }
            else{
                updateColors(hand_personal,hand_rival,"crimson","lime");
            }
        }
        else{
            //Estas 4 variavbles son para definir por pareja alta, trios altos, etc.
            let valuesRepeat_personal = [numbRepeat(personalHand[0].substring(1),valueStreetCards),numbRepeat(personalHand[1].substring(1),valueStreetCards)];
            let valuesRepeat_rival = [numbRepeat(rivalHand[0].substring(1),valueStreetCards),numbRepeat(rivalHand[1].substring(1),valueStreetCards)];
            
            //Se define por pareja más alta
            if(MANOS[index_mano_personal] == "pareja"){ 
                if(isMatchingCards(personalHand) && isMatchingCards(rivalHand)){
                    if(values_personal_index[0] > values_rival_index[0]){
                        updateColors(hand_personal,hand_rival,"lime","crimson");
                    }
                    else{
                        updateColors(hand_personal,hand_rival,"crimson","lime");
                    }
                }
                else{
                    if(isMatchingCards(personalHand)){
                        if(values_personal_index[0] > values_rival_index[valuesRepeat_rival.indexOf(2)]){
                            updateColors(hand_personal,hand_rival,"lime","crimson");
                        }
                        else
                            updateColors(hand_personal,hand_rival,"crimson","lime");
                    }
                    else if(isMatchingCards(rivalHand)){
                        if(values_rival_index[0] > values_personal_index[valuesRepeat_personal.indexOf(2)]){
                            updateColors(hand_personal,hand_rival,"crimson","lime");
                        }
                        else
                            updateColors(hand_personal,hand_rival,"lime","crimson");
                    }
                    else{
                        if(values_personal_index[valuesRepeat_personal.indexOf(2)] > values_rival_index[valuesRepeat_rival.indexOf(2)]){
                            updateColors(hand_personal,hand_rival,"lime","crimson");
                        }
                        else
                            updateColors(hand_personal,hand_rival,"crimson","lime");
                    }
                }
            }
            else if(MANOS[index_mano_personal] == "doble pareja"){
                if(isMatchingCards(personalHand) && isMatchingCards(rivalHand)){
                    if(values_personal_index[0] > values_rival_index[0]){
                        updateColors(hand_personal,hand_rival,"lime","crimson");
                    }
                    else{
                        updateColors(hand_personal,hand_rival,"crimson","lime");
                    }
                }
                else{
                    if(isMatchingCards(personalHand)){
                        if((valuesRepeat_rival[0] + valuesRepeat_rival[1]) < 4){
                            /*Puede pasar que se requieran de 3 cartas en el flop para poder completar la doble 
                            pareja, es decir solo se repita una de las cartas de la mano quedando <2,1> o <1,2>*/
                            if(values_personal_index[0] > values_rival_index[valuesRepeat_rival.indexOf(2)])
                                updateColors(hand_personal,hand_rival,"lime","crimson");
                            else
                                updateColors(hand_personal,hand_rival,"crimson","lime");
                        }
                        else{
                            if(values_personal_index[0] > Math.max(...values_rival_index)){
                                updateColors(hand_personal,hand_rival,"lime","crimson");
                            }
                            else
                                updateColors(hand_personal,hand_rival,"crimson","lime");
                        }
                    }
                    else if(isMatchingCards(rivalHand)){
                        if((valuesRepeat_personal[0] + valuesRepeat_personal[1]) < 4){
                            /*Puede pasar que se requieran de 3 cartas en el flop como antes*/
                            if(values_rival_index[0] > values_personal_index[valuesRepeat_personal.indexOf(2)])
                                updateColors(hand_personal,hand_rival,"crimson","lime");
                            else
                                updateColors(hand_personal,hand_rival,"lime","crimson");
                        }
                        else{
                            if(values_rival_index[0] > Math.max(...values_personal_index)){
                                updateColors(hand_personal,hand_rival,"crimson","lime");
                            }
                            else
                                updateColors(hand_personal,hand_rival,"lime","crimson");
                            }
                    }
                    else{
                        if((valuesRepeat_personal[0] + valuesRepeat_personal[1]) < 4 || (valuesRepeat_rival[0] + valuesRepeat_rival[1]) < 4){
                            /*Puede pasar que se requieran de 3 cartas en el flop como antes*/
                            let max_value_personal_count_2 = Math.max(values_personal_index[valuesRepeat_personal.indexOf(2)],values_personal_index[valuesRepeat_personal.lastIndexOf(2)]);
                            let max_value_rival_count_2 = Math.max(values_rival_index[valuesRepeat_rival.indexOf(2)],values_rival_index[valuesRepeat_rival.lastIndexOf(2)]);
                            
                            if(max_value_personal_count_2 > max_value_rival_count_2)
                                updateColors(hand_personal,hand_rival,"lime","crimson");
                            else
                                updateColors(hand_personal,hand_rival,"crimson","lime");
                        }
                        else{
                            if(Math.max(...values_personal_index) > Math.max(...values_rival_index)){
                                updateColors(hand_personal,hand_rival,"lime","crimson");
                            }
                            else
                                updateColors(hand_personal,hand_rival,"crimson","lime");
                        }
                    }
                }
            }
        }
    }
    else if(index_mano_personal > index_mano_rival){
        updateColors(hand_personal,hand_rival,"lime","crimson");
    }
    else{
        updateColors(hand_personal,hand_rival,"crimson","lime");
    }

    hand_personal.innerHTML=`Mano: <strong>${MANOS[index_mano_personal].charAt(0).toUpperCase() + MANOS[index_mano_personal].slice(1)}</strong>`;
    hand_rival.innerHTML=`Mano: <strong>${MANOS[index_mano_rival].charAt(0).toUpperCase() + MANOS[index_mano_rival].slice(1)}</strong>`;

}
function getValuesCard(cards){
    let values = [];
    for(let c of cards){
        values.push(c.substring(1));
    }
    return values;
}
function getPintasCard(cards){
    let pintas = [];
    for(let c of cards){
        pintas.push(c[0]);
    }
    return pintas;
}
function numbRepeat(cardValue, valueStreetCards){
    let count = 1;

    for(let vs of valueStreetCards){
        if(cardValue == vs)
            count++;
    }
    return count;
}
function valueStreetsRepeat(valueStreetCards){
    let valuesRepeatStreetCards = [];
    for(let vs of valueStreetCards){
        valuesRepeatStreetCards.push(numbRepeat(vs,valueStreetCards) - 1);
    }
    return valuesRepeatStreetCards;
}
function pintaStreetsRepeat(pintaStreetsCards){
    let pintasRepeatStreetCards = [];
    for(let vs of pintaStreetsCards){
        pintasRepeatStreetCards.push(numbRepeat(vs,pintaStreetsCards) - 1);
    }
    return pintasRepeatStreetCards;
}
function isMatchingCards(hand){
    return hand[0].substring(1) == hand[1].substring(1);
}
function isPareja(hand, valueStreetCards){
    let all_cards = valueStreetCards.concat([hand[0].substring(1),hand[1].substring(1)]);
    
    return valueStreetsRepeat(all_cards).includes(2);
}
function isDoblePareja(hand,valuesRepeat, valueStreetCards){
    let values_street_repeat_count = valueStreetsRepeat(valueStreetCards);
    let first_index_count2 =  values_street_repeat_count.indexOf(2);
    let last_index_count2 =  values_street_repeat_count.lastIndexOf(2);

    return ((valuesRepeat[0] == valuesRepeat[1] && valuesRepeat[0] == 2) 
    || (valuesRepeat[0] != valuesRepeat[1] && (valuesRepeat[0] == 2 || valuesRepeat[1] == 2) && values_street_repeat_count.includes(2)) 
    || (isMatchingCards(hand) && values_street_repeat_count.includes(2)) 
    || (first_index_count2 != -1 && last_index_count2 != -1 && valueStreetCards[first_index_count2] != valueStreetCards[last_index_count2]));
}
function isTrio(hand, valueStreetCards){
    let all_cards = valueStreetCards.concat([hand[0].substring(1),hand[1].substring(1)]);
    
    return valueStreetsRepeat(all_cards).includes(3);
}
function isEscalera(hand,valueStreetCards){

    function forSpecificQuantity(hand,valueStreetCards){
        let index_values_street = [];
        let all_values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
        let index_values_hand = [all_values.indexOf(hand[0].substring(1)),all_values.indexOf(hand[1].substring(1))];
        let non_repeated_values = "";

        for(let v of valueStreetCards)
            index_values_street.push(all_values.indexOf(v));

        index_values_street = index_values_street.concat(index_values_hand);
        /*Ahora podemos averiguar si se puede colocar mis números dentro de ese arreglo (Los números del arreglo
        deben ser consecutivos)*/

        non_repeated_values = diffValues(index_values_street);
        non_repeated_values.sort((a, b) => a - b);
        //Aquellos valores que tengan una diferencia mayor a 1 con respecto al resto, se eliminaran
        non_repeated_values = filtrarNumerosConsecutivos(non_repeated_values);

        if(non_repeated_values.length >= 5){
            return true;
        }

        return false;
    }

    if(valueStreetCards.length == 0)
        return false;
    else if(valueStreetCards.length == 3)
        return forSpecificQuantity(hand,valueStreetCards.slice(0,3));
    else if(valueStreetCards.length == 4)
        return (forSpecificQuantity(hand,valueStreetCards.slice(0,4)) || forSpecificQuantity(hand,valueStreetCards.slice(0,3))); 
    else
        return (forSpecificQuantity(hand,valueStreetCards) || forSpecificQuantity(hand,valueStreetCards.slice(0,4)) || forSpecificQuantity(hand,valueStreetCards.slice(0,3))); 
}
function filtrarNumerosConsecutivos(arr) {

    const nuevoArreglo = [arr[0]];

    for (let i = 1; i < arr.length - 1; i++) {
        if (Math.abs(arr[i] - arr[i + 1]) == 1 && Math.abs(arr[i] - arr[i - 1]) == 1) {
            nuevoArreglo.push(arr[i]);
        }
    }

    // Asegurarse de incluir el último número si cumple la condición
    if (Math.abs(arr[arr.length - 1] - arr[arr.length - 2]) == 1) {
        nuevoArreglo.push(arr[arr.length - 1]);
    }

    return nuevoArreglo;
}
function diffValues(values){
    let aux = [];
    for(let c of values){
        if(!aux.includes(c))
            aux.push(c);
    }
    return aux;
}
function isColor(pintasRepeat, pintaStreetsCard){
    return ((pintasRepeat[0] == pintasRepeat[1] && pintasRepeat[0] == 4) || 
    (pintasRepeat[0] == 5 || pintasRepeat[1] == 5) || pintaStreetsRepeat(pintaStreetsCard).includes(5));
}
function isFullHouse(hand,valueStreetCards){
    let all_cards = valueStreetCards.concat([hand[0].substring(1),hand[1].substring(1)]);
    
    return valueStreetsRepeat(all_cards).includes(2) && valueStreetsRepeat(all_cards).includes(3);
}
function isPoker(hand,valueStreetCards){
    let all_cards = valueStreetCards.concat([hand[0].substring(1),hand[1].substring(1)]);
    
    return valueStreetsRepeat(all_cards).includes(4);
}
function isEscaleraColor(hand,valueStreetCards,pintasRepeat,pintaStreetCards){
    return (isColor(pintasRepeat, pintaStreetCards) && isEscalera(hand,valueStreetCards));
}
function isEscaleraReal(hand,valueStreetCards,pintasRepeat,pintaStreetCards){
    let all_values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
    let index_values_hand = [all_values.indexOf(hand[0].substring(1)),all_values.indexOf(hand[1].substring(1))];
    let index_values_street = [];

    for(let v of valueStreetCards)
        index_values_street.push(all_values.indexOf(v));

    index_values_street = index_values_street.concat(index_values_hand);

    index_values_street = diffValues(index_values_street);
    index_values_street.sort((a, b) => a - b);

    //Aquellos valores que tengan una diferencia mayor a 1 con respecto al resto, se eliminaran
    index_values_street = filtrarNumerosConsecutivos(index_values_street);
    
    return isEscaleraColor(hand,valueStreetCards,pintasRepeat,pintaStreetCards) 
    && (index_values_street.indexOf(12) != -1);
}

function updateStats(personalHand,rivalHand,index_mano_personal,index_mano_rival,deck){

    let favored_rival_hand = betterHand(rivalHand,index_mano_rival,deck);
    let favored_personal_hand = betterHand(personalHand,index_mano_personal,deck);

    /*Las manos que me favorecen a mi, no le favorecen a él, y viceversa.*/
    console.log(`Cartas que me favorecen la mano y quizas a mi rival --> (${favored_personal_hand.length}) ${favored_personal_hand}`);
    favored_personal_hand = favored_personal_hand.filter(c => !favored_rival_hand.includes(c));
    console.log(`Cartas que me favorecen solo a mi --> (${favored_personal_hand.length}) ${favored_personal_hand}`);

}
function updateGameInfo(personalHand,rivalHand,deck,streetMatch){

    let valueStreetCards = getValuesCard(streetMatch);
    let pintaStreetCards = getPintasCard(streetMatch);

    let index_mano_personal = indexTypeHand(personalHand,valueStreetCards,pintaStreetCards);
    let index_mano_rival = indexTypeHand(rivalHand,valueStreetCards,pintaStreetCards);
    console.log(`Mano personal --> ${MANOS[index_mano_personal]}`);
    console.log(`Mano rival --> ${MANOS[index_mano_rival]}`);
    updateHand(personalHand,rivalHand,index_mano_personal,index_mano_rival,getValuesCard(personalHand),getValuesCard(rivalHand),valueStreetCards,pintaStreetCards);
    updateStats(personalHand,rivalHand,index_mano_personal,index_mano_rival,deck);
}