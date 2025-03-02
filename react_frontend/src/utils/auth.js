// Function to read the data from the user's local storage  
const getAuth = async () => {
  const user = await JSON.parse(localStorage.getItem('user'));
  if (user) {
    const decodedToken = await decodeTokenPayload(user);
    user.user_id = decodedToken.user_id;
    user.is_admin = decodedToken.is_admin;
    return user;
  } else {
    return {};
  }
};

// Function to decode the payload from the token
const decodeTokenPayload = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );
  return JSON.parse(jsonPayload);
};

export default getAuth;