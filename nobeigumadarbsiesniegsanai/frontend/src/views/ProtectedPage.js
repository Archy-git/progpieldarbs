import { useEffect, useState, useContext } from "react";
import useAxios from "../utils/useAxios";
import "./protectedpage.css";
import Chart from "chart.js/auto";
import AuthContext from "../context/AuthContext";

//Tiek definēta "ProtectedPage" komponente, kas izmanto vairākus React hookus, lai veiktu dažādas darbības ar izdevumu datiem un vizualizāciju
function ProtectedPage() {
  const { user } = useContext(AuthContext);
  const [res, setRes] = useState("");
  const [responseString, setResponseString] = useState("");
  const api = useAxios();
  const [newResponseString, setnewResponseString] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseCurrency, setExpenseCurrency] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseDate, setExpenseDate] = useState("");
  const [expenseIndex, setExpenseIndex] = useState(999);
  const [expenseDbId, setExpenseDbId] = useState("");
  const [labelsforpirags, setLabelsforpirags] = useState(['rrr']);
  const [chartData, setChartData] = useState([]);

  // Tiek definēti divi "useEffect" hooks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/expenses/user/");
        const expenses = response.data;
        const testArray = [];
        for (let i = 0; i < expenses.length; i++) {
          const expense = {
            name: expenses[i].category,
            currency: expenses[i].currency,
            category: expenses[i].category,
            amount: expenses[i].amount,
            date: expenses[i].date,
            expenseDbId: expenses[i].id
          };
          testArray.push(expense)
        }
        setExpenses(testArray);
        const groupedExpenses = expenses.reduce((result, expense) => {
          const category = expense.category;
          const amount = parseFloat(expense.amount);
          if (!result[category]) {
            result[category] = 0;
          }
          result[category] += amount;
          return result;
        }, {});
        const chartData = Object.entries(groupedExpenses).map(([category, amount]) => ({
          category,
          amount,
        }));
        setChartData(chartData);

      } catch {
        setResponseString("Something went wrong");
        setRes("Something went wrong");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const categories = chartData.map((expense) => expense.category);
    const amounts = chartData.map((expense) => expense.amount);

    const data = {
      labels: categories,
      datasets: [
        {
          label: "Expenses by category",
          data: amounts,
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
            "rgb(255, 205, 00)",
            "rgb(255, 00, 86)",
          ],
        },
      ],
    };

    const config = {
      type: "pie",
      data: data,
    };

    const chart = new Chart(document.getElementById("myChart"), config);

    return () => {
      chart.destroy();
    };
  }, [chartData]);




  const handleExpenseSubmit = async (event) => {
    event.preventDefault();

    const expense = {
      name: expenseName,
      currency: expenseCurrency,
      category: expenseCategory,
      amount: expenseAmount,
      date: expenseDate,
      expenseDbId: expenseDbId,
    };
    if (expenseIndex != 999) {
      const currExpense = {
        "date": expense.date,
        "currency": expense.currency,
        "amount": expense.amount,
        "category": expense.category,
        "user_id": user.user_id
      };
      const response = await api.put("expenses/" + expense.expenseDbId + "/update/", currExpense);

      expenses[expenseIndex] = expense;
    }
    else {
      const currExpense = {
        "date": expense.date,
        "currency": expense.currency,
        "amount": expense.amount,
        "category": expense.category,
        "user_id": user.user_id
      };

      const response = await api.post("/expenses/", currExpense);
      const aa = response.data;
      expense.expenseDbId = aa.id;
      expenses.push(expense);
    }
    const groupedExpenses = []
    for (let i = 0; i < expenses.length; i++) {
      if (!groupedExpenses[expenses[i].category]) {
        groupedExpenses[expenses[i].category] = 0;
      }
      groupedExpenses[expenses[i].category] += parseInt(expenses[i].amount);
    }
    const chartData = Object.entries(groupedExpenses).map(([category, amount]) => ({
      category,
      amount,
    }));
    setChartData(chartData);
    setExpenseName("");
    setExpenseCurrency("");
    setExpenseCategory("");
    setExpenseAmount("");
    setExpenseDate("");
    setExpenseIndex(999);
    setExpenseDbId("");


  };

  const handleEditExpense = (index) => {
    const editedExpense = expenses[index];
    setExpenseIndex(index)
    setExpenseName(editedExpense.name);
    setExpenseCurrency(editedExpense.currency);
    setExpenseCategory(editedExpense.category);
    setExpenseAmount(editedExpense.amount);
    setExpenseDate(editedExpense.date)
    setExpenseDbId(editedExpense.expenseDbId)
  }

  const handleDeleteExpense = async (index) => {
    const response = await api.delete("/expenses/" + expenses[index].expenseDbId + "/delete/");
    const newExpenses = expenses.filter((_, i) => i !== index)
    setExpenses(newExpenses);
    //
    const groupedExpenses = []

    for (let i = 0; i < newExpenses.length; i++) {
      if (!groupedExpenses[newExpenses[i].category]) {
        groupedExpenses[newExpenses[i].category] = 0;
      }
      groupedExpenses[newExpenses[i].category] += newExpenses[i].amount;
    }

    const chartData = Object.entries(groupedExpenses).map(([category, amount]) => ({
      category,
      amount,
    }));
    setChartData(chartData);
  }

  //Tiek atveidota izdevumu pievienošanas forma un parādīts izdevumu saraksts
  return (
    <div className="main">
      <table>
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className="chart">
                        <canvas id="myChart"></canvas>
                      </div>
                    </td>
                    <td>
                      <center>
                        <div className="expense-form">
                          <h2>Add a New Expense</h2>
                          <form onSubmit={handleExpenseSubmit}>
                            <label>
                              Category:
                              <select required name="category" value={expenseCategory} onChange={(e) => setExpenseCategory(e.target.value)}>
                                <option value="--choose one--" hidden>--choose one--</option>
                                <option value="Food">Food</option>
                                <option value="Housing">Housing</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Entertainment">Entertainment</option>
                              </select>
                            </label>
                            <label>
                              Currency:
                              <input className="currency" required type="text" name="currency" value={expenseCurrency} onChange={(e) => setExpenseCurrency(e.target.value)} />
                            </label>
                            <label>
                              Amount:
                              <input className="amount" required type="number" name="amount" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} />
                            </label>
                            <label>
                              Date:
                              <input required type="date" name="date" value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)} />
                            </label>
                            <button className="button-expense" type="submit">Add Expense</button>
                          </form>
                        </div>
                      </center>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr><td>
            <div className="expense">
              {expenses.map((expense, index) => (
                <div key={index} className="expenses-box">
                  <p><strong>Category:</strong> {expense.category}</p>
                  <p><strong>Currency:</strong> {expense.currency}</p>
                  <p><strong>Amount:</strong> {expense.amount}</p>
                  <p><strong>Date:</strong> {expense.date}</p>
                  <div className="expense-button">
                    <button onClick={() => handleEditExpense(index)}>Edit</button>
                    <button onClick={() => handleDeleteExpense(index)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </td>
          </tr>
        </tbody>
      </table>



    </div>
  );

}

export default ProtectedPage;