/**
 * Utility to download a remote image using fetch.
 * This converts the image to a blob and triggers a browser download.
 */
export async function downloadImage(url, filename = "openimage-artifact.jpg") {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch image");
    
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the object URL
    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error("Download failed:", error);
    // Fallback: target blank if fetch fails
    window.open(url, "_blank");
  }
}

/**
 * Utility to download an image in a specified format (PNG, JPEG, WebP)
 * using an offscreen canvas.
 */
export async function downloadImageAsFormat(
  url,
  format = "png",
  baseName = "openimage-artifact"
) {
  const normalizedFormat = format.toLowerCase();
  const extension = normalizedFormat === "jpeg" ? "jpg" : normalizedFormat;
  const fileName = `${baseName}.${extension}`;

  const mimeTypes = {
    png: "image/png",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    webp: "image/webp",
  };

  const targetMime = mimeTypes[normalizedFormat] || "image/png";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch image data");
    const originalBlob = await response.blob();
    const objectUrl = URL.createObjectURL(originalBlob);

    const convertedBlob = await new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth || img.width || 1024;
          canvas.height = img.naturalHeight || img.height || 1024;
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            URL.revokeObjectURL(objectUrl);
            resolve(originalBlob);
            return;
          }

          // For JPEG, fill background with white if alpha exists
          if (targetMime === "image/jpeg") {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          ctx.drawImage(img, 0, 0);

          canvas.toBlob(
            (blob) => {
              URL.revokeObjectURL(objectUrl);
              if (blob) {
                resolve(blob);
              } else {
                resolve(originalBlob);
              }
            },
            targetMime,
            0.95
          );
        } catch (err) {
          URL.revokeObjectURL(objectUrl);
          reject(err);
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Image element failed to load"));
      };
      img.src = objectUrl;
    });

    const downloadUrl = URL.createObjectURL(convertedBlob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  } catch (err) {
    console.warn("Format conversion failed, falling back to direct download:", err);
    await downloadImage(url, fileName);
  }
}

