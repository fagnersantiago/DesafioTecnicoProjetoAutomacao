import { Request, Response } from "express";
import { AutomationUseCase } from "./automation.useCase";

export class AutomationController {
  constructor(private automationUseCase: AutomationUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      await this.automationUseCase.runAutomation();
      return res.status(200).json({ message: "Automation executed." });
    } catch (error) {
      console.error("An error occurred:", error);
      return res.status(500).json({ error: "An error occurred." });
    }
  }
}
