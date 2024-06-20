// src/components/AddCustomer.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddCustomer() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [debts, setDebts] = useState([{ amount: '', date: '' }]);
  const [payments, setPayments] = useState([{ amount: '', date: '' }]);
  const [buyers, setBuyers] = useState([{ name: '', count: '', date: '' }]);
  const navigate = useNavigate();

  const handleDebtChange = (index, field, value) => {
    const newDebts = [...debts];
    newDebts[index][field] = value;
    setDebts(newDebts);
  };

  const handlePaymentChange = (index, field, value) => {
    const newPayments = [...payments];
    newPayments[index][field] = value;
    setPayments(newPayments);
  };

  const handleBuyerChange = (index, field, value) => {
    const newBuyers = [...buyers];
    newBuyers[index][field] = value;
    setBuyers(newBuyers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customer = { name, phoneNumber, debts, payments, buyers };
    try {
      await axios.post('http://localhost:8000/customers', customer);
      navigate('/');
    } catch (error) {
      console.error('There was an error creating the customer!', error);
    }
  };

  return (
    <div>
      <h1>Add Customer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <h3>Debts</h3>
          {debts.map((debt, index) => (
            <div key={index}>
              <label>Amount:</label>
              <input
                type="number"
                value={debt.amount}
                onChange={(e) => handleDebtChange(index, 'amount', e.target.value)}
                required
              />
              <label>Date:</label>
              <input
                type="date"
                value={debt.date}
                onChange={(e) => handleDebtChange(index, 'date', e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={() => setDebts([...debts, { amount: '', date: '' }])}>Add Debt</button>
        </div>
        <div>
          <h3>Payments</h3>
          {payments.map((payment, index) => (
            <div key={index}>
              <label>Amount:</label>
              <input
                type="number"
                value={payment.amount}
                onChange={(e) => handlePaymentChange(index, 'amount', e.target.value)}
                required
              />
              <label>Date:</label>
              <input
                type="date"
                value={payment.date}
                onChange={(e) => handlePaymentChange(index, 'date', e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={() => setPayments([...payments, { amount: '', date: '' }])}>Add Payment</button>
        </div>
        <div>
          <h3>Buyers</h3>
          {buyers.map((buyer, index) => (
            <div key={index}>
              <label>Name:</label>
              <input
                type="text"
                value={buyer.name}
                onChange={(e) => handleBuyerChange(index, 'name', e.target.value)}
                required
              />
              <label>Count:</label>
              <input
                type="number"
                value={buyer.count}
                onChange={(e) => handleBuyerChange(index, 'count', e.target.value)}
                required
              />
              <label>Date:</label>
              <input
                type="date"
                value={buyer.date}
                onChange={(e) => handleBuyerChange(index, 'date', e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={() => setBuyers([...buyers, { name: '', count: '', date: '' }])}>Add Buyer</button>
        </div>
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
}

export default AddCustomer;
