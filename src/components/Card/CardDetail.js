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

            <Grid  size={{ xs: 12, sm:12 , md: 4, lg: 4 , xl:4}}>
                <Card sx={{ height: 200 }}>
                    <CardContent sx={{ height: 150 }}>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 25 }}>
                            Current Balance
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{totalBalance} £</Typography>

                    </CardContent>
                    <CardActions sx={{ height: 50 }}>
                        <Button  fullWidth variant="contained" size="small">Reset Balance</Button>
                    </CardActions>
                </Card>


            </Grid>
            <Grid size={{ xs: 12, sm:6, md: 4, lg: 4 ,xl:4 }}>
                <Card sx={{ height: 200 }}>
                    <CardContent sx={{ height: 150 }}>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 25 }}>
                            Total Income
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{income} £</Typography>

                    </CardContent>
                    <CardActions sx={{ height: 50 }}>
                        <Button onClick={showIncomeModal} fullWidth variant="contained" size="small">Add Income </Button>
                    </CardActions>
                </Card>

            </Grid>
            <Grid size={{ xs: 12, sm:6, md: 4, lg: 4 ,xl:4}}>
            <Card sx={{ height: 200 }} >
                    <CardContent sx={{ height: 150 }}>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 25 }}>
                            Total Expenses
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{expense} £</Typography>
                    </CardContent>
                    <CardActions sx={{ height: 50 }}>
                        <Button onClick={showExpenseModal} fullWidth variant="contained" size="small">Add Expenses</Button>
                    </CardActions>
                </Card>
            </Grid>
          
        </Grid>

    )
}

export default CardDetail
