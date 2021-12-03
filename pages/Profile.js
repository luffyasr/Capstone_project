import React from 'react'
import landRegistration from "../contracts/landRegistration.json";
import getWeb3 from "../getWeb3"
import Home from './Home'
import './Profile.css'


var astab = [];
var assettab = [];

class Profile extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      contract: null,
      accounts: null,
      web3: null,
      id : '',
      state : '',
      district : '',
      village  : '',
      surveynumber : '',
      isavailable : '',
      requester  : null,
      requeststatus :  '',
      assetid : '',
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

  ViewAssets = async () => {
    console.log(this.state.accounts[0]);
    const assetid= await this.state.contract.methods.viewAssets().call();
    console.log(assetid.toString());
    this.setState({assetid :assetid});
    astab = await this.state.contract.methods.landInfoOwner(assetid[this.state.id-1].toString()).call();
    console.log(astab);
    alert("State: "+ astab[0]+"\n"+"District: "+astab[1]+"\n"+"Village: "+astab[2]+"\n"+"Survey Number: "+astab[3]+"\n"+"Available: "+astab[4]+"\n"+"Requester Address: "+astab[5]+"\n"+"Request Status: "+astab[6]);
    }

  MakeMavailable = async () => {
    console.log(this.state.id);
    const idd = this.state.assetid;
    console.log(idd);
    await this.state.contract.methods.makeAvailable(idd[this.state.id-1].toString()).send({from : this.state.accounts[0], gas : 2100000}).then(alert("Property available to buy"));
  }


  handleID = event => {
    this.setState({id : event.target.value})
  }

  render(){
    return(
      <>
        <div className='form-inputs-p'>
          <label htmlFor='id' className='label-p'>Search Property</label>
          <input className='form-input-p' id='id' type='id' name='id' placeholder='Enter the Property id' value={this.state.id} onChange={this.handleID} />
        </div>
        <button className="input-butt" onClick={this.ViewAssets}>Search</button>
        <button className="input-butt" onClick={this.MakeMavailable}>Make Available</button>
    </>
    );
  }
}
export default Profile;
