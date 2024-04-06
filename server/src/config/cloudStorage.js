import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";

dotenv.config();

const cloudStorage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFile: process.env.GCS_KEYFILE,
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY,
  },
});

export default cloudStorage;
