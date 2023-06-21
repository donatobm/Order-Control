const statesServices = require("../services/states");

const getStates = async(_, res) => {
    const states = await statesServices.getStates();
    res.json(states);
}

const createNewState = async(req, res) => {
    const { success, message, state } = await statesServices.createState(req.params.desc);
    const response = { message, state };
    res.status(success ? 200 : 409).json(response)
}

const deleteState = async(req, res) => {
    const { success, message } = await statesServices.deleteState(req.params.id);
    res.status(success ? 200 : 404).json({ message });
}

const updateState = async(req, res) => {
    const { id, newDesc } = req.params;
    const { success, message, newState } = await statesServices.updateState(id, newDesc);
    res.status(success ? 200 : 404).json({ message, newState });
}

module.exports = {
    getStates,
    createNewState,
    deleteState,
    updateState
};