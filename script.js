document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Count the number of items in each state
            let stateCounts = {0: 0, 1: 0, 2: 0};
            let groupedItems = {0: [], 1: [], 2: []};

            for (let item in data) {
                let state = data[item];
                stateCounts[state]++;
                groupedItems[state].push(item);
            }

            // Create the pie chart
            let ctx = document.getElementById('pieChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Only ROMA groups', 'ROMA and RN groups', 'Only RN groups'],
                    datasets: [{
                        data: [stateCounts[0], stateCounts[1], stateCounts[2]],
                        backgroundColor: ['red', 'yellow', 'green']
                    }]
                },
                options: {
                    responsive: true
                }
            });

            // Populate the table
            let tableBody = document.querySelector('#itemsTable tbody');
            for (let state in groupedItems) {
                let row = document.createElement('tr');
                let stateCell = document.createElement('td');
                let itemsCell = document.createElement('td');

                stateCell.textContent = `State ${state}`;
                itemsCell.textContent = groupedItems[state].join(', ');

                row.appendChild(stateCell);
                row.appendChild(itemsCell);
                tableBody.appendChild(row);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});
