// subtractionWithText.js

// Função para carregar números e textos salvos
function loadNumbers(section) {
    const storedData = JSON.parse(localStorage.getItem(`numberTextData${section}`)) || [];
    const numberList = document.getElementById(`numberList${section}`);
  
    // Limpa a lista antes de adicionar
    numberList.innerHTML = `<h3>Números e Textos:</h3>`;
  
    // Adiciona cada item na lista
    storedData.forEach((item, index) => {
      const numberItem = document.createElement("div");
      numberItem.className = "number-item";
  
      // Exibe o número e o texto associado, com campos editáveis
      numberItem.innerHTML = `
        <span>${index + 1}. Número: </span>
        <input type="number" value="${item.number}" onchange="updateNumber(${section}, ${index}, this.value)" />
        <input type="text" value="${item.text}" onchange="updateText(${section}, ${index}, this.value)" />
        <button onclick="deleteItem(${section}, ${index})">Deletar</button>
      `;
  
      numberList.appendChild(numberItem);
    });
  }
  
  // Função para adicionar um novo número com texto
  function addNumber(section) {
    const initialNumber = document.getElementById(`initialNumber${section}`).value;
    const numberInput = document.getElementById(`numberInput${section}`).value;
    const textInput = document.getElementById(`textInput${section}`).value;
  
    if (initialNumber === "") {
      alert("Por favor, insira um valor inicial para subtrair.");
      return;
    }
  
    if (numberInput !== "" && textInput !== "") {
      const storedData = JSON.parse(localStorage.getItem(`numberTextData${section}`)) || [];
      storedData.push({ number: Number(numberInput), text: textInput }); // Salva como objeto
      localStorage.setItem(`numberTextData${section}`, JSON.stringify(storedData)); // Salva no LocalStorage
      document.getElementById(`numberInput${section}`).value = ""; // Limpa os campos
      document.getElementById(`textInput${section}`).value = "";
      loadNumbers(section); // Recarrega a lista
      alert("Número e texto adicionados com sucesso!");
    } else {
      alert("Por favor, insira um número e um texto.");
    }
  }
  
  // Função para atualizar o texto de um item
  function updateText(section, index, newText) {
    const storedData = JSON.parse(localStorage.getItem(`numberTextData${section}`)) || [];
    storedData[index].text = newText; // Atualiza o texto no array
    localStorage.setItem(`numberTextData${section}`, JSON.stringify(storedData)); // Salva novamente
  }
  
  // Função para atualizar o número de um item
  function updateNumber(section, index, newNumber) {
    const storedData = JSON.parse(localStorage.getItem(`numberTextData${section}`)) || [];
    storedData[index].number = Number(newNumber); // Atualiza o número no array
    localStorage.setItem(`numberTextData${section}`, JSON.stringify(storedData)); // Salva novamente
  }
  
  // Função para excluir um item
  function deleteItem(section, index) {
    const storedData = JSON.parse(localStorage.getItem(`numberTextData${section}`)) || [];
    storedData.splice(index, 1); // Remove o item do array
    localStorage.setItem(`numberTextData${section}`, JSON.stringify(storedData)); // Salva novamente
    loadNumbers(section); // Recarrega a lista
  }
  
  // Função para limpar todos os dados
  function clearData(section) {
    localStorage.removeItem(`numberTextData${section}`);
    loadNumbers(section);
    document.getElementById(`subtractionResult${section}`).textContent = "Subtração: ";
    alert("Todos os números e textos foram apagados!");
  }
  
  // Função para calcular a subtração com base no valor inicial
  function calculateSubtraction(section) {
    const initialNumber = document.getElementById(`initialNumber${section}`).value;
  
    if (initialNumber === "") {
      alert("Por favor, insira um valor inicial para subtrair.");
      return;
    }
  
    const storedData = JSON.parse(localStorage.getItem(`numberTextData${section}`)) || [];
  
    if (storedData.length === 0) {
      alert("Não há números para calcular.");
      return;
    }
  
    // Realiza a subtração do valor inicial com os números
    const subtraction = storedData.reduce((result, item) => {
      return result - item.number;
    }, Number(initialNumber));
  
    // Exibe o resultado da seção
    document.getElementById(`subtractionResult${section}`).textContent = `Subtração: ${subtraction}`;
  
    // Se for a Seção 1, o resultado será transferido para a Seção 2
    if (section === '1') {
      document.getElementById('initialNumber2').value = subtraction; // Transferir o resultado para a Seção 2
    }
  }
  
  // Carrega os dados ao iniciar
  window.onload = function () {
    loadNumbers('1');
    loadNumbers('2');
  };
  