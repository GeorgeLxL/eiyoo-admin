import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const baseurl = import.meta.env.EY_BASE_URL;

class ProfileView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accountName: '',
            userName1: '',
            userName2: '',
            gana1: '',
            gana2: '',
            email:'',
            phone:'',
            credit:'',
            avatarimg: '',
            create:'',
            advisor_field:'',
            advisor_field1: false,
            advisor_field2: false,
            advisor_field3: false,
            advisor_field4: false,
            advisor_bio:'',
            advisor_skill:'',
            advisor_timezone:'',
        }
    }
    componentDidMount() {
        document.title = "Profile | Eiyoo"
        this.getProfile()
    }
    getProfile(){
        var loginuserData =  JSON.parse(localStorage.getItem("userData")) || null;
        if (loginuserData != null) {
            var token = loginuserData.token
        }
        var config = {
            method: 'get',
            url: `${baseurl}/api/getAdvisorProfile`,
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
            data : {}
        };
        axios(config)
            .then(async (response)=>{
                var userData= response.data.user
                var date = new Date(userData.create)
                var advisor_field = userData.advisor_field==null?'':userData.advisor_field;
                if (advisor_field.toString().includes('1')) {
                    this.setState({
                        advisor_field1: true,
                    })
                }
                if (advisor_field.toString().includes('2')) {
                    this.setState({
                        advisor_field2: true,
                    })
                }
                if (advisor_field.toString().includes('3')) {
                    this.setState({
                        advisor_field3: true,
                    })
                }
                if (advisor_field.toString().includes('4')) {
                    this.setState({
                        advisor_field4: true,
                    })
                }
                this.setState({
                    accountName:userData.accountName,
                    userName1:userData.userName1==null?'':userData.userName1,
                    userName2:userData.userName2==null?'':userData.userName2,
                    gana1:userData.gana1==null?'':userData.gana1,
                    gana2:userData.gana2==null?'':userData.gana2,
                    email:userData.email==null?'':userData.email,
                    phone:userData.phone==null?'':userData.phone,
                    credit:userData.credit==null?'':userData.credit,
                    avatarimg:userData.avatar?`${baseurl}/media/${userData.avatar}`:"",
                    create:(date.getFullYear().toString() + '年' + (date.getMonth()+1).toString() + '月' + date.getDate().toString() + '日'),
                    advisor_bio: userData.advisor_bio == null? '':userData.advisor_bio,
                    advisor_skill: userData.advisor_skill == null? '':userData.advisor_skill,
                    advisor_timezone: userData.advisor_timezone == null? '':userData.advisor_timezone,
                    advisor_field: userData.advisor_field == null? '':userData.advisor_field
                })
                var i;
                var bio = ''
                for (i=0;i<this.state.advisor_bio.split('\n').length;i++) {
                    if (i < this.state.advisor_bio.split('\n').length - 1) {
                        bio+=this.state.advisor_bio.split('\n')[i] + '<br />'
                    }
                    else {
                        bio+=this.state.advisor_bio.split('\n')[i]
                    }
                }
                this.setState({
                    advisor_bio:bio
                })
            })
            .catch((error)=>{
                if (error.response) {
                    if(error.response.status===401){
                        localStorage.removeItem("userData");
                        window.location.assign('/');
                    }
                }
            });
    }
    updateAvatar = e =>{
        let fileObj = e.target.files[0];
        let avatar = URL.createObjectURL(fileObj);
        const fd = new FormData();
        fd.append('avatar', fileObj);
        var userData =  JSON.parse(localStorage.getItem("userData")) || null;
        var token = userData.token
        axios.post(`${baseurl}/api/updateAvatar`, fd, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then((response)=>{
            window.location.reload()
        }).catch((error)=> {
        })      
        this.setState({
            avatarimg:avatar,
        })
    }
    render() {
        const {accountName,
            userName1,
            userName2,
            gana1,
            gana2,
            email,
            phone,
            credit,
            avatarimg,
            create,
            advisor_bio,
            advisor_skill,
            advisor_timezone,
            advisor_field,
            advisor_field1,
            advisor_field2,
            advisor_field3,
            advisor_field4,
        } = this.state
        return(
            <div className="profile">
                <div className="profile-img">
                    <img src={avatarimg=="" ? "/assets/img/avatar.jpg" : avatarimg} alt="avatar" />
                </div>
                <div className="profile-content">
                    <table>
                        <tbody>
                            <tr>
                                <td>アカウント名</td>
                                <td>{accountName}</td>
                            </tr>
                            <tr>
                                <td>名前</td>
                                <td>
                                    <div className="profile-name">
                                        <p>{userName1}</p>
                                        <p>{userName2}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>ふりがな</td>
                                <td>
                                    <div className="profile-name">
                                        <p>{gana1}</p>
                                        <p>{gana2}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>メール</td>
                                <td>{email}</td>
                            </tr>
                            <tr>
                                <td>電話番号</td>
                                <td>{phone}</td>
                            </tr>
                            <tr>
                                <td>報酬振込先口座</td>
                                <td>{credit}</td>
                            </tr>
                            <tr style={{display:`${advisor_field==''?"none":"table-row"}`}}>
                                <td>専門分野</td>
                                <td>
                                    <p style={{display:`${advisor_field1?"block":"none"}`}}>楽しく食事管理をサポート</p>
                                    <p style={{display:`${advisor_field2?"block":"none"}`}}>ストイックなダイエットをサポート</p>
                                    <p style={{display:`${advisor_field3?"block":"none"}`}}>細かいカロリー制限をサポート</p>
                                    <p style={{display:`${advisor_field4?"block":"none"}`}}>とくかく初心者をサポート</p>
                                </td>
                            </tr>
                            <tr>
                                <td>伝記</td>
                                <td dangerouslySetInnerHTML={{__html: advisor_bio}}></td>
                            </tr>
                            <tr>
                                <td>スケジュール</td>
                                <td>
                                    <p>
                                        {advisor_skill}<br />
                                        対応が早い時間帯<br />
                                        {advisor_timezone}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>登録日</td>
                                <td>{create}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="profile-link">
                    <Link to="profile_update">プロフィール更新</Link>
                </div>
            </div>
        )
    }
}

export default ProfileView