export default class Job {
  constructor(data) {
    this._id = data._id
    this.company = data.company
    this.jobTitle = data.jobTitle
    this.hours = data.hours
    this.rate = data.rate
    this.description = data.description
  }

  get Template() {
    return `
      <div class="col-4">
        <div class= "card m-1">
          <h4 class="card-header card-title">Title: ${this.jobTitle}</h4>
          <div class= "card-body">
           <h4>Company: ${this.company}</h4>
           <h4>Hours: ${this.hours}</h4>
           <h4>Rate: ${this.rate}</h4>
           <p>${this.description}</p>
          </div>
          <div class="card-footer">
            <button onclick="app.controllers.jobController.saveJob('${this._id}')" class="btn btn-success">Save Job</button>
            <button onclick="app.controllers.jobController.deleteJob('${this._id}')" class="btn btn-danger">Delete Job</button>
        </div>
        </div>
      </div>
  `
  }

}

// company: { type: String, required: true },
// jobTitle: { type: String, required: true },
// hours: { type: Number, required: true },
// rate: { type: Number, required: true },
// description: { type: String }  

