import Job from "../../models/Job.js";

// @ts-ignore
let _jobApi = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/jobs'
})

let _state = {
  jobs: [],
  savedJobs: []
}

let _subscribers = {
  jobs: [],
  savedJobs: []
}

function setState(propName, data) {
  _state[propName] = data
  _subscribers[propName].forEach(fn => fn())
}


export default class JobService {
  constructor() {
    console.log("Job service works!")
  }
  getJobs() {
    _jobApi.get('')
      .then(res => {
        let serverJobs = res.data.data
        let jobs = serverJobs.map(j => new Job(j))
        setState("jobs", jobs)
      })
      .catch(err => console.error(err))
  }

  addJob(newJob) {
    _jobApi.post('', newJob)
      .then(res => {
        let serverJob = res.data.data
        let job = new Job(serverJob)
        let jobs = this.Jobs
        jobs.unshift(job)
        setState('jobs', jobs)
      })
  }
  get Jobs() {
    return _state.jobs.map(j => new Job(j))
  }
  get savedJobs() {
    return _state.savedJobs.map(j => new Job(j))
  }
  addSubscriber(propName, fn) {
    _subscribers[propName].push(fn)
  }
  saveJob(jobId) {
    let job = _state.jobs.find(j => j._id == jobId)
    let temp = _state.savedJobs
    if (!temp.includes(job)) {
      temp.push(job)
    }
    setState("savedJobs", temp)
    console.log(temp)
  }
  deleteJob(jobId) {
    // debugger
    let job = _state.savedJobs.find(j => j._id == jobId)
    let jobs = this.savedJobs
    let index = _state.savedJobs[job]
    // let index = job.findIndex(job)
    jobs.splice(index, 1)
    setState("savedJobs", jobs)
  }
}