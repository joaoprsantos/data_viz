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
                    labels: ['State 0', 'State 1', 'State 2'],
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

    document.getElementById('triggerAction').addEventListener('click', function() {
        const token = 'XXXXX';
        const repo = 'joaoprsantos/data_viz';
        const workflowId = 'trigger-action.yml';

        fetch(`https://api.github.com/repos/${repo}/actions/workflows/${workflowId}/dispatches`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                ref: 'main' // or the branch you want to trigger the workflow on
            })
        })
        .then(response => {
            if (response.ok) {
                alert('GitHub Action triggered successfully!');
            } else {
                alert('Failed to trigger GitHub Action.');
            }
        })
        .catch(error => console.error('Error triggering GitHub Action:', error));
    });
});
