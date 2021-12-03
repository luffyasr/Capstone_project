import React from 'react'
import getWeb3 from "../getWeb3"
import landRegistration from "../contracts/landRegistration.json";
import './Home.css';

function Title(){
  return (
    <div className='title'>
      <h1>Welcome to Dapp Land Registry!!</h1>
    </div>
  );
}

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      contract: null,
      accounts: null,
      web3: null,
      state : '',
      district : '',
      village : '',
      surveyNumber :'',
      owneraddress : '',
      marketValue : '',
      id : '',
      adminaddress : '',
      adminvillage : '',
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

        this.setState({ web3, accounts, contract: instance }, this.runExample);
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }

    };

    runExample = async () => {
      const { accounts, contract } = this.state;
    };

    Land = async () => {

      const id = await this.state.contract.methods.computeId(this.state.state,this.state.district,this.state.village,this.state.surveyNumber).call({from : this.state.accounts[0]});
      console.log(id);
      this.setState({id : id});


      if(this.state.state == '' || this.state.district == '' || this.state.village =='' || this.state.surveyNumber == '' || this.state.marketValue =='' || this.state.owneraddress =='' ){
        alert("Please fill in the land details");
      } else {
        const result = await this.state.contract.methods.Registration(
          this.state.state,
          this.state.district,
          this.state.village,
          this.state.surveyNumber,
          this.state.owneraddress,
          this.state.marketValue,
          this.state.id,
        ).send({from : this.state.owneraddress, gas : 2100000})

        if(result){alert("Land registered successfully!!");}
      }
      window.location.reload(false);
      alert("Current User :"+" "+this.state.accounts +" "+ this.state.id);
    }

    AddADmin = async () => {
      if(this.state.adminaddress == '' || this.state.adminvillage == ''){
        alert("Please fill in the admin details");
      } else {
        await this.state.contract.methods.addSuperAdmin(
          this.state.adminaddress,
          this.state.adminvillage,
        ).send({from : this.state.adminaddress, gas: 2100000})
        window.location.reload(false);
        alert("Successfully registered Admin!!")
      }
    }


    handleState = event => {
      this.setState({ state : event.target.value})
    }

    handleDistrict = event => {
      this.setState({ district : event.target.value})
    }

    handleVillage = event => {
      this.setState({ village : event.target.value})
    }

    handleSurveyNumber = event => {
      this.setState({ surveyNumber : event.target.value})
    }

    handleOwnerAddress = event => {
      this.setState({ owneraddress : event.target.value})
    }

    handleMarketValue = event => {
      this.setState({ marketValue : event.target.value})
    }

    handleAdminAdd = event => {
      this.setState({adminaddress : event.target.value})
    }

    handleAdminVillage = event => {
      this.setState({adminvillage : event.target.value})
    }

    handleID = event => {
      this.setState({id : event.target.value})
    }


    render(){
      return (
        <div className='form-container'>
        <Title />
        <h3>Register Land Details</h3>
        <div className='form-inputs'>
          <label htmlFor='state' className='label-u'>State</label>
          <input className='form-input' id='state' type='state' name='state' placeholder='Enter the State' value={this.state.state} onChange={this.handleState} />
        </div>
        <div className='form-inputs'>
          <label htmlFor='district' className='label-u'>District</label>
          <input className='form-input' id='district' type='district' name='district' placeholder='Enter the District' value={this.state.district} onChange={this.handleDistrict} />
        </div>
        <div className='form-inputs'>
          <label htmlFor='village' className='label-u'>City/Town/Village</label>
          <input className='form-input' id='village' type='text' name='village' placeholder='Enter the City/Town/Village' value={this.state.village} onChange={this.handleVillage} />
        </div>
        <div className='form-inputs'>
          <label htmlFor='surveyNumber' className='label-u'>Survey Number</label>
          <input className='form-input' id='surveyNumber' type='surveyNumber' name='surveyNumber' placeholder='Enter the Survey Number' value={this.state.surveyNumber} onChange={this.handleSurveyNumber} />
        </div>
        <div className='form-inputs'>
          <label htmlFor='owneraddress' className='label-u'>Owner Address</label>
          <input className='form-input' id='owneraddress' type='owneraddress' name='owneraddress' placeholder='Enter the Owner Address' value={this.state.owneraddress} onChange={this.handleOwnerAddress} />
        </div>
        <div className='form-inputs'>
          <label htmlFor='marketValue' className='label-u'>Market Value</label>
          <input className='form-input' id='marketValue' type='marketValue' name='marketValue' placeholder='Enter the Market Value' value={this.state.marketValue} onChange={this.handleMarketValue} />
        </div>
        <div className='form-inputs'>
          <label htmlFor='id' className='label-u'>ID</label>
          <input className='form-input' id='id' type='id' name='id' placeholder='Enter the Property id' value={this.state.id} onChange={this.handleID} />
        </div>
        <button className='input-but' type='submit' onClick={this.Land}>Submit</button>
        <h3>Register Admin</h3>
        <div className='form-inputs'>
          <label htmlFor='adminaddress' className='label-u'>Admin Address</label>
          <input className='form-input' type='adminaddress' placeholder='Enter Admin address' value={this.state.adminaddress} onChange={this.handleAdminAdd}/>
        </div>
        <div className='form-inputs'>
          <label htmlFor='adminvillage' className='label-u'>Admin Village</label>
          <input className='form-input' type='adminvillage' placeholder='Enter Admin Village' value={this.state.adminvillage} onChange={this.handleAdminVillage}/>
        </div>
        <button className='input-but' type='submit' onClick={this.AddADmin}>Add Admin</button>
        </div>
      );
    }
  }

export default Home;
