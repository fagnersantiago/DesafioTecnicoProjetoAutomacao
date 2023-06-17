import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

app.use(express.json());

// Rota para criar uma pasta na API Gofile
app.post("/criar-pasta", async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.API_KEY;
    const { folderName } = req.body;

    const response = await axios.put("https://api.gofile.io/createFolder", {
      token: apiKey,
      parentFolderId: "dc1ace27-1e56-4217-ab80-88c3c610d331",
      folderName,
    });

    if (response.data.status === "ok") {
      res.status(200).json({ message: "Pasta criada com sucesso!" });
    } else {
      console.log("Response", response);
      res.status(501).json({ error: "Erro ao criar pasta na API Gofile" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao criar pasta na API Gofile" });
  }
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
