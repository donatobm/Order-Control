const { Router } = require("express");

const { getStates, createNewState, deleteState, updateState } = require("../controllers/states");

const router = Router();

router.get("/", getStates);

router.post("/:desc", createNewState);

router.delete("/:id", deleteState);

router.put("/:id/:newDesc", updateState);

module.exports = router;