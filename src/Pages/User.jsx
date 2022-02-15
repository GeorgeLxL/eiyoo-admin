import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const baseurl = import.meta.env.EY_BASE_URL;

function UserView() {
    const [users, setUsers] = useState([]);
    const [membership, setMembership] = useState(0);
    const [keyWord, setKeyWord] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageOffset, setPageOffset] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [pk, setPk] = useState('');
    const [offsetSelect1, setOffsetSelect1] = useState(false);
    const [offsetSelect2, setOffsetSelect2] = useState(false)
    const [pagenate, setPagenate] = useState([]);
    const [emailModal, setEmailModal] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [upgradeModal, setUpgradeModal] = useState(false);
    const [downgradeModal, setDowngradeModal] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [confirmNewEmail, setConfirmNewEmail] = useState('');
    const [error, setError] = useState(false);
    const [errorContent, setErrorContent] = useState('');
    const [errorModal, setErrorModal] = useState(false)

    const getUserList = () => {
        var loginuserData =  JSON.parse(localStorage.getItem("userData")) || null;
        if (loginuserData != null) {
            var token = loginuserData.token
        }
        var data = JSON.stringify({ 'user_type': 'user', 'membership': membership, 'keyWord': keyWord, 'pageNumber': pageNumber, 'pageOffset': pageOffset})
        var config = {
            method: 'post',
            url: `${baseurl}/api/admin_get_user_list`,
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
            data: data
        }
        axios(config)
            .then((response)=>{
                setUsers(response.data.users)
                setPageCount(response.data.pageCount)
                var pagenate = []
                for (let i=1;i<=response.data.pageCount;i++) {
                    if (response.data.pageCount<4) {
                        pagenate.push(i)
                    }
                    else {
                        if (i==1) {
                            pagenate.push(1)
                            if (pageNumber==1) {
                                pagenate.push(2, 3)
                                if (response.data.pageCount>4) {
                                    pagenate.push('...')
                                }
                            }
                        }
                        else if (i>1 && i< response.data.pageCount) {
                            
                            if (pageNumber == i) {
                                if (i< response.data.pageCount-1){
                                    if (i==2) {
                                        pagenate.push(i)
                                    }
                                    else if (i>2) {
                                        if (i>=4) {
                                            pagenate.push('...')
                                        }
                                        pagenate.push(i-1,i)
                                    }
                                    if (i<response.data.pageCount-1) {
                                        pagenate.push(i+1)
                                        if (i<response.data.pageCount-2) {
                                            pagenate.push('...')
                                        }
                                    }
                                }
                                else {
                                    if (response.data.pageCount>4) {
                                        pagenate.push('...')
                                    }
                                    pagenate.push(response.data.pageCount-2, response.data.pageCount-1)
                                }
                            }
                        }
                        else if (i==response.data.pageCount) {
                            
                            if (pageNumber==response.data.pageCount) {
                                if (response.data.pageCount>4) {
                                    pagenate.push('...')
                                }
                                pagenate.push(response.data.pageCount-2, response.data.pageCount-1)
                            }
                            pagenate.push(response.data.pageCount)
                        }
                    }
                }
                setPagenate(pagenate)
            })
            .catch((error)=>{

            })
    }
    useEffect(()=>{
        document.title = "ユーザー | Eiyoo"
    },[])
    useEffect(()=>{
        getUserList()
    }, [membership])
    useEffect(()=>{
        getUserList()
    }, [keyWord])
    useEffect(()=>{
        getUserList()
    }, [pageNumber])
    useEffect(()=>{
        getUserList()
    }, [pageOffset])

    const prevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1)
        }
    }

    const nextPage = () => {
        if (pageNumber < pageCount) {
            setPageNumber(pageNumber + 1)
        }
    }

    const OffsetSelect1 = () => {
        setOffsetSelect1(!offsetSelect1)
        var pageOffsetSelect1 = document.getElementsByClassName('offsetSelect1')[0];
        if (!offsetSelect1) {
            pageOffsetSelect1.style.height = pageOffsetSelect1.scrollHeight + 'px';
        }
        else {
            pageOffsetSelect1.style.height = null
        }
    }

    const OffsetSelect2 = () => {
        setOffsetSelect2(!offsetSelect2)
        var pageOffsetSelect2 = document.getElementsByClassName('offsetSelect2')[0];
        if (!offsetSelect2) {
            pageOffsetSelect2.style.height = pageOffsetSelect2.scrollHeight + 'px';
        }
        else {
            pageOffsetSelect2.style.height = null
        }
    }
    
    const updateEmail = (pk) => {
        setPk(pk)
        setEmailModal(true)
    }
    
    const updatePassword = (pk) => {
        setPk(pk)
        setPasswordModal(true)
    }

    const deleteUser = (pk) => {
        setPk(pk)
        setDeleteModal(true)
    }

    const updateEmailConfirm = () =>{
        if (newEmail == '') {
            setError(true)
            return
        }
        if (confirmNewEmail == '') {
            setError(true)
            return
        }
        if (newEmail != confirmNewEmail) {
            setError(true)
            return
        }
        else {
            setError(false);
            var loginuserData =  JSON.parse(localStorage.getItem("userData")) || null;
            if (loginuserData != null) {
                var token = loginuserData.token
            }
            var data = JSON.stringify({'pk': pk, 'email': newEmail})
            var config = {
                method: 'post',
                url: `${baseurl}/api/admin_change_user_email`,
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
                },
                data: data
            }
            axios(config)
                .then((response)=>{
                    setNewEmail('')
                    setConfirmNewEmail('')
                    setPk('')
                    setEmailModal(false)
                    getUserList()
                    setErrorContent('メールは正常に変更されました。')
                    setErrorModal(true)
                })
                .catch((error)=>{
                    setErrorContent('メール変更中にエラーが発生しました。')
                    setErrorModal(true)
                })
        }
    }

    const updatePasswordConfirm = () =>{
        var loginuserData =  JSON.parse(localStorage.getItem("userData")) || null;
        if (loginuserData != null) {
            var token = loginuserData.token
        }
        var data = JSON.stringify({'pk': pk})
        var config = {
            method: 'post',
            url: `${baseurl}/api/admin_change_user_password`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: data
        }
        axios(config)
            .then((response)=>{
                setPk('')
                setPasswordModal(false)
                getUserList()
                setErrorContent('パスワードは正常に変更されました。')
                setErrorModal(true)
            })
            .catch((error)=>{
                setErrorContent('パスワード変更中にエラーが発生しました。')
                setErrorModal(true)
            })
    }

    const deleteUserConfirm = () => {
        var loginuserData =  JSON.parse(localStorage.getItem("userData")) || null;
        if (loginuserData != null) {
            var token = loginuserData.token
        }
        var data = JSON.stringify({'pk': pk})
        var config = {
            method: 'post',
            url: `${baseurl}/api/admin_delete_user`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: data
        }
        axios(config)
            .then((response)=>{
                setDeleteModal(false)
                setPk('')
                getUserList()
                setErrorContent('ユーザーが正常に削除されました。')
                setErrorModal(true)
            })
            .catch((error)=>{
                setErrorContent('ユーザー削除中にエラーが発生しました。')
                setErrorModal(true)
            })
    }

    const upgrade = (pk) => {
        setPk(pk)
        setUpgradeModal(true)
    }

    const downgrade = (pk) => {
        setPk(pk)
        setDowngradeModal(true)
    }

    const upgradeConfirm = () => {
        var loginuserData =  JSON.parse(localStorage.getItem("userData")) || null;
        if (loginuserData != null) {
            var token = loginuserData.token
        }
        var data = JSON.stringify({'pk': pk})
        var config = {
            method: 'post',
            url: `${baseurl}/api/admin_upgrade_user`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: data
        }
        axios(config)
            .then((response)=>{
                setUpgradeModal(false)
                setPk('')
                getUserList()
                setErrorContent('会員が有料会員に切替されました。')
                setErrorModal(true)
            })
            .catch((error)=>{
                setErrorContent('有料会員に切替中に要油が発生しました。')
                setErrorModal(true)
            })
    }

    const downgradeConfirm = () => {
        var loginuserData =  JSON.parse(localStorage.getItem("userData")) || null;
        if (loginuserData != null) {
            var token = loginuserData.token
        }
        var data = JSON.stringify({'pk': pk})
        var config = {
            method: 'post',
            url: `${baseurl}/api/admin_downgrade_user`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: data
        }
        axios(config)
            .then((response)=>{
                setDowngradeModal(false)
                setPk('')
                getUserList()
                setErrorContent('会員が無料会員に切替されました。')
                setErrorModal(true)
            })
            .catch((error)=>{
                setErrorContent('無料会員に切替中に要油が発生しました。')
                setErrorModal(true)
            })
    }

    return(
        <>
            <div className="user">
                <div className="user-container">
                    <div className="user-tab">
                        <a className={membership==0?'current':''} onClick={()=>setMembership(0)}>全会員</a>
                        <a className={membership==1?'current':''} onClick={()=>setMembership(1)}>無料会員</a>
                        <a className={membership==2?'current':''} onClick={()=>setMembership(2)}>有料会員</a>
                    </div>
                    <div className="user-main-container">
                        <div className="user-search">
                            <input type="text" value={keyWord} onChange={(e)=>setKeyWord(e.target.value)} />
                        </div>
                        <div className="user-pageoffset">
                            <p>ページあたり</p>
                            <div className={`user-pageoffset-select ${offsetSelect1?'show':''}`} onClick={OffsetSelect1}>
                                {pageOffset}
                                <div className="user-pageoffset-select-content offsetSelect1" >
                                    <a onClick={()=>setPageOffset(10)}>10</a>
                                    <a onClick={()=>setPageOffset(30)}>30</a>
                                    <a onClick={()=>setPageOffset(50)}>50</a>
                                </div>
                            </div>
                            <p>人</p>
                        </div>
                        <div className="user-content">
                            <table>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>アカウント名</td>
                                        <td>お名前</td>
                                        <td>ふりがな</td>
                                        <td>メールアドレス</td>
                                        <td>電話番号</td>
                                        <td>登録日</td>
                                        <td>最終ログイン</td>
                                        {
                                            membership>1?
                                            <>
                                                <td>支払日</td>
                                                <td>終了日</td>
                                                <td>アドバイザー</td>
                                            </>
                                            :
                                            <></>
                                        }
                                        <td>操作</td>
                                    </tr>
                                    {
                                        users.map((user, index)=>(
                                            <tr
                                                key={index}
                                            >
                                                <td><img src={user.avatar==null?'/assets/img/avatar.jpg':`${baseurl}/media/${user.avatar}`} alt="" /></td>
                                                <td>{user.accountName}</td>
                                                <td>{user.name1} {user.name2}</td>
                                                <td>{user.gana1} {user.gana2}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>{(new Date(user.created_at).getFullYear()).toString() + '年' + (new Date(user.created_at).getMonth() + 1).toString() + '月' + (new Date(user.created_at).getDate()).toString() + '日'}</td>
                                                <td>{(new Date(user.last_login).getFullYear()).toString() + '年' + (new Date(user.last_login).getMonth() + 1).toString() + '月' + (new Date(user.last_login).getDate()).toString() + '日'}</td>
                                                {
                                                    membership>1?
                                                    <>
                                                        <td>{(new Date(user.paydate).getFullYear()).toString() + '年' + (new Date(user.paydate).getMonth() + 1).toString() + '月' + (new Date(user.paydate).getDate()).toString() + '日'}</td>
                                                        <td>
                                                            {
                                                                (new Date(user.expirydate).getFullYear()).toString() == '10000'?
                                                                '無期限'
                                                                :
                                                                (new Date(user.expirydate).getFullYear()).toString() + '年' + (new Date(user.expirydate).getMonth() + 1).toString() + '月' + (new Date(user.expirydate).getDate()).toString() + '日'
                                                            }
                                                        </td>
                                                        {
                                                            user.advisor!=''?
                                                            <td>{user.advisor}</td>
                                                            :
                                                            <td></td>
                                                        }
                                                    </>
                                                    :
                                                    <></>
                                                }
                                                <td>
                                                    <div>
                                                        {
                                                            membership == 1?
                                                            <a onClick={()=>upgrade(user.pk)}>有料切替</a>
                                                            :
                                                            membership == 2?
                                                            <a onClick={()=>downgrade(user.pk)}>無料切替</a>
                                                            :
                                                            <></>
                                                        }
                                                        <a onClick={()=>updateEmail(user.pk)}>メール変更</a>
                                                        <a onClick={()=>updatePassword(user.pk)}>パスワード変更</a>
                                                        <a onClick={()=>deleteUser(user.pk)}>削除</a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="user-pageoffset">
                            <p>ページあたり</p>
                            <div className={`user-pageoffset-select ${offsetSelect2?'show':''}`} onClick={OffsetSelect2}>
                                {pageOffset}
                                <div className="user-pageoffset-select-content offsetSelect2" >
                                    <a onClick={()=>setPageOffset(10)}>10</a>
                                    <a onClick={()=>setPageOffset(30)}>30</a>
                                    <a onClick={()=>setPageOffset(50)}>50</a>
                                </div>
                            </div>
                            <p>人</p>
                        </div>
                        <div className="user-pagenate">
                            <a className="pagenate-prev" onClick={prevPage}></a>
                            {
                                pagenate.map((page, index)=>(
                                    page =='...'?
                                    <p key={index}>...</p>
                                    :
                                    <a key={index} className={`${pageNumber==page?'current':''}`} onClick={()=>setPageNumber(page)}>{page}</a>
                                ))
                            }
                            <a className="pagenate-next" onClick={nextPage}></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`modal ${emailModal?'modal-show':''}`} onClick={()=>(setEmailModal(false), setPk(''), setError(false), setNewEmail(''), setConfirmNewEmail(''))}>
                <div className="modal-body" onClick={(e)=>e.stopPropagation()}>
                    {
                        pk!=''?
                        <>
                            <h4>メール変更</h4>
                            <img className="modal-img" src={users.filter(user=>(user.pk == pk))[0].avatar?`${baseurl}/media/${users.filter(user=>(user.pk == pk))[0].avatar}`:'/assets/img/avatar.jpg'} alt="" />
                            <table className="modal-input">
                                <tbody>
                                    <tr>
                                        <td>アカウント名</td>
                                        <td>{users.filter(user=>(user.pk == pk))[0].accountName}</td>
                                    </tr>
                                    <tr>
                                        <td>お名前</td>
                                        <td>{users.filter(user=>(user.pk == pk))[0].name1} {users.filter(user=>(user.pk == pk))[0].name2}</td>
                                    </tr>
                                    <tr>
                                        <td>新しいメール</td>
                                        <td><input className={error?'error':''} type="email" value={newEmail} onChange={(e)=>(setNewEmail(e.target.value), setError(false))} /></td>
                                    </tr>
                                    <tr>
                                        <td>新しいメール確認</td>
                                        <td><input className={error?'error':''} type="email" value={confirmNewEmail} onChange={(e)=>(setConfirmNewEmail(e.target.value), setError(false))} /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="modal-confirm">
                                <a onClick={updateEmailConfirm}>確認</a>
                                <a className="danger" onClick={()=>(setEmailModal(false), setPk(''), setError(false), setNewEmail(''), setConfirmNewEmail(''))}>キャンセル</a>
                            </div>
                        </>
                        
                        :
                        <></>
                    }
                </div>
            </div>
            <div className={`modal ${passwordModal?'modal-show':''}`} onClick={()=>(setPasswordModal(false), setPk(''), setError(false))}>
                <div className="modal-body" onClick={(e)=>e.stopPropagation()}>
                    {
                        pk!=''?
                        <>
                            <h4>パスワード変更</h4>
                            <img className="modal-img" src={users.filter(user=>(user.pk == pk))[0].avatar?`${baseurl}/media/${users.filter(user=>(user.pk == pk))[0].avatar}`:'/assets/img/avatar.jpg'} alt="" />
                            <table className="modal-input modal-input-pass">
                                <tbody>
                                    <tr>
                                        <td>アカウント名</td>
                                        <td>{users.filter(user=>(user.pk == pk))[0].accountName}</td>
                                    </tr>
                                    <tr>
                                        <td>お名前</td>
                                        <td>{users.filter(user=>(user.pk == pk))[0].name1} {users.filter(user=>(user.pk == pk))[0].name2}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="modal-confirm">
                                <a onClick={updatePasswordConfirm}>パスワード変更</a>
                                <a className="danger" onClick={()=>(setPasswordModal(false), setPk(''), setError(false))}>キャンセル</a>
                            </div>
                        </>
                        
                        :
                        <></>
                    }
                </div>
            </div>
            <div className={`modal ${upgradeModal?'modal-show':''}`} onClick={()=>(setUpgradeModal(false), setPk(''), setError(false))}>
                <div className="modal-body">
                    {
                        pk!=''?
                        <>
                            <h4>有料会員切替</h4>
                            <div className="modal-confirm">
                                <a onClick={upgradeConfirm}>確認</a>
                                <a className="danger" onClick={()=>(setUpgradeModal(false), setPk(''))}>キャンセル</a>
                            </div>
                        </>
                        
                        :
                        <></>
                    }
                </div>
            </div>
            <div className={`modal ${downgradeModal?'modal-show':''}`} onClick={()=>(setDowngradeModal(false), setPk(''), setError(false))}>
                <div className="modal-body">
                    {
                        pk!=''?
                        <>
                            <h4>無料会員切替</h4>
                            <div className="modal-confirm">
                                <a onClick={downgradeConfirm}>確認</a>
                                <a className="danger" onClick={()=>(setDowngradeModal(false), setPk(''))}>キャンセル</a>
                            </div>
                        </>
                        
                        :
                        <></>
                    }
                </div>
            </div>
            <div className={`modal ${deleteModal?'modal-show':''}`} onClick={()=>(setDeleteModal(false), setPk(''))}>
                <div className="modal-body" onClick={(e)=>e.stopPropagation()}>
                    {
                        pk!=''?
                        <>
                            <h4>アカウント削除</h4>
                            <div className="modal-confirm">
                                <a onClick={deleteUserConfirm}>確認</a>
                                <a className="danger" onClick={()=>(setDeleteModal(false), setPk(''))}>キャンセル</a>
                            </div>
                        </>
                        
                        :
                        <></>
                    }
                </div>
            </div>
            <div className={`modal modal-error ${errorModal?'modal-show':''}`} onClick={()=>setErrorModal(false)}>
                <div className="modal-body" onClick={(e)=>e.stopPropagation()}>
                    {errorContent}
                </div>
            </div>
        </>
    )
}

export default UserView