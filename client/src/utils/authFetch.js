export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers,
  };

  const res = await fetch(url, config);

  if (res.status === 401) {
    // Obsłuż wylogowanie, token wygasł itd.
    console.error('Unauthorized');
  }

  return res;
};
