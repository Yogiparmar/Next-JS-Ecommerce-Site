import multiparty from "multiparty";
import { v2 as cloudinary } from "cloudinary";
import DbConnection from "@/lib/DbConnection";

await DbConnection();

cloudinary.config({
  cloud_name: "dx0zfer8a",
  api_key: "683427451189645",
  api_secret: "s9JQAZocdteJ2m8nM_v65hoz4NA",
});

export default async function handle(req, res) {
  const form = new multiparty.Form();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({ message: "Error parsing form" });
    }

    if (!files.file || !files.file.length) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadedImages = [];

    try {
      for (const file of files.file) {
        const result = await cloudinary.uploader.upload(file.path);
        uploadedImages.push(result.secure_url);
      }
      res.status(200).json({ links: uploadedImages });
    } catch (error) {
      console.error("Error uploading images to Cloudinary:", error);
      res.status(500).json({ message: "Error uploading images to Cloudinary" });
    }
  });
}

export const config = {
  api: { bodyParser: false },
};
