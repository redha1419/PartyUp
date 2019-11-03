import React, {createContext, Component} from 'react';

export const TokenContext = createContext();

class TokenContextProvier extends Component {
    state = {
        token: "",
        nickname: "",
        auth: false,
        code: ""
    }
    setToken = (token) => {
        this.setState({token : token});
    }
    unSetToken = () => {
        this.setState({token : ""});
    }
    authenticate = (nickname) => {
        this.setState({auth : true, nickname: nickname});
    }
    unAuthenticate = () => {
        this.setState({auth : false, nickname: ""});
    }
    setCode = (code) => {
        this.setState({code : code});
    }
    unSetCode = () => {
        this.setState({code : ""});
    }
    render(){
        return (
        <TokenContext.Provider value={{...this.state, authenticate: this.authenticate, unAuthenticate: this.unAuthenticate, setToken: this.setToken, unSetToken: this.unSetToken, setCode: this.setCode, unSetCode: this.unSetCode}}>
            {this.props.children}
        </TokenContext.Provider>);
    };
}

export default TokenContextProvier;

