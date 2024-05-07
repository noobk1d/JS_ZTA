'use strict';

//Challenge 1
console.log("Challenge 1");
const dogsJulia = [2, 5, 1, 6, 3];
const dogsAria = [1, 4, 3, 2, 6];

function checkDogs(dogsJ, dogsA) {
    const dogsJCorected = dogsJ.slice();
    dogsJCorected.splice(0, 1);
    dogsJCorected.splice(-2);
    const dogs = dogsJCorected.concat(dogsA);
    console.log(dogs);

    dogs.forEach((age, i) => {
        if (age >= 3) {
            console.log(`Dog number ${i + 1} is an Adult🦮`)
        } else {
            console.log(`Dog number ${i + 1} is still a puppy🐶`)
        }
    });
}

checkDogs(dogsJulia, dogsAria);

//Challenge 2
console.log("Challenge 2");

let testdata1 = [5, 2, 4, 1, 15, 8, 3];
let testdata2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (ages) {
    const humanAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4);
    const adults = humanAges.filter(age => age >= 18);
    console.log(adults);
    const averageAge = adults.reduce((acc, age) => acc + age, 0) / adults.length;
    // console.log(averageAge);
    return averageAge;
}

console.log(calcAverageHumanAge(testdata1));
console.log(calcAverageHumanAge(testdata2).toFixed(2));

//Challenge 3
console.log("Challenge 3");

const calcAverageHumanAge2 = ages => {
    const humanAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4);
    const adults = humanAges.filter(age => age >= 18);
    console.log(adults);
    const averageAge = adults.reduce((acc, age) => acc + age, 0) / adults.length;
    // console.log(averageAge);
    return averageAge;
};
console.log(calcAverageHumanAge2(testdata1));

//Challenge 4
console.log("Challenge 4");
//TEST DATA:
const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] }
];

//1
dogs.forEach(dog => dog.recFood = Math.trunc((dog.weight ** 0.75 * 28)));
console.log(dogs);

//2
let dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(`Sarah's dog is eating too ${dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'}`);

//3
const ownertoomuch = dogs.filter(dog => dog.curFood > dog.recFood).flatMap(dog => dog.owners);
console.log(ownertoomuch);

const ownertoolittle = dogs.filter(dog => dog.curFood < dog.recFood).flatMap(dog => dog.owners);
console.log(ownertoolittle);

//4
console.log(`${ownertoomuch.join(' and ')} eat too much.`);
console.log(`${ownertoolittle.join(' and ')} eat too much.`);

//5
console.log(dogs.some(dog => dog.curFood === dog.recFood));

//6
let checkEatingOkhay = dog => dog.curFood > dog.recFood * 0.90 && dog.curFood > dog.recFood ** 1.10;
console.log(dogs.some(checkEatingOkhay));

//7
console.log(dogs.filter(checkEatingOkhay));

//8
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);