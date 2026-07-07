import { toBlob } from "html-to-image";

export type ShareImageResult = "shared" | "downloaded" | "failed";

export async function shareOrDownloadImage(
  node: HTMLElement,
  fileName: string,
  backgroundColor: string,
): Promise<ShareImageResult> {
  try {
    const blob = await toBlob(node, { pixelRatio: 2, backgroundColor });
    if (!blob) return "failed";

    const file = new File([blob], fileName, { type: "image/png" });

    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: "Times do vôlei" });
        return "shared";
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return "failed";
        }
      }
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    return "downloaded";
  } catch (error) {
    console.error("Failed to generate/share image", error);
    return "failed";
  }
}
