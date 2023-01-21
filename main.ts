import express, { Request, Response } from "express";
import axios from "axios";

const app = express();

app.get("", async (req: Request, res: Response) => {
  return await postToGithub(req, res);
});

app.post("", async (req: Request, res: Response) => {
  return await postToGithub(req, res);
});

app.put("", async (req: Request, res: Response) => {
  return await postToGithub(req, res);
});

app.patch("", async (req: Request, res: Response) => {
  return await postToGithub(req, res);
});

async function postToGithub(req: Request, res: Response) {
  const query = req.query;

  const apikey = query.apikey;
  if (apikey !== process.argv[2]) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    const url = query.url as string;
    const headers = JSON.parse(query.headers as string);
    const data = JSON.parse(query.data as string);

    const result = await axios.post(url, data, { headers });

    if (
      result.status === 200 ||
      result.status === 201 ||
      result.status === 202 ||
      result.status === 203 ||
      result.status === 204 ||
      result.status === 205 ||
      result.status === 206
    ) {
      return res
        .json({ message: "Successful call of Github action" })
        .status(200);
    }

    return res
      .json({
        message:
          "Github rejected the request with the following stacktrace:\n" +
          JSON.stringify(res.statusMessage),
      })
      .status(500);
  } catch (e: any) {
    return res.json({ message: e.message }).status(500);
  }
}

app.listen(3000, () => console.log("API proxy listening on port 3000"));
