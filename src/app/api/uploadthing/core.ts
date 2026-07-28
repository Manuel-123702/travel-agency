import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const authHandler = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  documentUploader: f({ 
    image: { maxFileSize: "4MB", maxFileCount: 10 },
    pdf: { maxFileSize: "16MB", maxFileCount: 10 },
    "application/msword": { maxFileSize: "8MB", maxFileCount: 10 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "8MB", maxFileCount: 10 },
  })
    .middleware(() => authHandler())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
