import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';


function CardDetail({ 
    income, 
    expense, 
    totalBalance, 
    showExpenseModal,
    showIncomeModal}) {

    return (
        <Grid container spacing={1} sx={{marginBottom:'20px'}}>

            <Grid size={4}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 25 }}>
                            Current Balance
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{totalBalance} £</Typography>

                    </CardContent>
                    <CardActions>
                        <Button  fullWidth variant="contained" size="small">Reset Balance</Button>
                    </CardActions>
                </Card>


            </Grid>
            <Grid size={4}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 25 }}>
                            Total Income
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{income} £</Typography>

                    </CardContent>
                    <CardActions>
                        <Button onClick={showIncomeModal} fullWidth variant="contained" size="small">Add Income </Button>
                    </CardActions>
                </Card>

            </Grid>
            <Grid size={4}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 25 }}>
                            Total Expenses
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{expense} £</Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={showExpenseModal} fullWidth variant="contained" size="small">Add Expenses</Button>
                    </CardActions>
                </Card>
            </Grid>
          
        </Grid>

    )
}

export default CardDetail
