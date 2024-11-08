import React from "react";
function NoTransactions() {


    const imageName = 'transactions.svg';
    const logoPath = `${process.env.PUBLIC_URL}/${imageName}`;
  return (

    
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        marginBottom: "2rem",
      }}
    >
      <img src={logoPath} style={{ width: "300px", margin: "4rem" }} />
      <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
        You Have No Transactions Currently
      </p>
    </div>
  );
}

export default NoTransactions;
