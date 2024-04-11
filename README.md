# Cloudflare AI Image to Text

As a developer, prioritizing accessibility in web design has always been crucial. Crafting meaningful alt text for images, especially in consumer-facing websites, presents a challenge. Each image tells a unique story, from simple depictions to intricate scenes. Leveraging Cloudflare's models, I embarked on a project to streamline this process. My solution? An alt text generator capable of producing five descriptive alt texts for any given image. Now, developers can effortlessly ensure accessibility without compromising on quality.

### Working 
![Ai text demo](https://pub-2e209747425f40cdacae2d98eae729f3.r2.dev/ai-text-demo.png)


Upload your image, wait briefly, and instantly receive the top 5 generated alt texts for accessibility.

### Api Details
- **"/"**: Serves the index.html file, providing the entry point for the application.
- **"/generate-alt-texts"**: It first utilizes Cloudflare's image-to-text model, `@cf/unum/uform-gen2-qwen-500m`, to generate a description of the image. This description is then fed into the text generation model, `@hf/thebloke/zephyr-7b-beta-awq`, to produce the alt texts

### Tech Stack
- **Cloudflare Worker**: The backbone of our solution, enabling serverless execution at the edge of the network.
- **TypeScript**: Leveraging the power of static typing for increased reliability and developer productivity.
- **Hono Framework**: Providing a structured approach to API development, ensuring robustness and scalability for our endpoints.

### Installation

- Make sure you have the [cloudflare cli](https://developers.cloudflare.com/workers/get-started/guide/) installed.
- Clone the respository.
- Run `npm install`.
- To run the codebase locally run `wrangler dev`.
- To deploy the codebase run `wrangler deploy`.