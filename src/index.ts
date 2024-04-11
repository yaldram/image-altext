import { Ai } from "@cloudflare/ai";
import { Hono } from "hono";

// @ts-ignore: html file imports
import indexHtml from './components/index.html';

type Bindings = {
    AI: Ai;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", async (c) => {
  return c.html(indexHtml);
});

app.post("/generate-alt-texts", async (c) => {
  try {
    const { image } = await c.req.parseBody();
    const ai = new Ai(c.env.AI);

    if (image instanceof File) {
      const buffer = await image.arrayBuffer();
      const bytes = new Uint8Array(buffer);

      const { description: imageDescription } = await ai.run(
        "@cf/unum/uform-gen2-qwen-500m",
        {
            image: [...bytes],
            prompt: "",
            max_tokens: 120
        },
      );

      const messages = [
        {
          role: "system",
          content: `
            Generate 5 alt text descriptions not more than 125 characters in length for images to ensure accessibility, based on the provided image description. 
            Please refrain from explanations and focus solely on generating concise alt text descriptions.
            `
        },
        {
          role: "user",
          content: `Given an image description and user context, generate a concise and meaningful alt text for the image tag to be used in a web app. 
            Ensure that the alt text follows best practices for accessibility and accurately describes the content of the image.

            Image Description: ${imageDescription}
          `,
        },
      ];

      const altTextResponse = await ai.run("@hf/thebloke/zephyr-7b-beta-awq", {
        messages,
        stream: false
      });

      return c.json(altTextResponse);
    }

    return c.json({ message: "please select an image" });
  } catch (error) {
    return c.json({ error }, 500);
  }
});

export default app;