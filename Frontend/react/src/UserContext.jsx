import { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user', {
          credentials: 'include',
        });

        const data = res.ok
          ? await res.json()
          : { isLoggedIn: false };

        if (data.isLoggedIn) {
          setUser(data);

          fetch('/api/csrf', {
            credentials: 'include',
          }).catch(err => {
            console.error("Failed to fetch CSRF token:", err);
          });

        } else {
          setUser(null);
        }

      } catch (err) {
        console.error("Error checking user status:", err);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loadingUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);