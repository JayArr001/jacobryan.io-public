function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export async function csrfFetch(url, options = {}) {
  const csrfToken = getCookie('XSRF-TOKEN');
  if (!csrfToken) {
    console.warn('CSRF token not found in cookies');
  }

  const headers = {
    ...options.headers,
    'X-XSRF-TOKEN': csrfToken,
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  return fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });
}
