// This number fetches the next number for the bingo game
// it uses a Set to find if number is already selected or not so that there are no duplicates
// within each grid
const set = new Set();

var getNextNumber = ()=>{
    var number = getRandomNumber();
    while(set.has(number)){
        number = getRandomNumber();
    }
    //console.log(`Number: ${number} , set: ${JSON.stringify(set)}`);
    set.add(number);
    return number;
}


// This function gets a random number between 1 and 100
var getRandomNumber = () => {
    return Math.floor (Math.random() * (100)) + 1;
}

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


var checkBingoClaim = (list) => {

    // console.log(`List is : ${list}, ${JSON.stringify(list)}`)
    // let res = list.map( (curr, index) => {
    //     console.log(`Curr : ${curr}`)
    //     if(curr != 'X'){
    //         console.log(`oH BCCCCC!!!`)
    //         return 1;
    //     }
            
    // });

    let result = list.every( val => {
        return val === 'X'
    }) 

    // let i=0, res;
    // while(i < list.length){
    //     if(list[i]!= 'X'){

    //         res= 1;
    //     }
    //     i++;
    // }
    console.log(`Result :${result}`)
    return (result == false) ? 1 : 0;
}

module.exports = {
    getNext : getNextNumber,
    getAllTickets: getAllTickets,
    checkBingoClaim: checkBingoClaim
};
