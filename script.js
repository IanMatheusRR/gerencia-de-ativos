document.addEventListener('DOMContentLoaded', () => {
  const brrButton = document.getElementById('brr');
  if (brrButton) {
    brrButton.addEventListener('click', () => {
      window.location.href = 'brr.html';
    });
  }
});

// Função para carregar os entregáveis da planilha
function loadBRRDeliverables() {
  const sheetUrl = 'https://github.com/IanMatheusRR/gerenciaGIT/blob/main/entregaveis_brr.xlsx';

  fetch(sheetUrl)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => {
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const listContainer = document.getElementById('brr-list');
      listContainer.innerHTML = '';

      const filteredData = data.filter(row => row.EXECUTIVA === 'EXECUTIVA DE BRR');

      filteredData.forEach(row => {
        const ul = document.createElement('ul');
        ul.classList.add('deliverable');

        addListItem(ul, 'EXECUTIVA', row.EXECUTIVA);
        addListItem(ul, 'TEMA', row.TEMA);
        addListItem(ul, 'ENTREGA', row.ENTREGA);
        addListItem(ul, 'QUEM RECEBE?', row['QUEM RECEBE?']);
        addListItem(ul, 'FREQUÊNCIA', row.FREQUÊNCIA);

        const dateFields = [];
        for (let i = 1; i <= 12; i++) {
          const fieldName = `DATA DA ENTREGA ${i}°`;
          if (row[fieldName] && row[fieldName].toString().trim() !== '') {
            dateFields.push(row[fieldName]);
          }
        }

        if (dateFields.length > 0) {
          const li = document.createElement('li');
          li.innerHTML = `<strong>DATA(S) DA ENTREGA:</strong>`;
          dateFields.forEach(date => {
            const div = document.createElement('div');
            div.textContent = date;
            li.appendChild(div);
          });
          ul.appendChild(li);
        }

        addListItem(ul, 'OBSERVAÇÃO', row.OBSERVAÇÃO);
        listContainer.appendChild(ul);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar a planilha:', error);
    });
}

function addListItem(ul, label, value) {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${label}:</strong> ${value || '-'}`;
  ul.appendChild(li);
}
