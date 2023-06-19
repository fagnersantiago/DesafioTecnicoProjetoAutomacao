import axios from "axios";
import { parseStringPromise } from "xml2js";
import { Collection, MongoClient } from "mongodb";
import { configDotenv } from "dotenv";

configDotenv();

interface User {
  createdAt: string;
  firstName: string;
  avatar: string;
  email: string;
  lastName: string;
  id: number;
}

interface ConvertedUser {
  fullName: string;
  email: string;
  address: string;
  addressNumber: number;
  phoneNumber: string;
}

export class UserRepository {
  private collection: Collection<ConvertedUser>;

  constructor(private client: MongoClient, private dbName: string) {
    const db = this.client.db(this.dbName);
    this.collection = db.collection<ConvertedUser>("users");
  }

  async getUsers(page: number, limit: number): Promise<User[]> {
    const url = process.env.URL_API + `?page=${page}&limit=${limit}`;
    console.log(url);
    const response = await axios.get(url, {
      auth: {
        username: process.env.USERNAME,
        password: process.env.PASSOWORD,
      },
    });
    console.log("Response", response.data.username);
    const xmlData = response.data;
    const jsonData = await parseStringPromise(xmlData);
    const usersList = jsonData?.data?.usersList?.[0]?.item || [];
    const users: User[] = usersList.map((item: any) => ({
      createdAt: item.createdAt[0],
      firstName: item.firstName[0],
      avatar: item.avatar[0],
      email: item.email[0],
      lastName: item.lastName[0],
      id: Number(item.id[0]),
    }));
    return users;
  }

  async convertUser(user: User): Promise<ConvertedUser> {
    const address = "";
    const addressNumber = 0;
    const phoneNumber = "";

    const fullName = `${user.firstName} ${user.lastName}`;

    return {
      fullName,
      email: user.email,
      address,
      addressNumber,
      phoneNumber,
    };
  }

  async saveUser(user: ConvertedUser): Promise<void> {
    await this.collection.insertOne(user);
  }
}
