import React , {Component} from 'react'
import immutable from 'immutable'
import language from '../config/language.js'
import { setRightManager } from '../actions/pageUI.js'
import Avatar from './Avatar.jsx'
import Header from './Header.jsx'
import ContentEditableInput from './ContentEditableInput.jsx'
import ListItem from './ListItem.jsx'
import DelayedAnimation from './DelayedAnimation.jsx'
import Loading from './Loading.jsx'
import timedeal from '../util/time.js'
import ProfileSection from './ProfileSection.jsx'
import ProfileButton from './ProfileButton.jsx'
 
const avatarStyle = {padding: '0px 15px 0px 30px'};
// 由于这个组件每次刷新都会重新mount，所以不需要将组件划分
// 它的props通过请求获得，不保存在state，即使是改变了也不会再次发送请求更新props
function RoomProfile(props){
    const { isCreater, _id, avatar, bulletin, createdAt, name, creater, isLoading, handleChangeRoominfo, handleExitRoom } = props;
    return (
            <div className = 'Profile-container'>
                <Header 
                    title = {language.groupInfo}
                    leftElement = {<i className = 'icon' onClick = {()=>setRightManager({isShow:false})}>&#xe604;</i>}
                />
                {
                    isLoading ?
                    < Loading/>
                    :<div className = 'Profile-body'>
                        <div className = 'Profile-section'>
                            <div className = 'Profile-avatar'>
                                <DelayedAnimation transitionName = 'AvatarScale' delay = {0.2} timeout = {750}>
                                    <Avatar size = {200} src = {avatar} handleUpload = {handleChangeRoominfo?handleChangeRoominfo('avatar'):null}/>
                                </DelayedAnimation>
                            </div>
                            <div className = 'RoomProfile-info'>
                                <ContentEditableInput 
                                    intEditable = {false}
                                    defaultContent = {name || ''}
                                    count = {20}
                                    contorllerBtn = {isCreater}
                                    handleSubmit = {handleChangeRoominfo?handleChangeRoominfo('name'):null}
                                />
                                <p>{'Created at '+ timedeal.getYDHString(createdAt)}</p>
                            </div>
                        </div>

                        <ProfileSection className = 'RoomProfile-margin' title = {language.bulletin}>
                            <ContentEditableInput 
                                intEditable = {false}
                                defaultContent = {bulletin || ''}
                                count = {20}
                                contorllerBtn = {isCreater}
                                handleSubmit = {handleChangeRoominfo?handleChangeRoominfo('bulletin'):null}
                            />
                        </ProfileSection>

                        <ProfileSection className = 'RoomProfile-section RoomProfile-margin' title = {language.participants} titleClass = 'RoomProfile-section-title'>
                            <ul className = 'List'>
                                {/*<ListItem name = {language.addPart} icon = '&#xe60a;' avatarStyle = {avatarStyle}/>*/}
                                <ListItem name = {language.inviteLink} icon = '&#xe605;' avatarStyle = {avatarStyle} handleClick = {()=>{setRightManager({isShow:true,state:'invite'})}}/>
                                {
                                    creater 
                                    &&
                                    <ListItem 
                                        name = {creater.nickname} 
                                        secondary = {creater.status} 
                                        avatar = {creater.avatar}  
                                        marker = 'admin' 
                                        avatarStyle = {avatarStyle}
                                    />
                                }
                            </ul>
                        </ProfileSection>
                        
                        <ProfileButton 
                            className = 'RoomProfile-margin' 
                            color = '#D70000' 
                            unicode = '&#xe616;' 
                            text = {language.exitGroup}
                            handleClick = {handleExitRoom}
                        />
                        
                    </div>  
                }
            </div>
    );
}

export default RoomProfile;