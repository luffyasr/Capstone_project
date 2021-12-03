import React, { Component } from "react";
import landRegistration from "./contracts/landRegistration.json";
import getWeb3 from "./getWeb3";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Buyland from './pages/Search';
import Requests from './pages/Requests';
import Profile from './pages/Profile';
import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = landRegistration.networks[networkId];
      const instance = new web3.eth.Contract(
        landRegistration.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
  };

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/search' element={<Buyland/>} />
            <Route path='/requests' element={<Requests/>} />
            <Route path='/profile' element={<Profile/>} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
