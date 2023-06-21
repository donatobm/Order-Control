-- CreateTable
CREATE TABLE "Clients" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" VARCHAR(50) NOT NULL,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employees" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(30) NOT NULL,
    "jobs_id" UUID,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jobs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" VARCHAR(50) NOT NULL,

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteAt" TIMESTAMP(3) NOT NULL,
    "states_id" UUID,
    "employees_id" UUID,
    "clients_id" UUID,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "States" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" VARCHAR(50) NOT NULL,

    CONSTRAINT "States_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_jobs_id_fkey" FOREIGN KEY ("jobs_id") REFERENCES "Jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_clients_id_fkey" FOREIGN KEY ("clients_id") REFERENCES "Clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "Employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_states_id_fkey" FOREIGN KEY ("states_id") REFERENCES "States"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
