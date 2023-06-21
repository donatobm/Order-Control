const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

const getStates = async() => {
    const states = await prisma.states.findMany({
        select: { id: true, description: true }
    });
    return states;
}

const createState = async(description) => {
    let response = {
        success: true,
        message: "",
        state: {}
    }

    try {
        const state = await prisma.states.create({
            data: { description }
        });
        response = {
            ...response,
            message: `${description} state created`,
            state
        }
        console.log("\x1b[32m\x1b[1m\x1b[4m", "State Created");
    } catch(e) {
        console.log("\x1b[33m", e);
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            if(e.code == "P2002") {
                console.log("\x1b[34m\x1b[4m", `Unique constraint violated in the ${e.meta.target} field`);
                response = {
                    ...response,
                    success: false,
                    message: `The ${description} state already exists`
                }
            }
        }
        else if(e instanceof Prisma.PrismaClientUnknownRequestError) {
            console.log("\x1b[31m", "Unknown Error");
            console.log("\x1b[31m", `${e.name} ${e.message}`);
            response = {
                ...response,
                success: false,
                message: "Server Error: We're working on it!"
            }
        }
    }
    
    return response;
}

const updateState = async(desc, newDesc) => {
    let response = {
        success: true,
        message: "",
        newState: {}
    }
    try {
        const newState = await prisma.states.update({ 
            data: { description: newDesc },
            where: { description: desc }
        });
        response = {
            ...response,
            message: "State updated",
            newState
        }
        console.log("\x1b[32m\x1b[1m\x1b[4m", "State Updated");
    } catch(e) {
        console.log("\x1b[33m", e);
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            if(e.code == "P2025") {
                console.log("\x1b[34m\x1b[4m", e.meta.cause);
                response = {
                    ...response,
                    success: false,
                    message: `${desc} state doesn't exist`
                }
            }
        } else if(e instanceof Prisma.PrismaClientUnknownRequestError) {
            console.log("\x1b[31m", "Unknown Error");
            console.log("\x1b[31m", `${e.name} ${e.message}`);
            response = {
                ...response,
                success: false,
                message: "Server Error: We're working on it!"
            }
        }
    }
    return response;
}

const deleteState = async(description) => {
    let response = {
        success: true,
        message: "",
    }
    
    try {
        await prisma.states.delete({ where: { description } });
        response = {
            ...response,
            message: `${description} state was successfully removed`,
        }
        console.log("\x1b[32m\x1b[1m\x1b[4m", "State Removed");
    } catch(e) {
        console.log("\x1b[33m", e);
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            if(e.code == "P2025") {
                console.log("\x1b[34m\x1b[4m", `The ${description} state doesn't exist`);
                response = {
                    success: false,
                    message: `The ${description} state doesn't exist`
                }
            }
        } else if(e instanceof Prisma.PrismaClientUnknownRequestError) {
            console.log("\x1b[31m", "Unknown Error");
            console.log("\x1b[31m", `${e.name} ${e.message}`);
            response = {
                ...response,
                success: false,
                message: "Server Error: We're working on it!"
            }
        }
    }
    
    return response;
}

module.exports = {
    getStates,
    createState,
    updateState,
    deleteState
}