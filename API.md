
# 接口文档

## 1. 用户相关接口

### 1.1 登录接口

- **URL**: `/toLogin`
- **请求方式**: `POST`
- **请求参数**:
  - `username` (String): 用户名
  - `password` (String): 密码
- **返回数据**:

  ```json
  {
    "success": true,
    "code": 200,
    "message": "登录成功",
    "data": {
        "token": "d66f3dd5bcb9402dbdd008209c3f0bbd"
    }
  }
  ```

### 1.2 获取用户信息

- **URL**: `/user/getUserInf`
- **请求方式**: `GET`
- **返回数据**:

  ```json
    {
        "success": true,
        "code": 200,
        "message": "成功",
        "data": {
            "menuList": [],
            "buttonList": [],
            "userInf": {
                "id": 1,
                "loginId": "admin",
                "nickName": "管理员账号",
                "password": "$2a$10$5VUHUT6UJG1zrSWTbMMn5O0Hie3Qh0Q5kZ9wpDRm.VOOFNoYiOFdm",
                "status": "1",
                "email": "",
                "mobile": "18696119916",
                "sex": "",
                "avatar": "",
                "userType": "1",
                "createBy": "",
                "createTime": "2025-04-09 11:19:50",
                "updateBy": "",
                "roleNms": null,
                "updateTime": "2025-04-09 11:19:50",
                "deleted": "1",
                "sourceType": "1"
            },
            "roleList": []
        }
    }
    {
    "success": false,
    "code": 201,
    "message": "token过期或不存在,请重新登录获取",
    "data": {}
    }
  ```

### 1.3 退出登录

- **URL**: `/user/logout`
- **请求方式**: `GET`
- **返回数据**:

  ```json
  {
    "success": true,
    "code": 200,
    "message": "退出登录成功！",
    "data": {}
  }
  {
    "success": false,
    "code": 201,
    "message": "token过期或不存在,请重新登录获取",
    "data": {}
  }

  ```

---

## 2. 商品管理接口

### 2.1  获取品牌分页列表

- **URL**:`product/brand/getpage`
- **请求方式**：`POST/GET`
- **请求参数**：
  - `page`:
  - `size`: 
  - `tmName`：品牌名称(可选 用于搜索)
- **返回数据**：
  
``` json
{
    "success": true,
    "code": 200,
    "message": "成功",
    "data": {
        "total": 2,
        "pages": 1,
        "size": 2,
        "records": [
            {
                "id": 1,
                "tmName": "KFC肯德基",
                "logoUrl": "https://tse1-mm.cn.bing.net/th/id/OIP-C.anWuAPUpP4F_TGXX9yTTcwHaEA?w=319&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
                "createTime": "2025-04-12T07:33:18.000+00:00",
                "updateTime": "2025-04-12T07:33:18.000+00:00",
                "remark": "KFC Crazy Thursday VM 50"
            },
            {
                "id": 2,
                "tmName": "KFC肯德基",
                "logoUrl": "https://tse1-mm.cn.bing.net/th/id/OIP-C.anWuAPUpP4F_TGXX9yTTcwHaEA?w=319&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
                "createTime": "2025-04-12T07:33:36.000+00:00",
                "updateTime": "2025-04-12T07:33:36.000+00:00",
                "remark": "肯德基疯狂星期四 v我五十"
            }
        ]
    }
}
```

### 2.2 添加品牌

- **URL**:`/product/brand/add`
- **请求方式**:`POST`
- **请求参数**:
  - `tmName`： 品牌名称(必选)
  - `logoUrl`：品牌LOGO(可选)
  - `remark`： 备注(可选)
- **返回数据**：

``` json
{
    "success": true,
    "code": 200,
    "message": "添加成功！",
    "data": {}
}
```

### 2.3 更新品牌

- **URL**:`/product/brand/upd`
- **请求方式**:`PUT`
- **请求参数**:
  - `id`:品牌id(必选)
  - `tmName`： 品牌名称(？)
  - `logoUrl`：品牌LOGO(可选)
  - `remark`： 备注(可选)
- **返回数据**：

```json
{
    "success": true,
    "code": 200,
    "message": "修改成功！",
    "data": {}
}
```

### 2.3 删除品牌

- **URL**:`/product/brand/delete/{id}`
- **请求方式**:`DELETE`
- **请求参数**:
  - `id`:品牌id(必选)
- **返回数据**：

```json
{
    "success": true,
    "code": 200,
    "message": "删除成功！",
    "data": {}
}
```
