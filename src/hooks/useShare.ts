export type ShareResult = "shared" | "copied" | "cancelled" | "failed";

export async function shareOrCopyText(text: string, title?: string): Promise<ShareResult> {
  if (navigator.share) {
    try {
      await navigator.share({ text, title });
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return "cancelled";
      }
      // segue para o fallback de cópia se o compartilhamento nativo falhar por outro motivo
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    return "copied";
  } catch {
    return "failed";
  }
}
