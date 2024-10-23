import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import getSignUpTheme from '../components/theme/getSignUpTheme';
import { GoogleIcon } from '../components/CustomIcons';
import TemplateFrame from '../components/TemplateFrame';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../firebase';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

export default function SignUp() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState("");


  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const signupWithEmail = () => {
    setLoading(true);
    console.log("name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("confirmPassword", confirmPassword);
    //Authenticate the user, or basically create a new account using email and pass
    if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("user", user);
            toast.success("user created");
            setLoading(false);
            setName("");
            setPassword("");
            setEmail("");
            setConfirmPassword("");
            createDoc(user);
            //Create a doc with user id as the following id

          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
          });

      } else {
        toast.error("passwprd and confirmpassword don't match!")
        setLoading(false);
      }

    } else {
      toast.error("All needs are mandatory!");
      setLoading(false);
    }
  };

  function loginUsingEmail() {
    console.log("Email", email);
    console.log("Password", password);

    if (email !== "" && password !== "" ) {

      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toast.success("User Logged In!");
        console.log("User Logged In : " ,user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        console.log(errorCode)
      });
    }else {
      toast.error("All fields are mandatory!")
    }
  }

  function createDoc(user) {
    //Make sure that the doc with the uid doesn't exist
    //Create a doc
  }

  const handleSubmit = (event) => {
    console.log("tıklandı")
  };

  return (
    <>
      {loginForm ?
        <>
          {/* login */}
          <TemplateFrame
            toggleCustomTheme={toggleCustomTheme}
            showCustomTheme={showCustomTheme}
            mode={mode}
            toggleColorMode={toggleColorMode}
          ><ToastContainer />
            <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
              <CssBaseline enableColorScheme />
              <SignUpContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                  <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                  >
                    Login on
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                  >

                    <FormControl>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        autoComplete="email"
                        variant="outlined"

                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <TextField
                        required
                        fullWidth
                        id="password"
                        placeholder="••••••"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive updates via email."
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={loginUsingEmail}
                      text={loading ? "Loading..." : "Login Using Email and Password"}

                    >
                      Login
                    </Button>
                    <Typography sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => setLoginForm(!loginForm)}>
                      Don't have an account?
                      <span>

                        Sign up

                      </span>
                    </Typography>
                  </Box>
                  <Divider>
                    <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                  </Divider>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => alert('Sign up with Google')}
                      startIcon={<GoogleIcon />}
                      text={loading ? "Loading..." : "Loging Using Google"}
                    >
                      Login with Google
                    </Button>
                  </Box>
                </Card>
              </SignUpContainer>
            </ThemeProvider>
          </TemplateFrame>
        </> :
        <>
          {/* signup */}
          <TemplateFrame
            toggleCustomTheme={toggleCustomTheme}
            showCustomTheme={showCustomTheme}
            mode={mode}
            toggleColorMode={toggleColorMode}
          ><ToastContainer />
            <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
              <CssBaseline enableColorScheme />
              <SignUpContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">

                  <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                  >
                    Sign up
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                  >
                    <FormControl>
                      <FormLabel htmlFor="name">Full name</FormLabel>
                      <TextField
                        autoComplete="name"
                        id="name"
                        state={name}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                        placeholder="Jon Snow"

                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        autoComplete="email"
                        variant="outlined"

                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <TextField
                        required
                        fullWidth
                        id="password"
                        placeholder="••••••"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="password">Confirm Password</FormLabel>
                      <TextField
                        required
                        fullWidth
                        placeholder="••••••"
                        type="password"
                        id="confirmpassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive updates via email."
                    />
                    <Button

                      fullWidth
                      variant="contained"
                      onClick={signupWithEmail}
                      text={loading ? "Loading..." : "Signup Using Email and Password"}
                    >
                      Sign up
                    </Button>
                    <Typography sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => setLoginForm(!loginForm)}>
                      Already have an account?{' '}
                      <span>

                        Login in

                      </span>
                    </Typography>
                  </Box>
                  <Divider>
                    <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                  </Divider>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => alert('Sign up with Google')}
                      startIcon={<GoogleIcon />}
                      text={loading ? "Loading..." : "Signup Using Google"}
                    >
                      Sign up with Google
                    </Button>
                  </Box>
                </Card>
              </SignUpContainer>
            </ThemeProvider>
          </TemplateFrame>
        </>
      }
    </>
  );
}