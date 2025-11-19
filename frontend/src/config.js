const normalizeUrl = (value) => {
  if (!value) return '';
  return value.endsWith('/') ? value.slice(0, -1) : value;
};

const apiBaseUrl = normalizeUrl(import.meta.env.VITE_API_URL);
let socketBaseUrl = normalizeUrl(import.meta.env.VITE_SOCKET_URL);

if (!socketBaseUrl && apiBaseUrl) {
  socketBaseUrl = apiBaseUrl.endsWith('/api')
    ? apiBaseUrl.replace(/\/api$/, '')
    : apiBaseUrl;
}

export { apiBaseUrl, socketBaseUrl };

