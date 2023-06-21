const { Router } = require("express");

const { getJobs, createNewJob, updateJob, deleteJob } = require("../controllers/jobs");

const router = Router();

router.get("/", getJobs);

router.post("/:id", createNewJob);

router.delete("/:id", deleteJob);

router.put("/:id/:newDesc", updateJob);

module.exports = router;