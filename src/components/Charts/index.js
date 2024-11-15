import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import { PieChart } from '@mui/x-charts/PieChart';


function ChartsComponent({ sortedTransactions }) {

    const yAxisData = sortedTransactions.map(transaction => transaction.amount); // Amount'lar Y ekseni

    const xLabels = sortedTransactions.map(transaction => transaction.date);
    

    // Harcamaları filtreleyip sadece "expense" türündeki işlemleri almak
    const spendingData = sortedTransactions.filter(
        (transaction) => transaction.type === "expense"
    );

    // PieChart için harcama verilerini gruplama
    const categoryTotals = spendingData.reduce((acc, transaction) => {
        const tag = transaction.tag || 'Diğer'; // Tag yoksa 'Diğer' olarak işaretle
        acc[tag] = (acc[tag] || 0) + transaction.amount;
        return acc;
    }, {});

    // PieChart için uygun formata dönüştürme
    const pieChartData = Object.keys(categoryTotals).map((tag, index) => ({
        id: index,
        value: categoryTotals[tag],
        label: tag,
    }));

    return (
        <Grid container spacing={1} sx={{ marginBottom: '20px' }}>
            <Grid  size={{ xs: 12, md: 12, lg: 8 }}>
                <Card sx={{ width: ' 100%', height: '300px' }}>
                    <CardContent>

                        <LineChart
                            
                            height={300}
                            series={[
                                { data: yAxisData, label: 'amount' },
                            ]}
                            xAxis={[{ scaleType: 'point', data: xLabels }]}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid  size={{ xs: 12, md: 12, lg: 4 }}>
                <Card sx={{ width: ' 100%', height: '300px' }}>
                    <CardContent>

                    <PieChart
                            series={[
                                {
                                    data: pieChartData,
                                    outerRadius: 90,
                                },
                            ]}
                          
                            height={250}
                        />
                    </CardContent>
                </Card>


            </Grid>
        </Grid>
    )
}

export default ChartsComponent
