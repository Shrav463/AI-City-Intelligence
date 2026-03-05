// client/src/utils/api.js

const BASE = '/api';

async function request(path) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cities`)f;
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || `Request failed: ${res.status}`);
  }
  return json;
}

export const api = {
  getCities:      (continent) => request(`/cities${continent ? `?continent=${continent}` : ''}`),
  getCity:        (id)        => request(`/cities/${id}`),
  searchCities:   (q)         => request(`/cities/search?q=${encodeURIComponent(q)}`),
  getDimensions:  ()          => request('/scores/dimensions'),
  getTopByDim:    (dim)       => request(`/scores/top?dim=${dim}`),
  compare:        (a, b)      => request(`/scores/compare?a=${a}&b=${b}`),
};
