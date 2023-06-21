const clientsServices = require("../services/clients");

const getClients = async(_, res) => {
    const clients = await clientsServices.getClients();
    res.json(clients);
}

const createNewClient = async(req, res) => {
    const { success, message, client } = await clientsServices.createClient(req.params.description);
    const response = { message, client };
    res.status(success ? 200 : 409).json({ ...response })
}

const deleteClient = async(req, res) => {
    const { success, message } = await clientsServices.deleteClient(req.params.id);
    res.status(success ? 200 : 404).json({ message });
}

const updateClient = async(req, res) => {
    const { id, newName } = req.params;
    const { success, message, newClient } = await clientsServices.updateClient(id, newName);
    res.status(success ? 200 : 404).json({ message, newClient });
}

module.exports = {
    getClients,
    createNewClient,
    deleteClient,
    updateClient
};