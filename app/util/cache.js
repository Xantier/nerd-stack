let cache = {};

function ensureTokenKey(token) {
  if (!cache[token]) {
    cache[token] = {};
  }
}

export function set(token, key, data) {
  ensureTokenKey(token);
  cache[token][key] = data;
}

export function get(token, key) {
  ensureTokenKey(token);
  return cache[token][key];
}

export function clean(token) {
  const data = cache[token];
  delete cache[token];
  return data;
}

export function expire(token, key) {
  ensureTokenKey(token);
  delete cache[token][key];
}
