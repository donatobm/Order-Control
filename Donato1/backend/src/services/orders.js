const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getOrders = async() => {
    const orders = await prisma.orders.findMany({
        select: { 
            createdAt: true, 
            deleteAt: true,
            Clients : {
                select: { name: true }
            },
            Employees: {
                select: { name: true }
            },
            States: {
                select: { description: true }
            }
        },
    });
    return orders;
};

module.exports = {
    getOrders
}