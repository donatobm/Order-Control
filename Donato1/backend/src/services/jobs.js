const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

const getJobs = async() => {
    const jobs = await prisma.jobs.findMany({
        select: { id: true, description: true }
    });
    return jobs;
}

const createJob = async(description) => {
    let response = {
        success: true,
        message: "",
        job: {}
    }

    try {
        const job = await prisma.jobs.create({
            data: { description }
        });
        response = {
            ...response,
            message: `${description} job created`,
            job
        }
        console.log("\x1b[32m\x1b[1m\x1b[4m", "Job Created");
    } catch(e) {
        console.log("\x1b[33m", e);
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            if(e.code == "P2002") {
                console.log("\x1b[34m\x1b[4m", `Unique constraint violated in the ${e.meta.target} field`);
                response = {
                    ...response,
                    success: false,
                    message: `The ${description} job already exists`
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

const updateJob = async(desc, newDesc) => {
    let response = {
        success: true,
        message: "",
        newJob: {}
    }
    try {
        const newJob = await prisma.jobs.update({
            data: { description: newDesc },
            where: { description: desc }
        });
        response = {
            ...response,
            message: "Job updated",
            newJob
        }
        console.log("\x1b[32m\x1b[1m\x1b[4m", "Job Updated");
    } catch(e) {
        console.log("\x1b[33m", e);
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            if(e.code == "P2025") {
                console.log("\x1b[34m\x1b[4m", e.meta.cause);
                response = {
                    ...response,
                    success: false,
                    message: `${desc} job doesn't exist`
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

const deleteJob = async(description) => {
    let response = {
        success: true,
        message: "",
    }
    
    try {
        await prisma.jobs.delete({ where: { description } });
        response = {
            ...response,
            message: `${description} job was successfully removed`,
        }
        console.log("\x1b[32m\x1b[1m\x1b[4m", "Job Removed");
    } catch(e) {
        console.log("\x1b[33m", e);
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            if(e.code == "P2025") {
                console.log("\x1b[34m\x1b[4m", `The ${description} job doesn't exist`);
                response = {
                    success: false,
                    message: `The ${description} job doesn't exist`
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
    getJobs,
    createJob,
    updateJob,
    deleteJob
}