import React from 'react'
import landRegistration from "../contracts/landRegistration.json";
import getWeb3 from "../getWeb3"

class Buyland extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      contract: null,
      accounts: null,
      web3: null,
      id : '',
    }
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = landRegistration.networks[networkId];
      const instance = new web3.eth.Contract(
        landRegistration.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.setState({ web3, accounts , contract: instance });
    } catch (error){
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  BuyL = async () => {
    try{
      await this.state.contract.methods.buyProperty(this.state.id).send({from : this.state.accounts, gas : 210000}).then(alert("Transaction Sucessfull"));
  } catch(error){
    alert("Transaction Failed")
    console.error(error);
  }
  //alert("Transaction Sucessfull")
  }

  handleID = event => {
    this.setState({id : event.target.value})
  }

  render(){
    return(
      <>
      <div className='form-inputs-p'>
        <label htmlFor='id' className='label-p'>Property ID</label>
        <input className='form-input-p' id='id' type='id' name='id' placeholder='Enter the Property id' value={this.state.id} onChange={this.handleID} />
      </div>
      <button className="input-bu" onClick={this.BuyL}>Buy Property</button>
      </>
    );
  }
}
export default Buyland;
