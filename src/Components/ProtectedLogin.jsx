import React, {Component} from "react";
import {Navigate} from "react-router-dom"
import LoginApi from "../api/LoginApi";

class ProtectedLogin extends Component {
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
                        (localStorage.getItem("role") === "ADMIN" ?
                            <Navigate to={"/admin/crowd-funding"} replace={true}/> :
                            localStorage.getItem("role") === "USER" ?
                                <Navigate to={"/dashboard/account"} replace={true}/> :
                                localStorage.getItem("role") === "MANAGER" ?
                                    <Navigate to={"/manager/admins"} replace={true}/> :
                                    <Navigate to={'/sign-in'} replace={true}/>)
                        : this.state.isAuth === false ?
                            this.props.children
                            :
                            null
                }
            </>
        );
    }
}

export default ProtectedLogin
