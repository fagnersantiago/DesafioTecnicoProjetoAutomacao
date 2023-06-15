import express, { Router } from "express";
import { MongoClient } from "mongodb";
import { AutomationController } from "./modules/automation/automation.controller";
import { AutomationUseCase } from "./modules/automation/automation.useCase";
import { UserRepository } from "./modules/automation/repository/automationRepository";
import cron from "node-cron";

import axios from "axios";

const router = Router();
const app = express();
const dbName = "DatabaseTesteSemantixAutomação";
const url = process.env.MONGODB_ACCESS;

const client = new MongoClient(url);
const userRepository = new UserRepository(client, dbName);
const automationUseCase = new AutomationUseCase(userRepository);
const automationController = new AutomationController(automationUseCase);

router.get("/execute-automation", (req, res) =>
  automationController.execute(req, res)
);
cron.schedule("*/20 * * * *", async () => {
  try {
    const response = await axios.get(
      "http://localhost:3333/execute-automation"
    );
    console.log("Execultando", response.data);
  } catch (error) {
    console.error(error);
  }
});

app.use(express.json());
app.use(router);

export { app };
