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
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db, provider } from '../firebase';
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  React.useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    } else {
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
    if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("user", user);
            toast.success("USER created!", {
              autoClose: 5000, 
            });
            setLoading(false);
            setName("");
            setPassword("");
            setEmail("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/");

          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
          });

      } else {
        toast.error("password and confirmpassword don't match!")
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
    setLoading(true);

    if (email !== "" && password !== "") {

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          
          const user = userCredential.user;
          navigate("/dashboard");

          toast.success("User Logged In!", {
            autoClose: 5000, 
          });
          toast.success("User Logged In!");
          console.log("User Logged In : ", user);
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error.message);
          console.error(
            "Error signing in with email and password: ",
            error.message
          );
          setLoading(false);
          
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        console.log("Doc created!");

        toast.success("Doc createddddd!", {
          autoClose: 5000, 
        });
        setLoading(false);

      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("Doc already exists");
      setLoading(false);
    }
  }

  const handleSubmit = (event) => {
    console.log("tıklandı")
  };

  function googleAuth() {
    setLoading(true);
    try{
      signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("token", token)
        console.log("user>>>", user);
        createDoc(user);
        navigate("/dashboard");
        toast.success("User authenticated!")

      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode>>", errorCode)
        toast.error(errorMessage)
      });

    }catch(e){
      toast.error(e.message);

    }
   

  };

  return (
    <><ToastContainer />
      {loginForm ?
        <>
          {/* login */}
          <TemplateFrame
            toggleCustomTheme={toggleCustomTheme}
            showCustomTheme={showCustomTheme}
            mode={mode}
            toggleColorMode={toggleColorMode}
          >
            <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
              <CssBaseline enableColorScheme />
              <SignUpContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                  <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                  >
                    Sign in
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
                      onClick={googleAuth}
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
                      onClick={googleAuth}
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