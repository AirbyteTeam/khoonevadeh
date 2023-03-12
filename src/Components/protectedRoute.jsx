import React, {Component} from "react";
import {Navigate} from "react-router-dom"
import LoginApi from "../api/LoginApi";

class ProtectedRoute extends Component {
    state = {
        isAuth: null
    }

    async componentWillMount() {
        await LoginApi().then((response) => {
            if (response.status === 200) {
                this.setState({isAuth: true})
                return this.state.isAuth
            }
        }).catch((error) => {
            if (error.response.status === 403) {
                localStorage.clear()
                this.setState({isAuth: false})
                return this.state.isAuth
            }
        })
    }

    render() {
        return (
            <>
                {
                    this.state.isAuth === true ?
                        this.props.children
                        : this.state.isAuth === false ?
                            <Navigate to={'/sign-in'} replace={true}/>
                            :
                            null
                }
            </>
        );
    }
}
export default ProtectedRoute