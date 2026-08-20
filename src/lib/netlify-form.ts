/** Netlify Forms — submissions must POST here (not "/" or any third-party URL). */
export const NETLIFY_FORM_NAME = "contact";
export const NETLIFY_FORM_ENDPOINT = "/__forms.html";

export async function submitNetlifyForm(form: HTMLFormElement): Promise<void> {
  const data = new FormData(form);

  if (!data.get("form-name")) {
    data.set("form-name", NETLIFY_FORM_NAME);
  }

  const response = await fetch(NETLIFY_FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
  });

  if (!response.ok) {
    throw new Error(String(response.status));
  }
}
