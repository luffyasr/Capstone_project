import React from 'react'
import landRegistration from "../contracts/landRegistration.json";
import getWeb3 from "../getWeb3"
import './Re.css'

var astab = [];
var ass = [];

class Requests extends React.Component{
  constructor (props){
    super(props)
    this.state = {
      contract: null,
      accounts: null,
      web3: null,
      requester: null,
      owner: null,
      marketValue : '',
      isAvailable : '',
      requestStatus : '',
      assetid : '',
      status : '',
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

ShowAvailable = async () =>{
  const assetid= await this.state.contract.methods.viewAssets().call();
  this.setState({assetid :assetid});
  astab = await this.state.contract.methods.landInfoUser(assetid.toString()).call();
  alert("Owner Address: "+ astab[0]+"\n"+"Market Value: "+astab[1]+"\n"+"Available: "+astab[2]+"\n"+"Requester Address: "+astab[3]+"\n"+"Request Status: "+astab[4]);
  this.setState({
    owner : astab[0],
  })
  console.log(this.state.owner);;
}

LandReq = async () => {
    const request = await this.state.contract.methods.requstToLandOwner(this.state.assetid.toString()).call()
    if(request && this.state.accounts != this.state.owner){
      alert("Requested");
    } else{
      alert("Request Failed");
    }
}

ViewReq = async () => {
  const currown = this.state.owner;
  console.log(this.state.owner);
  console.log(this.state.accounts);
  if(this.state.accounts == this.state.owner){
    await this.state.contract.methods.processRequest(this.state.assetid.toString(),3).send({from : this.state.owner, gas: 210000});
    alert("Appoved");
  }else{
    alert("No Requests to view ");
  }
}

  render(){
    return (
      <>
        <h2>Requests</h2>
        <button className="input-bu" onClick={this.ShowAvailable}>Show Available Lands</button>
        <button className="input-bu" onClick={this.LandReq}>Request Land</button>
        <button className="input-bu" onClick={this.ViewReq}>Approve Requests</button>
      </>
  );
}
}
export default Requests;
