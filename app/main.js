import CarController from "./components/car/CarController.js";
import JobController from "./components/job/JobController.js";


class App {
  constructor() {
    this.controllers = {
      // carController: new CarController(),
      jobController: new JobController()
    }
  }
}

window["app"] = new App()
