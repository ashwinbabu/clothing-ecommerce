import React from 'react';
import {HomePage} from './Pages/Homepage/homepage.component';
import ShopPage from './Pages/Shop/shop.component';
import SignInSignUp from './Pages/SignIn-SignUp/signIn-signUp.component';
import Header from './Components/header/header.component';
import {auth , createUserProfileDocument} from './firebase/firebase.utils';
import {Switch , Route , Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {setCurrentUser} from './redux/user/user.action'
import './App.css';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if (userAuth) {
        const userRef= await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
            setCurrentUser({
              id :snapShot.id,
              ...snapShot.data()
            });
        });
      }
        else{
        setCurrentUser(userAuth);
       }
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/shop' component={ShopPage}/>
        <Route exact path='/signin' render={() => 
          {console.log("props",this.props.currentUser);
          return(this.props.currentUser ? (
            <Redirect to='/' />
          ) : (
            <SignInSignUp />
          ))}
        }/>
        
      </Switch>
    </div>
  );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser : user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
