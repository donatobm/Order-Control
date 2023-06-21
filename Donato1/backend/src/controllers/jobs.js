const jobsServices = require("../services/jobs");

const getJobs = async(_, res) => {
    const jobs = await jobsServices.getJobs();
    res.json(jobs);
}

const createNewJob = async(req, res) => {
    const { success, message, job } = await jobsServices.createJob(req.params.id);
    const response = { message, job };
    res.status(success ? 200 : 409).json({ ...response })
}

const deleteJob = async(req, res) => {
    const { success, message } = await jobsServices.deleteJob(req.params.id);
    res.status(success ? 200 : 404).json({ message });
}

const updateJob = async(req, res) => {
    const { id, newDesc } = req.params;
    const { success, message, newJob } = await jobsServices.updateJob(id, newDesc);
    res.status(success ? 200 : 404).json({ message, newJob });
}

module.exports = {
    getJobs,
    createNewJob,
    deleteJob,
    updateJob
};