// Function to add an expense
function addExpense() {
    const amountInput = document.getElementById("amount");
    const categoryInput = document.getElementById("category");
    const descInput = document.getElementById("desc");
  
    const amount = amountInput.value.trim();
    const category = categoryInput.value;
    const description = descInput.value.trim();
  
    if (amount === "" || isNaN(amount)) {
      alert("Please enter a valid expense amount.");
      return;
    }
  
    // Create an object to represent the expense
    const expense = {
      amount: parseFloat(amount),
      category,
      description,
    };
  
    // Get the existing expenses from local storage or create an empty array
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  
    // Add the new expense to the list
    expenses.push(expense);
  
    // Save the updated expenses list to local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));
  
    // Clear the form inputs
    amountInput.value = "";
    categoryInput.value = "Movie"; // Reset to the default category
    descInput.value = "";
  
    // Update the expenses list on the screen
    updateExpenseList();
  }
  
  // Function to update the expenses list on the screen
  function updateExpenseList() {
    const itemsList = document.getElementById("items");
  
    // Clear the existing list
    itemsList.innerHTML = "";
  
    // Get the expenses from local storage
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  
    // Display each expense item
    expenses.forEach((expense, index) => {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.innerHTML = `
        Amount: $${expense.amount.toFixed(2)} 
        Category: ${expense.category} 
        Description: ${expense.description}
        <button class="btn btn-danger btn-sm float-right delete" data-index="${index}">Delete</button>
        <button class="btn btn-sm btn-dark float-right edit" data-index="${index}">Edit</button>
      `;
  
      itemsList.appendChild(listItem);
    });
  
    // Attach event listeners to delete and edit buttons
    const deleteButtons = document.querySelectorAll(".delete");
    const editButtons = document.querySelectorAll(".edit");
  
    deleteButtons.forEach((button) => {
      button.addEventListener("click", deleteExpense);
    });
  
    editButtons.forEach((button) => {
      button.addEventListener("click", editExpense);
    });
  }
  
  // Function to delete an expense
  function deleteExpense(event) {
    const index = event.target.getAttribute("data-index");
  
    // Get the expenses from local storage
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  
    // Remove the expense at the specified index
    expenses.splice(index, 1);
  
    // Save the updated expenses list to local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));
  
    // Update the expenses list on the screen
    updateExpenseList();
  }
  
  // Function to edit an expense
  function editExpense(event) {
    const index = event.target.getAttribute("data-index");
  
    // Get the expenses from local storage
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  
    // Get the expense at the specified index
    const expenseToEdit = expenses[index];
  
    // Fill the form with the details of the expense to edit
    document.getElementById("amount").value = expenseToEdit.amount.toFixed(2);
    document.getElementById("category").value = expenseToEdit.category;
    document.getElementById("desc").value = expenseToEdit.description;
  
    // Delete the expense from local storage
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  
    // Update the expenses list on the screen
    updateExpenseList();
  }
  
  // Initialize the expenses list on page load
  updateExpenseList();
  
  // Attach the addExpense function to the "Add Expense" button
  const addButton = document.getElementById("btn");
  addButton.addEventListener("click", addExpense);
  