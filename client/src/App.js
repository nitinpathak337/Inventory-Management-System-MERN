import React from "react";
import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";




function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
  
    getAllItems();
  }, [data]);

  const getAllItems = async () => {
    const response = await fetch("http://localhost:5000/inventory");
    const data = await response.json();
    setData(data);
  };

  
  

  const addItemHandler = async () => {
    if(name==="" || category===""||quantity===""||price===""){
      alert("Please enter all the values");
    }
    else{
    const response = await fetch("http://localhost:5000/inventory", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: name,
        category: category,
        quantity: quantity,
        price: price,
      }),
    });
    setCategory("");
    setPrice("");
    setName("");
    setQuantity("");
    const msg = await response.text();
    alert(msg);
  }
  };

  const clearStateValue=()=>{
    setCategory("");
    setPrice("");
    setName("");
    setQuantity("");
  }

  const getSingleItemHandler = async (id) => {
    const response = await fetch(`http://localhost:5000/inventory/${id}`);
    const itemDetails = await response.json();
    
    setName(itemDetails[0].name);
    setPrice(itemDetails[0].price);
    setCategory(itemDetails[0].category);
    setQuantity(itemDetails[0].quantity);
    
  };

  const updateItemHandler=async(e)=>{
    if(name==="" || category===""||quantity===""||price===""){
      alert("Please enter all the values");
    }
    else{
    const response = await fetch(`http://localhost:5000/inventory/${e.target.value}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: name,
        category: category,
        quantity: quantity,
        price: price,
      }),
    });
    setCategory("");
    setPrice("");
    setName("");
    setQuantity("");
    const msg = await response.text();
    alert(msg);
  }
  }

  const deleteItemHandler=async(e)=>{
    const response = await fetch(`http://localhost:5000/inventory/${e.target.value}`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }

      
    });
    
    const msg=await response.text();
    alert(msg);
  }

  return (
    <div className="p-4 d-flex flex-column">
      <h1 className="text-center text-info">Inventory Management System</h1>

      <Popup
        modal
        trigger={
          <button className="btn btn-info align-self-end mx-5 my-3 text-white">
            Add Item
          </button>
        }
        onClose={clearStateValue}
      >
        {(close) => (
          <>
            <form className="p-3 border d-flex flex-column align-items-center m-3">
              <label htmlFor="name">Item Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <label htmlFor="price">Price Per Item</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </form>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => close()}
            >
              Close
            </button>
            <button
              className="btn btn-primary mx-3"
              type="button"
              onClick={addItemHandler}
            >
              Add
            </button>
          </>
        )}
      </Popup>
      { data.length!==0?(   
      <table className="table table-striped text-center my-5">
        <thead>
          <tr className="bg-info text-white">
            <th>Item Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price Per Quantity</th>
            <th>Update Action</th>
            <th>Delete Action</th>
          </tr>
        </thead>
        
        <tbody>
          {data.map((each) => (
            <tr key={each._id}>
              <th>{each.name}</th>
              <th>{each.category}</th>
              <th>{each.quantity}</th>
              <th>{each.price}</th>
              <th>
                <Popup
                  value={each._id}
                  id={each._id}
                  modal
                  trigger={
                    <button
                      className="btn btn-primary"
                      
                    >
                      Update
                    </button>
                  }
                  onOpen={()=>getSingleItemHandler(each._id)}
                  onClose={clearStateValue}
                >
                  {(close) => (
                    <>
                      <form className="p-3 border d-flex flex-column align-items-center m-3">
                        <label htmlFor="name">Item Name</label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="category">Category</label>
                        <input
                          type="text"
                          id="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        />
                        <label htmlFor="quantity">Quantity</label>
                        <input
                          type="number"
                          id="quantity"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                        <label htmlFor="price">Price Per Item</label>
                        <input
                          type="number"
                          id="price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </form>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => close()}
                      >
                        Close
                      </button>
                      <button
                        className="btn btn-primary mx-3"
                        type="button"
                        onClick={updateItemHandler}
                        value={each._id}
                      >
                        Update
                      </button>
                    </>
                  )}
                </Popup>
              </th>
              <th>
              <Popup
                  modal
                  trigger={
                    <button
                      className="btn btn-danger"
                      
                    >
                      Delete
                    </button>
                  }
                >
                  {(close) => (
                    <>
                      <h3 className="text-center text-secondary m-3">Please confirm if you want to delete this item</h3>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => close()}
                      >
                        Close
                      </button>
                      <button
                        className="btn btn-primary mx-3"
                        type="button"
                        onClick={deleteItemHandler}
                        value={each._id}
                      >
                        Confirm
                      </button>
                    </>
                  )}
                </Popup>
              </th>
            </tr>
          ))}
        </tbody>
        
      </table>):<h1 className="text-secondary text-center m-5">No Items Available</h1>
      }
    </div>
  );
}

export default App;
