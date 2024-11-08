import React, { useEffect, useState } from 'react'
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { SignOutButton } from '@toolpad/core/Account';
import { AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut } from 'firebase/auth';
import CardDetail from '../components/Card/CardDetail';
import AddExpenseModal from '../components/Modals/addExpense';
import AddIncomeModal from '../components/Modals/addIncome';
import moment from "moment";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import TransactionsTable from '../components/TransactionsTable';
import { unparse } from "papaparse";

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />
  },
  {
    kind: 'divider',
  },
];

function Authentication() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect((loading) => {
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
    try {
      signOut(auth)
        .then(() => {
          toast.success("Logged Out Successfully! ");
          navigate("/");
        })
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <AuthenticationContext.Provider value={authentication}>
      <SessionContext.Provider value={session} >
        {/* preview-start */}
        <SignOutButton onClick={logoutFnc} />
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
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = React.useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = React.useState(false);

  function exportToCsv() {
    const csv = unparse(transactions, {
      fields: ["name", "type", "date", "amount", "tag"],
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };


  useEffect(() => {
   
    if(user){
      fetchTransactions();
    }
  }, [user]);


  const demoWindow = window ? window() : undefined;

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    setTransactions([...transactions, newTransaction]);
    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
    addTransaction(newTransaction);
    calculateBalance();
    console.log("newTransaction:", newTransaction)

  };

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  };

  useEffect(() => {
    calculateBalance()
  }, [transactions]);

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      if(!many) {
        toast.success("Transaction Added!");
      }

      
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();

    } catch (e) {
      console.error("Error adding document: ", e);

      if (!many) {
        toast.error("Couldn't add transaction");
      }

    }
  };

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log("Transactions array", transactionsArray)
      toast.success("Transactions Fetched!");
    }else{
      toast.error("No User!")
    }
    setLoading(false);
  }

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
    ><ToastContainer />

      <DashboardLayout slots={{ toolbarAccount: Authentication }}>
        <CustomDashboardContainer>
          <PageContainer>

            {loading ? <p>Loading...</p> :

            <>

              <CardDetail
                income={income}
                expense={expense}
                totalBalance={totalBalance}
                showExpenseModal={showExpenseModal}
                showIncomeModal={showIncomeModal}
              />

              <AddExpenseModal
                isExpenseModalVisible={isExpenseModalVisible}
                handleExpenseCancel={handleExpenseCancel}
                onFinish={onFinish}

              />
              <AddIncomeModal
                isIncomeModalVisible={isIncomeModalVisible}
                handleIncomeCancel={handleIncomeCancel}
                onFinish={onFinish}
              />
              <TransactionsTable transactions={transactions}
              exportToCsv={exportToCsv}


              ></TransactionsTable>


            </>


            }

          </PageContainer>
        </CustomDashboardContainer>
      </DashboardLayout>
    </AppProvider>
  )
}

export default Main
