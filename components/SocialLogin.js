import React, {Component} from 'react';
import { Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import SocialButton from 'react-social-button';
import FacebookLogin from 'react-facebook-login';
import Secrets from '../config/secrets';

export class TwitterLogin extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    loginTwitter() {

    }

    render() {
        return (
            <Button
                onClick={this.loginTwitter.bind(this) }>
                Login with TwitterLogin
            </Button>
        )
    }
}

export class Facebook extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }
    loginFacebook() {

    }
    responseFacebook(){

    }
    render() {
        return (
            <FacebookLogin
                appId={Secrets.facebook.appID}
                autoLoad={true}
                fields="name,email,picture"
                callback={this.responseFacebook}
                cssClass="btn btn-default"
                >
                <Button>
                    Login with Facebook
                </Button>
            </FacebookLogin>
        )
    }
}

export class Google extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }
    loginGoogle() {

    }
    render() {
        return (
            <Button
                onClick={this.loginGoogle.bind(this) }>
                Login with Google
            </Button>
        )
    }
}

