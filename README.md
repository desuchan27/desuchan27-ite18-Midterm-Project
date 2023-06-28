# React.js and Strapi Authentication Project

This project is a simple implementation of user authentication using React.js and Strapi. It includes a login page, a registration page, and a protected profile page that can only be accessed by authenticated users.

## Requirements

Before running the project, make sure that you have the following installed:

- Node.js
- NPM/Yarn
- React (including react toast, router dom)
- Axios
- Strapi

## Installation

To begin, download and install Node.js and NPM/Yarn from the official Node.js website. Once the appropriate installer for your operating system has been downloaded, run the installer and follow the instructions to complete the installation. To verify that both Node.js and npm have been successfully installed, open a terminal or command prompt and type "node -v" and "npm -v". If the version numbers are displayed, then both are installed and working correctly.

Next, to install React.js, redirect your terminal or command prompt to the folder where you want to install it, then enter "create-react-app" and wait for it to finish.

For Strapi, visit their website and then redirect your terminal or command prompt to the desired folder. Enter "npx create-strapi-app@latest" and respond to the prompts until the installation is complete. If the installation fails, use the command "yarn config set network-timeout 600000 -g" to extend the timeout.

Lastly, to install Git, go to the Git website and download the latest version. Install the .exe file and refer to a guide if needed, such as the one provided at phoenixnap.com.

## Implementing the React.js Application

Creating new user
```const initialUser = { email: "", password: "", username: "" };
const Registration = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const signUp = async () => {
    const url = "http://localhost:1337/api/auth/local/register";
    try {
      if (user.username && user.email && user.password) {
        const res = await axios.post(url, user);
        if (res) {
          setUser(initialUser);
          navigate("/login");
        }
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

  const handleUserChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signUp();
  };

  return (
    <div className="sign">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        <div className="input-container">
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleUserChange}
            placeholder="Username"
          />
        </div>

        <div className="input-container">
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleUserChange}
            placeholder="Email"
          />
        </div>

        <div className="input-container">
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleUserChange}
            placeholder="Password"
          />
        </div>

        <button type="submit">Sign up</button>

        <span style={{ fontSize: "13px" }}>for existing users</span>
        <button type="button">
          <Link to="/login">Login</Link>
        </button>
      </form>
    </div>
  );
};
```

Creating the login form with validation
```const initialUser = { password: "", identifier: "" };

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = "http://localhost:1337/api/auth/local";
    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);
        if (data.jwt) {
          storeUser(data);
          toast.success("Logged in succesfully", { hideProgressBar: true });
          setUser(initialUser);
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };
  return (
    <div className="sign">
      <form>
        <h1>Welcome</h1>

        <div className="input-container">
          <input
            type="email"
            name="identifier"
            value={user.identifier}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className="input-container">
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>

        <button className="submit" onClick={handleLogin}>
          Login
        </button>

        <span style={{ fontSize: "13px" }}>for new users</span>
        <button type="button">
          <Link to="/registration">Create new account</Link>
        </button>
      </form>
    </div>
  );
};
```

Creating the middleware to protect authenticated routes

```export const Protector = ({ Component }) => {
  const navigate = useNavigate();

  const { jwt } = userData();

  useEffect(() => {
    if (!jwt) {
      navigate("/login");
    }
  }, [navigate, jwt]);

  return <Component />;
};```

Implement logout functionality.

```const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("user", "");
    navigate("/login");
  }, [navigate]);
};```



## Usage

The project includes the following pages:

- **Login**: allows users to log in with their username and password.
- **Registration**: allows users to create a new account by providing their email, username, and password.
- **Homepage**: a protected page that can only be accessed by authenticated users. It displays the user's username and email.

When a user logs in or registers, the JWT token is stored in the browser's `localStorage`. This token is sent in the `Authorization` header for every request to the Strapi API.

To log out, the user can click the "Logout" button on the navigation menu. This removes the JWT token from `localStorage`.

## Credits

This project was created by David Rosales.