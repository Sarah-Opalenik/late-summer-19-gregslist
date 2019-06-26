import Car from "../../models/Car.js";

// @ts-ignore
let _carApi = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/cars',
})

let _state = {
  cars: []
}

let _subscribers = {
  cars: []
}


function setState(propName, data) {
  _state[propName] = data
  _subscribers[propName].forEach(fn => fn());
}

export default class CarService {
  placeBid(carId) {
    let carToUpdate = this.Cars.find(c => c._id == carId)
    if (!carToUpdate) return alert("car doesn't exist here")
    carToUpdate.price *= 1.1
    _carApi.put(carId, carToUpdate)
      .then(res => {
        let cars = this.Cars
        let index = cars.findIndex(c => c._id == carId)
        // cars.splice(index, 1, carToUpdate) //replaces old object with a new one (carToUpdate)
        cars[index].price = carToUpdate.price //updates price property on existing object
        setState('cars', cars)
      })
  }
  purchase(carId) {
    _carApi.delete(carId)
      .then(() => {
        let cars = this.Cars
        let index = cars.findIndex(c => c._id == carId)
        cars.splice(index, 1)
        setState('cars', cars)
      })
      .catch(err => console.error(err))
  }
  getCars() {
    _carApi.get('')
      .then(res => {
        let serverCars = res.data.data
        let cars = serverCars.map(c => new Car(c))
        setState("cars", cars)
      })
      .catch(err => console.error(err))
  }
  addSubscriber(propName, fn) {
    _subscribers[propName].push(fn)
  }


  get Cars() {
    return _state.cars.map(car => new Car(car))
  }

  addCar(newCar) {
    _carApi.post('', newCar)
      .then(res => {
        let serverCar = res.data.data
        let car = new Car(serverCar)
        let cars = this.Cars
        cars.unshift(car)
        setState('cars', cars)
      })
      .catch(err => console.error(err))

  }

}