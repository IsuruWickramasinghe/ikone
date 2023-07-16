import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: `${import.meta.env.VITE_SANITY_PROJECT_ID}`,
  dataset: 'production',
  apiVersion: '2023-07-11',
  useCdn: true,
  token: `${import.meta.env.VITE_SANITY_PROJECT_TOKEN}`,
  ignoreBrowserTokenWarning: true
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;
