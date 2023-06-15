import { UserRepository } from "./repository/automationRepository";

export class AutomationUseCase {
  constructor(private userRepository: UserRepository) {}

  async runAutomation(): Promise<void> {
    const limit = 5;
    const totalPages = 10;

    for (let page = 1; page <= totalPages; page++) {
      const users = await this.userRepository.getUsers(page, limit);

      for (const user of users) {
        const convertedUser = await this.userRepository.convertUser(user);
        await this.userRepository.saveUser(convertedUser);
      }
    }
  }
}
