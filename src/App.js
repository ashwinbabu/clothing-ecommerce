import React from 'react';
import {HomePage} from './Pages/Homepage/homepage.component';
import ShopPage from './Pages/Shop/shop.component';
import SignInSignUp from './Pages/SignIn-SignUp/signIn-signUp.component';
import Header from './Components/header/header.component';
import {auth , createUserProfileDocument} from './firebase/firebase.utils';
import {Switch , Route} from 'react-router-dom';
import './App.css';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser : null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if (userAuth) {
        // console.log("userAuth ",userAuth);
        const userRef= await createUserProfileDocument(userAuth);
        // console.log("userRef from createUserProfileDocument ",userRef);
        userRef.onSnapshot(snapShot => {
          // console.log("snapShot ", snapShot);
          this.setState({
            currentUser : {
              id :snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
        else{
        this.setState({currentUser: userAuth});
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
  return (
    <div>
      <Header currentUser={this.state.currentUser}/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/shop' component={ShopPage}/>
        <Route exact path='/signin' component={SignInSignUp}/>
        
      </Switch>
    </div>
  );
  }
}

export default App;
