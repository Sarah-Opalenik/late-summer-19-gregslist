import JobService from "./JobService.js";

let _jobService = new JobService()

function drawJobs() {
  let jobsElem = document.querySelector("#jobs")
  let template = ''
  let jobs = _jobService.Jobs
  jobs.forEach(car => {
    template += car.Template
  })
  jobsElem.innerHTML = template
}

function drawSavedJobs() {
  let savedJobsElem = document.querySelector("#saved-jobs")
  let savedJobs = _jobService.savedJobs
  let template = ''
  savedJobs.forEach(j => {
    template += j.Template
  })
  savedJobsElem.innerHTML = template
}

export default class JobController {
  constructor() {
    console.log("Job controller works!")
    _jobService.getJobs()
    _jobService.addSubscriber('jobs', drawJobs)
    _jobService.addSubscriber('savedJobs', drawSavedJobs)
  }
  addJob(e) {
    e.preventDefault()
    let form = e.target

    let newJob = {
      company: form.company.value,
      jobTitle: form.jobTitle.value,
      hours: form.hours.value,
      rate: form.rate.value,
      description: form.description.value
    }
    _jobService.addJob(newJob)
    form.reset()
  }
  saveJob(jobId) {
    _jobService.saveJob(jobId)
  }
  deleteJob(jobId) {
    _jobService.deleteJob(jobId)
  }
}