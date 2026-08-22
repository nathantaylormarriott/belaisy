/** Netlify Forms — submissions must POST to a static path, not the SSR handler. */
export const NETLIFY_FORM_NAME = "contact";
export const NETLIFY_FORM_ENDPOINT = "/forms.html";

function encodeFormData(form: HTMLFormElement) {
  const params = new URLSearchParams();

  for (const [key, value] of new FormData(form).entries()) {
    if (typeof value === "string") {
      params.append(key, value);
    }
  }

  if (!params.get("form-name")) {
    params.set("form-name", NETLIFY_FORM_NAME);
  }

  return params;
}

export async function submitNetlifyForm(form: HTMLFormElement): Promise<void> {
  const response = await fetch(NETLIFY_FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodeFormData(form).toString(),
  });

  if (!response.ok) {
    throw new Error(String(response.status));
  }
}
