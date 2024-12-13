import React, { useState, useEffect } from 'react';
import '../style/LiveRates.css'; 
import { FaExchangeAlt } from 'react-icons/fa';  
import { SiConvertio } from "react-icons/si";

const LiveRates = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('TRY');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'your-api-key';
  const url = 'your-api-key-url'
  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRates(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleConvert = () => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const result = (amount * rates[toCurrency]) / rates[fromCurrency];
      setConvertedAmount(result);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="converter-container">
      <h1 className="title">Currency Converter</h1>
      <div className="converter-box">
        <div className="input-row">
          <div className="input-group">
            <label>From:</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="swap-icon" onClick={swapCurrencies}>
            <FaExchangeAlt />
          </div>

          <div className="input-group">
            <label>To:</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <button className="convert-button" onClick={handleConvert}>
          <SiConvertio />
        </button>

        <div className="result">
          <h3>
            {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default LiveRates;

