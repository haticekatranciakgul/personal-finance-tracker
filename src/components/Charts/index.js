import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import { PieChart } from '@mui/x-charts/PieChart';


function ChartsComponent() {
    return (
        <Grid container spacing={1} sx={{ marginBottom: '20px' }}>
            <Grid size={8}>
                <Card sx={{ width: ' 100%', height: '300px' }}>
                    <CardContent>

                        <LineChart
                            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                            series={[
                                {
                                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                                },
                            ]}
                            width={700}
                            height={300}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={4}>
                <Card sx={{ width: ' 100%', height: '300px' }}>
                    <CardContent>

                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 10, label: 'series A' },
                                        { id: 1, value: 15, label: 'series B' },
                                        { id: 2, value: 20, label: 'series C' },
                                    ],
                                },
                            ]}
                            width={360}
                            height={250}
                        />
                    </CardContent>
                </Card>


            </Grid>
        </Grid>
    )
}

export default ChartsComponent
