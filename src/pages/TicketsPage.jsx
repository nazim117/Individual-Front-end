import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import ticketApi from '../API/ticketAPI';

function TicketsPage(){
    const [ticketSalesOverview, setTicketSalesOverview] = useState(null);

    useEffect(() => {
        ticketApi.getTicketSalesOverview()
        .then((data) => {
            console.log("data: ", data)
            setTicketSalesOverview(data);
            updateCharts(data);
        })
        .catch((e) => console.error("Error occurred: ", e))
    }, []);

    const updateCharts = (data) => {
        const ticketsPerMatchCtx = document.getElementById('tickets-per-match-chart').getContext('2d');
        new Chart(ticketsPerMatchCtx, {
            type: 'bar',
            data:{
                labels: data.ticketsPerMatch.map(item => `Match ${item.matchId}`),
                datasets: [{
                    label: 'Tickets Sold',
                    data: data.ticketsPerMatch.map(item => item.ticketsSold),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        const revenuePerMatchCtx = document.getElementById('revenue-per-match-chart').getContext('2d');
        new Chart(revenuePerMatchCtx, {
            type: 'bar',
            data: {
                labels: data.revenuePerMatch.map(item => `Match ${item.matchId}`),
                datasets: [{
                    label: 'Revenue',
                    data: data.revenuePerMatch.map(item => item.revenue),
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y:{
                        beginAtZero: true
                    }
                }
            }
        });
    };

    if(!ticketSalesOverview){
        return <div>Loading...</div>
    }
    if(!ticketSalesOverview.totalTicketsSold){
        return<div>No sales</div>
    }
    return(
        <div>
            <h1>Ticket Management</h1>
            <div className="dashboard">
                <div className="card">
                    <h3>Total Tickets Sold</h3>
                    <p id="total-tickets-sold">{ticketSalesOverview.totalTicketsSold}</p>
                </div>
                <div className="card">
                    <h3>Total Revenue</h3>
                    <p id="total-revenue">{ticketSalesOverview.totalRevenue.toFixed(2)}</p>
                </div>
                <div className="chart-container">
                    <canvas id="tickets-per-match-chart"></canvas>
                </div>
                <div className="chart-container">
                    <canvas id="revenue-per-match-chart"></canvas>
                </div>
            </div>
        </div>
    )
}

export default TicketsPage;