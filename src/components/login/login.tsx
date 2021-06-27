import { extend } from "lodash";
import React, { ChangeEvent, Component } from "react";
import "./login.scss";

interface LoginState {
  name: string;
  error: string;
}

export class Login extends Component<any, LoginState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      error: "",
    };
  }

  public setNameLocally = (args: ChangeEvent<HTMLInputElement>) => {
    const name = args.target.value;
    let error = " ";

    if (!name) {
      error = "Please enter your name";
    } else if (name.length < 2) {
      error = "Name muse include at least 2 characters";
    }

    this.setState({ error });
    this.setState({ name });
  };

  public saveNameOnSessionStorgae = () => {

    //If name is legal - Move to Home page and save name on session storage
    if (this.state.error !== " ") {
      this.setState({ error: "Please enter your name" });
      return;
    }

    sessionStorage.setItem("username", this.state.name);
    this.props.history.push("/movies");
  };

  public render() {
    return (
      <div className="login">
        <div className="login-contanier">
          <h1>Login</h1>
          <div className="name-area">
            <input
              onInput={this.setNameLocally}
              className="name-box"
              placeholder="Enter your name"
            />
            <span className="err">{this.state.error}</span>
          </div>

          <button onClick={this.saveNameOnSessionStorgae}>Login</button>
        </div>
      </div>
    );
  }
}
