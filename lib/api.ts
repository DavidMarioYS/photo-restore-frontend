import { client } from "@gradio/client";

export async function restorePhoto(fileBlob: File | Blob) {
  try {
    const app = await client("DavidMarioYS/photo-restore-api");
    
    // Ubah dari "/restore_image" menjadi "/restore" sesuai endpoint yang valid
    const result = await app.predict("/restore", {
      img: fileBlob, 
    });
    
    return (result.data as any)[0].url;
  } catch (error) {
    console.error("DETAIL ERROR GRADIO:", error);
    throw error;
  }
}