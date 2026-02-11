const BASE_URL = "https://hospital-database-production.up.railway.app";

export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method || "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...(options.headers || {}),
    body: options.body || null,
  });

  
   const text = await res.text();
  console.log("RAW RESPONSE:", text);

  if (!res.ok) {
    throw new Error(text || "Request failed");
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Backend did not return JSON");
  }
  
}

const memoryCache = {};

export async function cachedFetch(url) {
  if (memoryCache[url]) return memoryCache[url];

  const data = await apiFetch(url);
  memoryCache[url] = data;
  return data;
}

export function clearMemoryCache() {
  Object.keys(memoryCache).forEach(key => delete memoryCache[key]);
}
