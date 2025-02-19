import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const viewData = (item) => {
    setView(item);
  };

  const deleteItem = (id) => {
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        setData(data.filter((item) => item.id !== id));
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  const enableEdit = (item) => {
    setEditItem(item);
    setNewTitle(item.title);
  };

  const updateItem = (id) => {
    axios
      .put(`https://fakestoreapi.com/products/${id}`, { title: newTitle })
      .then((res) => {
        setData(data.map((item) => (item.id === id ? res.data : item)));
        setEditItem(null);
      })
      .catch((err) => console.error("Error updating item:", err));
  };

  return (
    <div style={styles.container}>
      <h2>📦 Fake Store API Data</h2>
      <table style={styles.table} border={2}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {editItem && editItem.id === item.id ? (
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={styles.input}
                  />
                ) : (
                  item.title
                )}
              </td>
              <td>${item.price}</td>
              <td>{item.category}</td>
              <td>
                {editItem && editItem.id === item.id ? (
                  <button style={styles.saveButton} onClick={() => updateItem(item.id)}>
                    💾 Save
                  </button>
                ) : (
                  <button style={styles.editButton} onClick={() => enableEdit(item)}>
                    ✏️ Edit
                  </button>
                )}
                <button style={styles.deleteButton} onClick={() => deleteItem(item.id)}>
                  🗑️ Delete
                </button>
                <button style={styles.viewButton} onClick={() => viewData(item)}>
                  👁️ View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {view && (
        <div style={styles.card}>
          <h3>🛒 Product Details</h3>
          <p><strong>ID:</strong> {view.id}</p>
          <p><strong>Name:</strong> {view.title}</p>
          <p><strong>Price:</strong> ${view.price}</p>
          <p><strong>Category:</strong> {view.category}</p>
          <button style={styles.closeButton} onClick={() => setView(null)}>❌ Close</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  table: {
    width: "80%",
    margin: "auto",
    borderCollapse: "collapse",
    border: "2px solid #333",
  },
  input: {
    padding: "5px",
    fontSize: "14px",
  },
  card: {
    marginTop: "20px",
    padding: "15px",
    border: "2px solid #555",
    display: "inline-block",
    textAlign: "left",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  editButton: {
    backgroundColor: "#f7c53f",
    border: "none",
    padding: "5px 10px",
    margin: "5px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    border: "none",
    padding: "5px 10px",
    margin: "5px",
    cursor: "pointer",
    borderRadius: "5px",
    color: "white",
  },
  viewButton: {
    backgroundColor: "#3498db",
    border: "none",
    padding: "5px 10px",
    margin: "5px",
    cursor: "pointer",
    borderRadius: "5px",
    color: "white",
  },
  saveButton: {
    backgroundColor: "#2ecc71",
    border: "none",
    padding: "5px 10px",
    margin: "5px",
    cursor: "pointer",
    borderRadius: "5px",
    color: "white",
  },
  closeButton: {
    backgroundColor: "#555",
    border: "none",
    padding: "5px 10px",
    marginTop: "10px",
    cursor: "pointer",
    borderRadius: "5px",
    color: "white",
  },
};

export default App;
