'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

//exo1 exo2
function price(rentals,cars) {
  var time = 0;
  var reduc = 1;
  for (var i = 0; i < rentals.length; i++) {
    time = new Date(rentals[i].returnDate) - new Date(rentals[i].pickupDate);
    time /= (1000*60*60*24);
    time++;
    for (var j = 0; j < cars.length; j++) {
      if(rentals[i].carId == cars[j].id) {
        rentals[i].price = rentals[i].distance * cars[j].pricePerKm;
        if(time>1) reduc = 0.9;
        else if(time>4) reduc = 0.7;
        else if(time>10) reduc = 0.5;
        rentals[i].price += time * cars[j].pricePerDay * reduc;
      }
    }
  }
}

//exo3
function commission (rentals) {
  var com = 0;
  for (var i = 0; i < rentals.length; i++) {
    com = rentals[i].price * 0.3;

    rentals[i].commission.insurance = com / 2;

    var time = new Date(rentals[i].returnDate) - new Date(rentals[i].pickupDate);
    time /= (1000*60*60*24);
    time++;
    rentals[i].commission.assistance = time;

    com -= rentals[i].commission.insurance ;
    com -= rentals[i].commission.assistance ;

    rentals[i].commission.drivy = com;
  }
}

//exo4
function Options (rentals) {
  for (var i = 0; i < rentals.length; i++) {
    var time = new Date(rentals[i].returnDate) - new Date(rentals[i].pickupDate);
    time /= (1000*60*60*24);
    time++;
    if (rentals[i].options.deductibleReduction == true) {
      rentals[i].price += 4 * time;
      rentals[i].commission.drivy += 4 * time;
    }
  }
}

//exo5
function PayActors (rentals,actors) {
  for (var i = 0; i < rentals.length; i++) {
    for (var j = 0; j < actors.length; j++) {
      if (rentals[i].id == actors[j].rentalId) {
        actors[j].payment[0].amount = rentals[i].price;
        actors[j].payment[1].amount = rentals[i].price - (rentals[i].commission.insurance + rentals[i].commission.drivy + rentals[i].commission.assistance);
        actors[j].payment[2].amount = rentals[i].commission.insurance;
        actors[j].payment[3].amount = rentals[i].commission.assistance;
        actors[j].payment[4].amount = rentals[i].commission.drivy;
      }
    }
  }
}

price(rentals,cars);
commission(rentals);
Options (rentals);
PayActors(rentals,actors);
console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
