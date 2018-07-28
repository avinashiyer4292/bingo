// This number fetches the next number for the bingo game
// it uses a Set to find if number is already selected or not so that there are no duplicates
// within each grid
const set = new Set();

var getNextNumber = ()=>{
    var number = getRandomNumber();
    while(set.has(number)){
        number = getRandomNumber();
    }
    set.add(number);
    return number;
}


// This function gets a random number between 1 and 100
var getRandomNumber = () => {
    return Math.floor (Math.random() * (100)) + 1;
}

//This function gets all 25 values for each ticket, is called the first time application starts
var getAllTickets = () => {
    var listOfSets=[]
    for(var i=0;i<4;i++){
        let set = new Set();
        while(set.size!=25){
            var number = getRandomNumber();
            if(!set.has(number)){
                set.add(number);
            }      
        }
        let array = Array.from(set)
        listOfSets.push(array);
    }
    return listOfSets;
}

// This function checks whether bingo claim made by any player is true or not
// For the list of values received for that particular ticket, we check if each value X,
// If even one value is not X, the claim is false 
var checkBingoClaim = (list) => {
    let result = list.every( val => {
        return val === 'X'
    })
    return (result == false) ? 1 : 0;
}

module.exports = {
    getNext : getNextNumber,
    getAllTickets: getAllTickets,
    checkBingoClaim: checkBingoClaim
};
