### error

#### 1. request error 

```js
 {isError: ture, errMsg: string}
```

### success

#### 1. user

```js
// 1.登录 'login'
// 
    // parameter
    {
        email: string,
        password: string
    }
    // return
    { token: string }
// 2.注册  'signUp'
    // parameter
    {
        email: string,
        nickname: string,
        password: string
    }
    // return
    { token: string }
// 3. 获取用户信息 'getUserInfo'
    // parameter
    { token: string }
    // return
    {
        avatar: string,
        curRoom: string,
        device: string,
        id: string,
        isPrivate: bool,
        nickname: string
    }
// 4.初始化房间列表 initRoomList 
    // parameter
    {
        token: string,  
    }
    // return
    [
        {
            _id: string,
            avatar: string,
            history: string,
            lastMessage: number,//timestamp
            name: string
            histories: [{
                _id: string,
                content: string,
                room: string,
                timestamp: number,
                type: string,
                owner: {
                    _id: string,
                    avatar: string,
                    nickname: string,
                }
            },...]
        },
        ...
    ]

//  getUsersList 获取用户列表
    {
        nickname: string,
    }

    [
        {
            _id: string, 
            avatar: string, 
            nickname: string, 
            status: string,
            onlineState: string,
            device: string,
        },
        ...
    ]

// getFriendList 获取好友列表

{
    _id: string
}

[
    {
        _id: string,
        name: string, //用户分组名称
        users: [
            {_id, avatar, nickname, status, onlineState, device},
            ...
        ]
    }
]

// updateUserInfo 更新用户信息

{
    _id, // 必需
    ...
}

{
    isOk: true,
}

// addExpression 添加自定义表情

{
    _id,
    expression: string,  // url
}

{
    isOk: true,
}

// addBlock 屏蔽某人私聊消息

{
    id,
    blockId,
}

{
    isOk: true,
}

// removeBlock 取消屏蔽
{
    id,
    blockId,
}

{
    isOk: true,
}

// getBlockList 获取被屏蔽用户列表

{
    _id,
}

{
    blocks: [
        {_id, avatar, nickname, status, onlineState, device},,
    ]
}

// initRoomItem 初始化房间信息

{
    _id, // room id
}

{
    bulletin,
    name,
    avatar,
}

// loadRoomHistories 获取房间历史消息
{
    _id, // 房间id
    limit, // 条数
    timestamp,// 最后一跳消息时间戳
}

{
    histories: [{
        owner: {_id, avatar, nickname}
        content,
        room,
        timestamp,
        type,
        _id,
    }, ...],
    bulletin,
    name,
    avatar,
}

// getRoomInfo 获取房间信息
{
    _id,
}

{
    avatar, 
    createdAt, 
    bulletin, 
    name,
    creater: {_id,avatar, nickname, status}
}

// getRoomUsers 获取房间用户

{
    nickname,
    onlineState,
}

[
    {_id, avatar, nickname, status, onlineState, device}
]

// joinRoom 加入房间
{
    user, //用户id
    inviteLink, // 邀请码
}

// exitRoom 退出房间

{
    user, // 用户id 
    room, // 房间id
}

// getInviteLink 获取邀请链接

{
    _id // 房间id
}

{
    avatar, name, inviteLink, creater
}

// refreshInviteLink 刷新邀请链接

{
    _id, // 房间id
    creater, // 创建房间用户id
}

{
    inviteLink,
}

// updateRoomInfo 更新房间信息

{
     _id, // 房间id
    creater, // 创建房间用户id
    ...
}

{ isOk }

// saveMessage 收到消息并存入数据库
{
     _id, 
     room, 
     content, 
     type, 
     token 
}

{
    owner, 
    room , 
    content,
     type, 
     timestamp, 
     _id, // 消息id
}

//  revokeMessage

{
    _id, // 消息id
    ownerId, // 发送者id
}

{ isOk: true }

// initPrivateList 初始化私聊列表，用于获取未读私聊消息

{
    token,
}

{
    _id: string,
    content: string,
    room: string,
    timestamp: number,
    type: string,
    owner: {
        _id: string,
        avatar: string,
        nickname: string,
    }
    from: {_id, avatar, nickname}
}

//getPrivateInfo 获取私聊对象信息

{
    _id,// 对方id
}

{
    avatar, nickname, lastOnlineTime, status
}

// loadPrivateHistories

{
    fromUserId, toUserId, limit
}

[
    {
        from,
        timestamp,
        to,
        type,
        content,
    }
]

// createRoom 创建房间

{
    user // user id
    roomName // 房间名称
}

{ 
    isOk: true, 
    _id // room id
}

// addRelationUser 添加用户到关系群组

{
    userId, 
    friendId, 
    relationName,
}

{isOk: true}
// 4.上传图片 ajax 
    {
        method: 'POST',
        url: '/upload/file'
        data: FormData
    }
    // return
    {
        success: bool,
        src: string
    }
```
