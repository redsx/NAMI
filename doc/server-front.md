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
    
```
