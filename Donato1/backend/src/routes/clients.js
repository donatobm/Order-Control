const { Router } = require("express");

const { getClients, createNewClient, updateClient, deleteClient } = require("../controllers/clients");

const router = Router();

router.get("/", getClients);

router.post("/:description", createNewClient);

router.delete("/:id", deleteClient);

router.put("/:id/:newName", updateClient);

module.exports = router;