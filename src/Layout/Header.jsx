import React, {Component, useEffect, useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const baseurl = import.meta.env.EY_BASE_URL;

function Header() {
    const Location = useLocation()
    const [tabName, setTabName] = useState();
    useEffect(()=>{
        setTabName((location.pathname).split('/')[2])
    })
    return(
        <HeaderComp Location={Location} tabName={tabName} />
    )
}

class HeaderComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuShow: false,
        }
    }
    menuShow = e => {
        e.stopPropagation()
        this.setState({menuShow: !this.state.menuShow})
    }
    menuClose = e => {
        this.setState({menuShow: false})
    }
    menuClick = e => {
        e.stopPropagation()
    }
    menuLink = e => {
        this.setState({
            menuShow: false,
        })
    }
    logout = e => {
        localStorage.removeItem('userData');
        window.location.assign('/')
    }
    render() {
        const {menuShow} = this.state
        return(
            <>
                <header>
                    <div className="header">
                        <div className={`menu-btn ${menuShow? "menu-show":""}`} onClick={this.menuShow}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <Link className="logo" onClick={this.menuLink} to="/dashboard/user"><img src="/assets/img/logo1.png" alt="logo" /></Link>
                    </div>
                </header>
                <menu className={menuShow? "menu-show":""} onClick={this.menuClose}>
                    <div className="menu" onClick={this.menuClick}>
                        <div className="menu-link">
                            <Link onClick={this.menuLink} className={this.props.tabName=='user'?"current":""} to="/dashboard/user">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><g fill="none"><path d="M 10.5 2 C 5.813079833984375 2 2 5.813079833984375 2 10.5 C 2 15.18692016601563 5.813079833984375 19 10.5 19 C 15.18692016601563 19 19 15.18692016601563 19 10.5 C 19 5.813079833984375 15.18692016601563 2 10.5 2 M 10.5 0 C 16.29899024963379 0 21 4.701009750366211 21 10.5 C 21 16.29899024963379 16.29899024963379 21 10.5 21 C 4.701009750366211 21 0 16.29899024963379 0 10.5 C 0 4.701009750366211 4.701009750366211 0 10.5 0 Z" stroke="none" fill="#707070"/></g><g transform="translate(6.5 4)" fill="none"><path d="M 4 2 C 2.897200107574463 2 2 2.897200107574463 2 4 C 2 5.102799892425537 2.897200107574463 6 4 6 C 5.102799892425537 6 6 5.102799892425537 6 4 C 6 2.897200107574463 5.102799892425537 2 4 2 M 4 0 C 6.209139823913574 0 8 1.790860176086426 8 4 C 8 6.209139823913574 6.209139823913574 8 4 8 C 1.790860176086426 8 0 6.209139823913574 0 4 C 0 1.790860176086426 1.790860176086426 0 4 0 Z" stroke="none" fill="#707070"/></g><path d="M0,0S3.75-3,7.5-3,15,0,15,0" transform="translate(3 16)" fill="none" stroke="#707070" strokeWidth="2"/></svg>
                                <span>ユーザー</span>
                            </Link>
                            <Link onClick={this.menuLink} className={this.props.tabName=='advisor'?"current":""} to="/dashboard/advisor">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><g fill="none"><path d="M 10.5 2 C 5.813079833984375 2 2 5.813079833984375 2 10.5 C 2 15.18692016601563 5.813079833984375 19 10.5 19 C 15.18692016601563 19 19 15.18692016601563 19 10.5 C 19 5.813079833984375 15.18692016601563 2 10.5 2 M 10.5 0 C 16.29899024963379 0 21 4.701009750366211 21 10.5 C 21 16.29899024963379 16.29899024963379 21 10.5 21 C 4.701009750366211 21 0 16.29899024963379 0 10.5 C 0 4.701009750366211 4.701009750366211 0 10.5 0 Z" stroke="none" fill="#707070"/></g><g transform="translate(6.5 4)" fill="none"><path d="M 4 2 C 2.897200107574463 2 2 2.897200107574463 2 4 C 2 5.102799892425537 2.897200107574463 6 4 6 C 5.102799892425537 6 6 5.102799892425537 6 4 C 6 2.897200107574463 5.102799892425537 2 4 2 M 4 0 C 6.209139823913574 0 8 1.790860176086426 8 4 C 8 6.209139823913574 6.209139823913574 8 4 8 C 1.790860176086426 8 0 6.209139823913574 0 4 C 0 1.790860176086426 1.790860176086426 0 4 0 Z" stroke="none" fill="#707070"/></g><path d="M0,0S3.75-3,7.5-3,15,0,15,0" transform="translate(3 16)" fill="none" stroke="#707070" strokeWidth="2"/></svg>
                                <span>アドバイザー</span>
                            </Link>
                            {/* <Link onClick={this.menuLink} className={this.props.tabName=='profile'?"current":""} to="/dashboard/profile">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><g fill="none"><path d="M 10.5 2 C 5.813079833984375 2 2 5.813079833984375 2 10.5 C 2 15.18692016601563 5.813079833984375 19 10.5 19 C 15.18692016601563 19 19 15.18692016601563 19 10.5 C 19 5.813079833984375 15.18692016601563 2 10.5 2 M 10.5 0 C 16.29899024963379 0 21 4.701009750366211 21 10.5 C 21 16.29899024963379 16.29899024963379 21 10.5 21 C 4.701009750366211 21 0 16.29899024963379 0 10.5 C 0 4.701009750366211 4.701009750366211 0 10.5 0 Z" stroke="none" fill="#707070"/></g><g transform="translate(6.5 4)" fill="none"><path d="M 4 2 C 2.897200107574463 2 2 2.897200107574463 2 4 C 2 5.102799892425537 2.897200107574463 6 4 6 C 5.102799892425537 6 6 5.102799892425537 6 4 C 6 2.897200107574463 5.102799892425537 2 4 2 M 4 0 C 6.209139823913574 0 8 1.790860176086426 8 4 C 8 6.209139823913574 6.209139823913574 8 4 8 C 1.790860176086426 8 0 6.209139823913574 0 4 C 0 1.790860176086426 1.790860176086426 0 4 0 Z" stroke="none" fill="#707070"/></g><path d="M0,0S3.75-3,7.5-3,15,0,15,0" transform="translate(3 16)" fill="none" stroke="#707070" strokeWidth="2"/></svg>
                                <span>プロフィール設定</span>
                            </Link> */}
                            <a onClick={this.logout}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21.414" height="21" viewBox="0 0 21.414 21"><path d="M2247,1h13V16h-13Z" transform="translate(-2246)" fill="none" stroke="#707070" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M2255,5V20l-8-4V1Z" transform="translate(-2246)" fill="none" stroke="#707070" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><line x2="8" transform="translate(12 8.5)" fill="none" stroke="#707070" strokeLinecap="round" strokeWidth="2"/><line x2="3" y2="3" transform="translate(17 5.5)" fill="none" stroke="#707070" strokeLinecap="round" strokeWidth="2"/><line y1="3" x2="3" transform="translate(17 8.5)" fill="none" stroke="#707070" strokeLinecap="round" strokeWidth="2"/></svg>
                                <span>Log out</span>
                            </a>
                        </div>
                    </div>
                    
                </menu>
            </>
        )
    }
}

export default Header