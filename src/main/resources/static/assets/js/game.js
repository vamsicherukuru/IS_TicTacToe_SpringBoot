
        let clickCount = 0;

        let lastColor = null;
        function changeColor(cell,table_no, row, col) {
        console.log(`Clicked cell: Table:${table_no} ${row},${col}`);
          clickCount++;

          if (cell.style.backgroundColor !== '' && cell.style.backgroundColor !== 'transparent') {
          console.log("Already Changed");
                 return;
            }

            if (lastColor === 'blue') {
                cell.style.backgroundColor = 'red';
                cell.textContent = 'X';
                 cell.style.color = 'white';
        cell.style.fontSize = '20px';
                lastColor = 'red';
            } else {
                cell.style.backgroundColor = 'blue';
                cell.textContent = 'O';
                 cell.style.color = 'white';
                 cell.style.fontSize = '20px';
                lastColor = 'blue';
            }


        }




