### error

#### 1. request error 

```js
 {isError: ture, errMsg: string}
```

### success

#### 1. user

```js
// 1. emit 'login'
    // parameter
    {
        email: string,
        password: string
    }
    // return
    { token: string }
// 2. emit 'signUp'
    // parameter
    {
        email: string,
        nickname: string,
        password: string
    }
    // return
    { token: string }
// 3. emit 'getUserInfo'
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
// 4. initRoomList 
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
    
// 4. ajax 
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
