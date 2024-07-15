'use strict';

//Challenge 1
console.log("Challenge 1");
let Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
};

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};

let audi = new Car("Audi", 65);
audi.accelerate();
audi.brake();

//Challenge 2
console.log("Challenge 2");

class Car1 {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }
    accelerate() {
        this.speed += 10;
        console.log(`${this.make} is going at ${this.speed} km/h`);
    }

    brake() {
        this.speed -= 5;
        console.log(`${this.make} is going at ${this.speed} km/h`);
    }

    get speedUS() {
        return this.speed / 1.6;
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
    }
}

let honda = new Car1('Honda', 45);
console.log(honda.make);


//Challene 3
console.log("Challenge 3");

let ev = function (make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
}

ev.prototype = Object.create(Car.prototype);

ev.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
}


ev.prototype.accelerate = function () {
    this.speed += 20;
    this.charge--;
    console.log(
        `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`);
};

let ola = new ev('OLA', 50, 75);
ola.accelerate();

//Challenge 4
console.log('Challenge 4');

class ev1 extends Car1 {
    #charge;
    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }


    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
        // return this;
    }

    accelerate() {
        this.speed += 20;
        this.#charge--;
        console.log(
            `${this.make} is going at ${this.speed} km/h, with a charge of ${this.#charge
            }`
        );
        // return this;
    }
}

const rivian = new ev1('Rivian', 120, 23);
console.log(rivian);
rivian.accelerate();