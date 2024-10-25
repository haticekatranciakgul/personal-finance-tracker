import React, { useEffect } from 'react'
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {  SignOutButton } from '@toolpad/core/Account';
import { AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider';
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut } from 'firebase/auth';
import Card from '../components/Card/Card';


const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];


function Authentication() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);


  const [session, setSession] = React.useState({
    user: {
      name: 'htc ktrnc',
      email: 'bharatkashyap@outlook.com',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: 'htc Kashyap',
            email: 'bharatkashyap@outlook.com',
            image: 'https://avatars.githubusercontent.com/u/19550456',
          },
        });
      },
      signOut: () => {
        //alert('logout tıklandı');
        setSession(null);
       
      },
    };
  }, []);

  function logoutFnc() {
    alert("Logged out successfully!");
    try{
      signOut(auth)
      .then(()=> {
        toast.success("Logged Out Successfully! ");
        navigate("/");
      })
    } catch(error) {
      toast.error(error.message);
    }
  }
  return (
    <AuthenticationContext.Provider value={authentication}>
      <SessionContext.Provider value={session} >
        {/* preview-start */}
        <SignOutButton onClick={logoutFnc}/>
        {/* preview-end */}
      </SessionContext.Provider>
    </AuthenticationContext.Provider>
  );
}

// Mevcut stil kodunu burada kullanıyoruz
const CustomDashboardContainer = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(2),
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));
const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}



function Main(props) {
  const { window } = props;
  const router = useDemoRouter('/');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: false,
        title: 'Personal Finance Tracker',
      }}
    ><ToastContainer/>

      <DashboardLayout slots={{ toolbarAccount: Authentication }}>
        <CustomDashboardContainer>
          <PageContainer>
           <Card/>
          </PageContainer>
        </CustomDashboardContainer>
      </DashboardLayout>
    </AppProvider>
  )
}

export default Main
