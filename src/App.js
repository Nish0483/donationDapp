import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";
import logo from "./logo.png";
import DonationABI from "./Donation.json";
import Intro from "./intro";

function App() {
  const [amount, setAmount] = useState(0);
  const [contract, setContract] = useState(null);
  const [contractBalance, setContractBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [donationSuccessful, setDonationSuccessful] = useState(false);

  useEffect(() => {
    initializeContract();
  }, []);

  const initializeContract = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      //const networkId = await web3.eth.net.getId();
      //const deployedNetwork = DonationABI.networks[networkId];
      const contractAddress = "0xb1684bb69E3e780A44A4Df31060Bf2DA08c7F5EF";
      const donationContract = new web3.eth.Contract(DonationABI.abi,contractAddress);
      setContract(donationContract);
      await loadContractData();
    } catch (error) {
      console.error("Failed to initialize contract:", error);
    }
  };

  const loadContractData = async () => {
    try {

      const contractBalance = await contract.methods.getContractBalance().call();
      const transactions = await contract.getPastEvents("DonationReceived", {
        fromBlock: 0,
        toBlock: "latest",
      });
      const balanceInEth = Web3.utils.fromWei(contractBalance, "ether");
      const formattedTransactions = transactions.slice(Math.max(transactions.length - 5, 0)).reverse().map((transaction) => ({
        donor: transaction.returnValues.donor,
        amount: Web3.utils.fromWei(transaction.returnValues.amount, "ether"),
      }));
      setContractBalance(balanceInEth);
      setTransactions(formattedTransactions);
    } catch (error) {
      console.error("Failed to load contract data:", error);
    }
  };

  const handleDonate = async () => {
    if (window.ethereum) {
      try {
        window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const weiAmount = web3.utils.toWei(amount.toString(), "ether");
        if(amount!==0){await contract.methods.donate().send({
          from: accounts[0],
          value: weiAmount,
        });

        await loadContractData(); // Refresh contract data after donation
        console.log("Donation successful!");
        
      setDonationSuccessful(true);}else alert("amount entered is empty")
      } catch (error) {
        console.error("Failed to donate:", error);
      }
     } else {
      console.error("Metamask not detected!");alert("Metamak not Installed!");
     }
    
  };
   

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo-container">
            <img src={logo} alt="Company Logo" className="logo" />
            <span className="company-name">Donation DApp</span>
          </div>
          <ul className="nav-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#contact-card">Contact</a>
            </li>
          </ul>
        </div>
      </nav>

      <div><h1>“It's not how much we give but<br></br>
        how much love we put into giving.”<br></br>
         &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;― Mother Theresa</h1>
         </div>
         <div><Intro></Intro>
      </div>

      <div className="container">
        <div className="donate-container">
          <p className="common">Enter the amount you wish to donate in <b>Ethereum</b></p>
          <input type="number" placeholder="ETH" onChange={(e) => setAmount(e.target.value)} />
          <button onClick={handleDonate}>Donate</button>{donationSuccessful && <p className="message">Donation was successful.Thank you !!</p>} 
          <div className="balance-container"><br></br><p>"make any transaction to view charity balanace and previous history"</p>
            <h2 className="bal"> Donation Funds Balance:&nbsp;<p4>{contractBalance}</p4>&nbsp;<p4>ETH</p4></h2><br></br>
          </div>
          <div className="transaction-container">
            <h2 className="trans_heading">Last Transactions:</h2>
            <ul className="trans">
              {transactions.map((transaction, index) => (
                <li key={index}>
                  
                  Donor: {transaction.donor} <br></br>Amount:&ensp;{transaction.amount}&nbsp;ETH
                </li>
              ))}
            </ul>
          </div>
        </div><p5 className="x">*** view all donations & spending in  <a className="link" href="https://etherscan.io/token/0x0ac318d6ec93cf6f97200e4ad6fef15391bc2f38">etherscan</a></p5><br></br><br></br><br></br><br></br>
      
      
      
      </div>

      <div id="contact-card">
     <h3>Nishil A</h3>
    <p>Email: nishil.kri@gmail.com</p>
    <p>Phone: +91-9037163924</p>
    <p>Address: &nbsp; westhill, calicut, kerala ,India</p>
    <p>Linkedin:<a href="https://www.linkedin.com/in/nishil-a-05a3a6137/">@</a>&emsp;Twitter:&nbsp;<a href="https://twitter.com/Nish0483">@</a>&emsp;GitHub: &nbsp;<a href="https://github.com/Nish0483">@</a></p>
      </div>
    </div>
    
  );
}

export default App;
