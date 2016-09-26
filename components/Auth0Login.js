/* ===== ./src/views/Main/Login/Login.js ===== */
import React, { PropTypes as T } from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import AuthService from 'utils/AuthService';
import styles from './styles.module.css';


export class Auth0LoginComponent extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props
    return (
      <div className={styles.root}>
        <h2>Login</h2>
        <ButtonToolbar className={styles.toolbar}>
          <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

function mapStateToProps(state){
    return{
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        login: actions.login,
        createAccount: actions.createAccount,
        fetchData: actions.fetchData,

    }, dispatch);
}

const Auth0Login = connect(mapStateToProps, mapDispatchToProps)(Auth0LoginComponent);
export default Auth0Login;