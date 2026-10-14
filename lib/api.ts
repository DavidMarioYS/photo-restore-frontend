import { client } from "@gradio/client";

export async function restorePhoto(fileBlob: File | Blob) {
  try {
    // Menghubungkan ke backend Hugging Face Space Anda
    const app = await client("DavidMarioYS/photo-restore-api");

    // Memanggil endpoint fungsi restorasi di app.py
    const result = await app.predict("/restore_image", {
      img: fileBlob, 
    });

    // Mengembalikan URL hasil gambar restorasi
    return (result.data as any)[0].url;
  } catch (error) {
    console.error("Gagal melakukan restorasi foto:", error);
    throw error;
  }
}