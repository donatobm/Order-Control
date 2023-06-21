const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

const getClients = async() => {
    const clients = await prisma.clients.findMany({
        select: { id: true, name: true }
    });
    return clients;
}

const createClient = async(name) => {
    let response = {
        success: true,
        message: "",
        client: {}
    }

    try {
        const client = await prisma.clients.create({
            data: { name }
        });
        response = {
            ...response,
            message: `${name} stored in Clients`,
            client
        }
        console.log("\x1b[32m\x1b[1m\x1b[4m", "New Client Stored");
    } catch(e) {
        console.log("\x1b[33m", e);
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            if(e.code == "P2002") {
                console.log("\x1b[34m\x1b[4m", `Unique constraint violated in the ${e.meta.target} field`);
                response = {
                    ...response,
                    success: false,
                    message: `${name} is a client already`
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

const updateClient = async(id, newName) => {
    let response = {
        success: true,
        message: "",
        newClient: {}
    }
    try {
        const newClient = await prisma.clients.update({
            data: { name: newName },
            where: { id }
        });
        response = {
            ...response,
            message: "Client updated",
            newClient
        }
        console.log("\x1b[32m\x1b[1m\x1b[4m", "Client Updated");
    } catch(e) {
        console.log("\x1b[33m", e);
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            if(e.code == "P2025") {
                console.log("\x1b[34m\x1b[4m", e.meta.cause);
                response = {
                    ...response,
                    success: false,
                    message: `Client doesn't exist`
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

const deleteClient = async(id) => {
    let response = {
        success: true,
        message: "",
    }
    
    try {
        await prisma.clients.delete({ where: { id } });
        response = {
            ...response,
            message: `Client removed`,
        }
        console.log("\x1b[32m\x1b[1m\x1b[4m", "Client Removed");
    } catch(e) {
        console.log("\x1b[33m", e);
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            if(e.code == "P2025") {
                console.log("\x1b[34m\x1b[4m", `This doesn't exist`);
                response = {
                    success: false,
                    message: `The client doesn't exist`
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
    getClients,
    createClient,
    updateClient,
    deleteClient
}