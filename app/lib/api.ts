export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.append("ngrok-skip-browser-warning", "true");

  headers.append("Content-Type", "application/json");

  const response = await fetch(url, {
    ...options,
    headers,
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

export async function apiPost<T>(
  url: string,
  data: T,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.append("ngrok-skip-browser-warning", "true");

  headers.append("Content-Type", "application/json");

  const response = await fetch(url, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
    headers,
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

export async function apiPut<T>(
  url: string,
  data: T,
  options: RequestInit = {}
) {
  const headers = new Headers(options.headers);
  headers.append("ngrok-skip-browser-warning", "true");

  headers.append("Content-Type", "application/json");

  const response = await fetch(url, {
    ...options,
    method: "PUT",
    body: JSON.stringify(data),
    headers,
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
}

export async function apiDelete(url: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers);
  headers.append("ngrok-skip-browser-warning", "true");

  const response = await fetch(url, {
    ...options,
    method: "DELETE",
    headers,
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
}
