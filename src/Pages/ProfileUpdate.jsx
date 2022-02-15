import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const baseurl = import.meta.env.EY_BASE_URL;

class ProfileUpdateView extends Component {
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
            error:'',
            alertModal: false,
            advisor_time_sun: false,
            advisor_time_mon: false,
            advisor_time_tue: false,
            advisor_time_wed: false,
            advisor_time_thu: false,
            advisor_time_fri: false,
            advisor_time_sat: false,
        }
    }
    componentDidMount() {
        document.title = "Profile Edit | Eiyoo"
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
                var advisor_timezone = userData.advisor_timezone == null?'':userData.advisor_timezone
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
                if (advisor_timezone.toString().includes('日')) {
                    this.setState({
                        advisor_time_sun: true,
                    })
                }
                if (advisor_timezone.toString().includes('月')) {
                    this.setState({
                        advisor_time_mon: true,
                    })
                }
                if (advisor_timezone.toString().includes('火')) {
                    this.setState({
                        advisor_time_tue: true,
                    })
                }
                if (advisor_timezone.toString().includes('水')) {
                    this.setState({
                        advisor_time_wed: true,
                    })
                }
                if (advisor_timezone.toString().includes('木')) {
                    this.setState({
                        advisor_time_thu: true,
                    })
                }
                if (advisor_timezone.toString().includes('金')) {
                    this.setState({
                        advisor_time_fri: true,
                    })
                }
                if (advisor_timezone.toString().includes('土')) {
                    this.setState({
                        advisor_time_sat: true,
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
    inputChange = fieldName => e => {
        if(fieldName==="phone"){
            this.setState({
                [fieldName]: (e.target.value).replace(/[^0-9]/ig, '')
            })
            return;
        }
        if(fieldName==="credit"){
            this.setState({
                [fieldName]: (e.target.value).replace(/[^0-9]/ig, '')
            })
            return;
        }
        if(fieldName==="accountName"){
            this.setState({
                [fieldName]: (e.target.value).replace(/[^A-Za-z0-9]/ig, '')
            })
            return;
        }
        this.setState({
            [fieldName]: e.target.value
        })
    }
    updateProfile = e=>{
        const {accountName,
            userName1,
            userName2,
            gana1,
            gana2,
            phone,
            credit,
            advisor_bio,
            advisor_skill,
            advisor_time_sun,
            advisor_time_mon,
            advisor_time_tue,
            advisor_time_wed,
            advisor_time_thu,
            advisor_time_fri,
            advisor_time_sat,
            advisor_field1,
            advisor_field2,
            advisor_field3,
            advisor_field4,
        } = this.state
        var advisor_timezone = ''
        var advisor_field = ''
        if (advisor_field1) {
            advisor_field = '1'
        }
        if (advisor_field2) {
            advisor_field += '2'
        }
        if (advisor_field3) {
            advisor_field += '3'
        }
        if (advisor_field4) {
            advisor_field += '4'
        }
        if (advisor_time_sun) {
            advisor_timezone= '日'
        }
        if (advisor_time_mon) {
            if (advisor_time_sun) {
                advisor_timezone= advisor_timezone + '・月'
            }
            else {
                advisor_timezone= '月'
            }
        }
        if (advisor_time_tue) {
            if (!advisor_time_sun && !advisor_time_mon) {
                advisor_timezone= '火'
            }
            else {
                advisor_timezone= advisor_timezone + '・火'
            }
        }
        if (advisor_time_wed) {
            if (!advisor_time_sun && !advisor_time_mon && !advisor_time_tue) {
                advisor_timezone= '水'
            }
            else {
                advisor_timezone= advisor_timezone + '・水'
            }
        }
        if (advisor_time_thu) {
            if (!advisor_time_sun && !advisor_time_mon && !advisor_time_tue && !advisor_time_wed) {
                advisor_timezone= '木'
            }
            else {
                advisor_timezone= advisor_timezone + '・木'
            }
        }
        if (advisor_time_fri) {
            if (!advisor_time_sun && !advisor_time_mon && !advisor_time_tue && !advisor_time_wed && !advisor_time_thu) {
                advisor_timezone= '金'
            }
            else {
                advisor_timezone= advisor_timezone + '・金'
            }
        }
        if (advisor_time_sat) {
            if (!advisor_time_sun && !advisor_time_mon && !advisor_time_tue && !advisor_time_wed && !advisor_time_thu && !advisor_time_fri) {
                advisor_timezone= '土'
            }
            else {
                advisor_timezone= advisor_timezone + '・土'
            }
        }
        if (accountName=='') {
            this.setState({
                error:'アカウント名をご入力ください。',
                alertModal: true
            })
            return
        }
        if (userName1=='') {
            this.setState({
                error:'姓をご入力ください。',
                alertModal: true
            })
            return
        }
        if (userName2=='') {
            this.setState({
                error:'名をご入力ください。',
                alertModal: true
            })
            return
        }
        if (gana1=='') {
            this.setState({
                error:'せいをご入力ください。',
                alertModal: true
            })
            return
        }
        if (gana2=='') {
            this.setState({
                error:'めいをご入力ください。',
                alertModal: true
            })
            return
        }
        var data = JSON.stringify({
            'accountName': accountName,
            'userName1': userName1,
            'userName2': userName2,
            'gana1': gana1,
            'gana2': gana2,
            'phone': phone,
            'credit': credit,
            'advisor_bio': advisor_bio,
            'advisor_skill': advisor_skill,
            'advisor_timezone': advisor_timezone,
            'advisor_field': advisor_field
        })
        var userData =  JSON.parse(localStorage.getItem("userData")) || null;
        var token = userData.token
        var config = {
            method: 'post',
            url: `${baseurl}/api/updateAdvisorProfile`,
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
            data : data
        };
        axios(config)
            .then((response)=>{
                var userData= response.data.user
                this.setState({
                    accountName:userData.accountName,
                    userName1:userData.userName1==null?'':userData.userName1,
                    userName2:userData.userName2==null?'':userData.userName2,
                    gana1:userData.gana1==null?'':userData.gana1,
                    gana2:userData.gana2==null?'':userData.gana2,
                    phone:userData.phone==null?'':userData.phone,
                    credit:userData.credit==null?'':userData.credit,
                    advisor_bio: userData.advisor_bio == null? '':userData.advisor_bio,
                    advisor_skill: userData.advisor_skill == null? '':userData.advisor_skill,
                    advisor_timezone: userData.advisor_timezone == null? '':userData.advisor_timezone,
                    advisor_field: userData.advisor_field == null?'':userData.advisor_field
                })
                window.location.reload()
            })
            .catch((error) =>{
                this.setState({
                    error: 'Another user has the same Account Name.',
                    alertModal: true,
                })
            })
    }
    timeCheck = fieldName => e=> {
        this.setState({
            [fieldName]: !this.state[fieldName]
        })
    }
    modalClose = e => {
        this.setState({alertModal: false})
    }
    modalClick = e => {
        e.stopPropagation();
    }
    render() {
        const {
            accountName,
            userName1,
            userName2,
            gana1,
            gana2,
            phone,credit,
            avatarimg,
            advisor_bio,
            advisor_skill,
            advisor_timezone,
            error,
            alertModal,
            advisor_time_sun,
            advisor_time_mon,
            advisor_time_tue,
            advisor_time_wed,
            advisor_time_thu,
            advisor_time_fri,
            advisor_time_sat,
            advisor_field1,
            advisor_field2,
            advisor_field3,
            advisor_field4
        } = this.state
        return(
            <>
                <div className="profile">
                    <div className="profile-img profile-img1" onClick={(e) => this.upload.click() }>
                        <div className="profile-img-cover">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 490.337 490.337"><path d="M229.9,145.379l-47.5,47.5c-17.5,17.5-35.1,35-52.5,52.7c-4.1,4.2-7.2,9.8-8.4,15.3c-6.3,28.9-12.4,57.8-18.5,86.7 l-3.4,16c-1.6,7.8,0.5,15.6,5.8,20.9c4.1,4.1,9.8,6.4,15.8,6.4c1.7,0,3.4-0.2,5.1-0.5l17.6-3.7c28-5.9,56.1-11.9,84.1-17.7 c6.5-1.4,12-4.3,16.7-9c78.6-78.7,157.2-157.3,235.8-235.8c5.8-5.8,9-12.7,9.8-21.2c0.1-1.4,0-2.8-0.3-4.1c-0.5-2-0.9-4.1-1.4-6.1 c-1.1-5.1-2.3-10.9-4.7-16.5l0,0c-14.7-33.6-39.1-57.6-72.5-71.1c-6.7-2.7-13.8-3.6-20-4.4l-1.7-0.2c-9-1.1-17.2,1.9-24.3,9.1 C320.4,54.879,275.1,100.179,229.9,145.379z M386.4,24.679c0.2,0,0.3,0,0.5,0l1.7,0.2c5.2,0.6,10,1.2,13.8,2.8 c27.2,11,47.2,30.6,59.3,58.2c1.4,3.2,2.3,7.3,3.2,11.6c0.3,1.6,0.7,3.2,1,4.8c-0.4,1.8-1.1,3-2.5,4.3 c-78.7,78.5-157.3,157.2-235.9,235.8c-1.3,1.3-2.5,1.9-4.3,2.3c-28.1,5.9-56.1,11.8-84.2,17.7l-14.8,3.1l2.8-13.1 c6.1-28.8,12.2-57.7,18.4-86.5c0.2-0.9,1-2.3,1.9-3.3c17.4-17.6,34.8-35.1,52.3-52.5l47.5-47.5c45.3-45.3,90.6-90.6,135.8-136 C384.8,24.979,385.7,24.679,386.4,24.679z"/><path d="M38.9,109.379h174.6c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3H38.9c-21.5,0-38.9,17.5-38.9,38.9v327.4 c0,21.5,17.5,38.9,38.9,38.9h327.3c21.5,0,38.9-17.5,38.9-38.9v-167.5c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3v167.5 c0,7.9-6.5,14.4-14.4,14.4H38.9c-7.9,0-14.4-6.5-14.4-14.4v-327.3C24.5,115.879,31,109.379,38.9,109.379z"/></svg>
                        </div>
                        <img src={avatarimg=="" ? "/assets/img/avatar.jpg" : avatarimg} alt="avatar" />
                        <input type="file" onChange={this.updateAvatar} ref={(ref) => this.upload = ref} style={{ display: 'none' }} multiple accept="image/png, image/gif, image/jpeg"/>
                    </div>
                    <div className="profile-content">
                        <div className="profile-input">
                            <label>アカウント名</label>
                            <input type="text" value={accountName} onChange={this.inputChange('accountName')} />
                        </div>
                        <div className="profile-input">
                            <h4>名前</h4>
                            <div className="profile-input-name">
                                <div>
                                    <label>姓</label>
                                    <input type="text" value={userName1} onChange={this.inputChange('userName1')} />
                                </div>
                                <div>
                                    <label>名</label>
                                    <input type="text" value={userName2} onChange={this.inputChange('userName2')} />
                                </div>
                            </div>
                        </div>
                        <div className="profile-input">
                            <h4>ふりがな</h4>
                            <div className="profile-input-name">
                                <div>
                                    <label>せい</label>
                                    <input type="text" value={gana1} onChange={this.inputChange('gana1')} />
                                </div>
                                <div>
                                    <label>めい</label>
                                    <input type="text" value={gana2} onChange={this.inputChange('gana2')} />
                                </div>
                            </div>
                        </div>
                        <div className="profile-input">
                            <h4>電話番号</h4>
                            <input type="tel" value={phone} onChange={this.inputChange('phone')} />
                        </div>
                        <div className="profile-input">
                            <h4>報酬振込先口座</h4>
                            <input type="text" value={credit} onChange={this.inputChange('credit')} />
                        </div>
                        <div className="profile-input">
                            <h4>専門分野</h4>
                            <div className="profile-input-timezone profile-input-field">
                                <label htmlFor="support-fun">
                                    <input type="checkbox" id="support-fun" checked={advisor_field1} onChange={this.timeCheck('advisor_field1')} />
                                    <span></span>
                                    楽しく食事管理をサポート
                                </label>
                                <label htmlFor="support-stoic">
                                    <input type="checkbox" id="support-stoic" checked={advisor_field2} onChange={this.timeCheck('advisor_field2')} />
                                    <span></span>
                                    ストイックなダイエットをサポート
                                </label>
                                <label htmlFor="support-restriction">
                                    <input type="checkbox" id="support-restriction" checked={advisor_field3} onChange={this.timeCheck('advisor_field3')} />
                                    <span></span>
                                    細かいカロリー制限をサポート
                                </label>
                                <label htmlFor="support-beginner">
                                    <input type="checkbox" id="support-beginner" checked={advisor_field4} onChange={this.timeCheck('advisor_field4')} />
                                    <span></span>
                                    とくかく初心者をサポート
                                </label>
                            </div>
                        </div>
                        <div className="profile-input">
                            <h4>伝記</h4>
                            <textarea rows="5" value={advisor_bio} onChange={this.inputChange('advisor_bio')}></textarea>
                        </div>
                        <div className="profile-input">
                            <h4>スケジュール</h4>
                            <input type="text" value={advisor_skill} onChange={this.inputChange('advisor_skill')} placeholder="質問等受付可能時間" />
                        </div>
                        <div className="profile-input">
                            <h4>対応が早い時間帯</h4>
                            <div className="profile-input-timezone">
                                <label htmlFor="time-sun">
                                    <input type="checkbox" id="time-sun" checked={advisor_time_sun} onChange={this.timeCheck('advisor_time_sun')} />
                                    <span></span>
                                    日
                                </label>
                                <label htmlFor="time-mon">
                                    <input type="checkbox" id="time-mon" checked={advisor_time_mon} onChange={this.timeCheck('advisor_time_mon')}  />
                                    <span></span>
                                    月
                                </label>
                                <label htmlFor="time-tue">
                                    <input type="checkbox" id="time-tue" checked={advisor_time_tue} onChange={this.timeCheck('advisor_time_tue')}  />
                                    <span></span>
                                    火
                                </label>
                                <label htmlFor="time-wed">
                                    <input type="checkbox" id="time-wed" checked={advisor_time_wed} onChange={this.timeCheck('advisor_time_wed')}  />
                                    <span></span>
                                    水
                                </label>
                                <label htmlFor="time-thu">
                                    <input type="checkbox" id="time-thu" checked={advisor_time_thu} onChange={this.timeCheck('advisor_time_thu')}  />
                                    <span></span>
                                    木
                                </label>
                                <label htmlFor="time-fri">
                                    <input type="checkbox" id="time-fri" checked={advisor_time_fri} onChange={this.timeCheck('advisor_time_fri')}  />
                                    <span></span>
                                    金
                                </label>
                                <label htmlFor="time-sat">
                                    <input type="checkbox" id="time-sat" checked={advisor_time_sat} onChange={this.timeCheck('advisor_time_sat')}  />
                                    <span></span>
                                    土
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="profile-link">
                        <a onClick={this.updateProfile}>プロフィール設定</a>
                    </div>
                    <div className="profile-link">
                        <Link to="/dashboard/profile/change_email">メール更新</Link>
                        <Link to="/dashboard/profile/change_password">パスワード更新</Link>
                    </div>
                </div>
                <div className={`modal ${alertModal? "modal-show" : ""}`} onClick={this.modalClose}>
                    <div className="modal-body" onClick={this.modalClick}>
                        <p>{error}</p>
                    </div>
                </div>
            </>
        )
    }
}

export default ProfileUpdateView