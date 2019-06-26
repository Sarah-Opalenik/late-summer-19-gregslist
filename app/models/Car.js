export default class Car {
  constructor(data) {
    this._id = data._id
    this.make = data.make || ''
    this.model = data.model || ''
    this.year = data.year || NaN
    this.price = data.price || NaN
    this.imgUrl = data.imgUrl || ''
    this.description = data.description || ''
  }

  get Template() {
    return `
    <div class="col-4">
      <div class="card m-1">
        <img src="${this.imgUrl}" alt="car photo" class="card-img-top" />
        <div class="card-body">
          <h4>Make: ${this.make}</h4>
          <h4>Model: ${this.model}</h4>
          <h4>Year: ${this.year}</h4>
          <p>Price: ${this.price}</p>
          <p>${this.description}</p>
        </div>
        <div class="card-footer">
          <button onclick="app.controllers.carController.placeBid('${this._id}')" class="btn btn-success">Place Bid</button>
          <button onclick="app.controllers.carController.purchase('${this._id}')" class="btn btn-primary">Buy Car</button>
        </div>
      </div>
    </div>
    `
  }

}
