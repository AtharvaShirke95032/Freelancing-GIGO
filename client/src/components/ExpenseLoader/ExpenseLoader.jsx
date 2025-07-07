import React from "react";
import "./ExpenseLoader.scss";

const ExpenseLoader = ({ totalBudget, expenses }) => {
  const percentSpent = totalBudget > 0 ? Math.min((expenses / totalBudget) * 100, 100) : 0;
  const strokeDashoffset = 440 - (440 * percentSpent) / 100; // Adjust stroke for circle progress

  return (
    <div className="expense-container">
     
      
      <div className="progress-circle">
        <svg width="160" height="160" viewBox="0 0 160 160">
          {/* Background Circle */}
          <circle cx="80" cy="80" r="70" className="progress-bg" />
          
          {/* Progress Circle */}
          <circle 
            cx="80" 
            cy="80" 
            r="70" 
            className="progress-fill" 
            style={{ strokeDashoffset }} 
          />
          
          {/* Text in Center */}
          <text x="80" y="90" textAnchor="middle" className="progress-text">
            {percentSpent.toFixed(1)}%
          </text>
        </svg>
      </div>

      <p className="expense-info">
        <span>Total Expenses</span> : ${expenses.toFixed(2)} / ${totalBudget}
      </p>
    </div>
  );
};

export default ExpenseLoader;
