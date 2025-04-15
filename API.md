
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
  - `page`: 当前页
  - `size`: 分页大小
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

## 3. 文件上传

- **URL**:`/comm/file/upload`
- **请求方式**:`POST`
- **请求参数**:
  - `form-data`：file-value
- **返回数据**：

```json
{
    "success": true,
    "code": 200,
    "message": "成功",
    "data": {
        "imgUrl": "/static/images/4a6c220e654d4846803c4bbbb978b459.jpg"
    }
}
```

## 4. 属性管理

### 4.1 获取一级分类

- **URL**:`/product/category/getOne`
- **请求方式**:`GET`
- **返回数据**：

```json
{
    "success": true,
    "code": 200,
    "message": "成功",
    "data": {
        "categorys": [
            {
                "id": 1,
                "caNm": "手机",
                "type": "1",
                "ca1Id": 0,
                "ca1Nm": "",
                "ca2Id": 0,
                "ca2Nm": "",
                "createTime": "2025-04-09T11:19:50.000+00:00",
                "updateTime": "2025-04-09T11:19:50.000+00:00",
                "remark": ""
            },
            {
                "id": 2,
                "caNm": "电脑",
                "type": "1",
                "ca1Id": 0,
                "ca1Nm": "",
                "ca2Id": 0,
                "ca2Nm": "",
                "createTime": "2025-04-09T11:19:50.000+00:00",
                "updateTime": "2025-04-09T11:19:50.000+00:00",
                "remark": ""
            },
            {
                "id": 3,
                "caNm": "电视机",
                "type": "1",
                "ca1Id": 0,
                "ca1Nm": "",
                "ca2Id": 0,
                "ca2Nm": "",
                "createTime": "2025-04-09T11:19:50.000+00:00",
                "updateTime": "2025-04-09T11:19:50.000+00:00",
                "remark": ""
            },
            {
                "id": 4,
                "caNm": "油烟机",
                "type": "1",
                "ca1Id": 0,
                "ca1Nm": "",
                "ca2Id": 0,
                "ca2Nm": "",
                "createTime": "2025-04-09T11:19:50.000+00:00",
                "updateTime": "2025-04-09T11:19:50.000+00:00",
                "remark": ""
            }
        ]
    }
}
```

### 4.2 获取二级分类

- **URL**:`/product/category/getTwo/{id}`
- **请求方式**:`GET`
- **返回数据**：

```json
{
    "success": true,
    "code": 200,
    "message": "成功",
    "data": {
        "categorys": [
            {
                "id": 11,
                "caNm": "手机通讯",
                "type": "2",
                "ca1Id": 1,
                "ca1Nm": "手机",
                "ca2Id": 0,
                "ca2Nm": "",
                "createTime": "2025-04-09T11:19:50.000+00:00",
                "updateTime": "2025-04-09T11:19:50.000+00:00",
                "remark": ""
            },
            {
                "id": 12,
                "caNm": "手机零件",
                "type": "2",
                "ca1Id": 1,
                "ca1Nm": "手机",
                "ca2Id": 0,
                "ca2Nm": "",
                "createTime": "2025-04-09T11:19:50.000+00:00",
                "updateTime": "2025-04-09T11:19:50.000+00:00",
                "remark": ""
            },
            {
                "id": 13,
                "caNm": "手机电池",
                "type": "2",
                "ca1Id": 1,
                "ca1Nm": "手机",
                "ca2Id": 0,
                "ca2Nm": "",
                "createTime": "2025-04-09T11:19:50.000+00:00",
                "updateTime": "2025-04-09T11:19:50.000+00:00",
                "remark": ""
            },
            {
                "id": 22,
                "caNm": "电脑零件",
                "type": "2",
                "ca1Id": 1,
                "ca1Nm": "电脑",
                "ca2Id": 0,
                "ca2Nm": "",
                "createTime": "2025-04-09T11:19:50.000+00:00",
                "updateTime": "2025-04-09T11:19:50.000+00:00",
                "remark": ""
            },
            {
                "id": 23,
                "caNm": "电脑充电线",
                "type": "2",
                "ca1Id": 1,
                "ca1Nm": "电脑",
                "ca2Id": 0,
                "ca2Nm": "",
                "createTime": "2025-04-09T11:19:50.000+00:00",
                "updateTime": "2025-04-09T11:19:50.000+00:00",
                "remark": ""
            },
            {
                "id": 32,
                "caNm": "电视机零件",
                "type": "2",
                "ca1Id": 1,
                "ca1Nm": "电视机",
                "ca2Id": 0,
                "ca2Nm": "",
                "createTime": "2025-04-09T11:19:50.000+00:00",
                "updateTime": "2025-04-09T11:19:50.000+00:00",
                "remark": ""
            },
            {
                "id": 33,
                "caNm": "电视机节目",
                "type": "2",
                "ca1Id": 1,
                "ca1Nm": "电视机",
                "ca2Id": 0,
                "ca2Nm": "",
                "createTime": "2025-04-09T11:19:50.000+00:00",
                "updateTime": "2025-04-09T11:19:50.000+00:00",
                "remark": ""
            },
            {
                "id": 42,
                "caNm": "油烟机零件",
                "type": "2",
                "ca1Id": 1,
                "ca1Nm": "油烟机",
                "ca2Id": 0,
                "ca2Nm": "",
                "createTime": "2025-04-09T11:19:50.000+00:00",
                "updateTime": "2025-04-09T11:19:50.000+00:00",
                "remark": ""
            }
        ]
    }
}
```

### 4.3 获取三级分类

- **URL**:`/product/category/getThree`
- **请求方式**:`GET`
- **返回数据**：

```json
{
    "success": true,
    "code": 200,
    "message": "成功",
    "data": {
        "categorys": [
            {
                "id": 43,
                "caNm": "手机网络",
                "type": "3",
                "ca1Id": 1,
                "ca1Nm": "手机",
                "ca2Id": 11,
                "ca2Nm": "手机通讯",
                "createTime": "2025-04-09T11:19:50.000+00:00",
                "updateTime": "2025-04-09T11:19:50.000+00:00",
                "remark": ""
            },
            {
                "id": 44,
                "caNm": "手机网络2",
                "type": "3",
                "ca1Id": 1,
                "ca1Nm": "手机",
                "ca2Id": 11,
                "ca2Nm": "手机通讯",
                "createTime": "2025-04-09T11:19:50.000+00:00",
                "updateTime": "2025-04-09T11:19:50.000+00:00",
                "remark": ""
            }
        ]
    }
}
```

### 4.4 获取属性值

- **URL**:`/product/attr/getlist/{id}`
- **请求方式**:`GET`
- **请求参数**：三级分类id
- **返回数据**：

```json
{

    "success": true,
    "code": 200,
    "message": "成功",
    "data": {
        "attrs": [
            {
                "id": 1,
                "categoryId": 1,
                "attNm": "修改后的属性名称",
                "attrValueList": [
                    {
                        "id": 1,
                        "attrValue": "修改后的属性值1"
                    },
                    {
                        "id": 2,
                        "attrValue": "修改后的属性值2"
                    }
                ]
            }
        ]
    }
}

```

## 5 ACL

### 5.1 获取用户信息

- **URL**:`/sys/acl/user/getpage/{page}/{size}`
- **请求方式**:`GET`
- **请求参数**：userNm（可选 但是没看懂是在干嘛）
- **返回数据**：

```json
{
    "success": true,
    "code": 200,
    "message": "成功",
    "data": {
        "total": 1,
        "pages": 1,
        "hasNext": false,
        "users": [
            {
                "id": 1,
                "loginId": "admin",
                "nickName": "管理员账号",
                "password": "$2a$10$5VUHUT6UJG1zrSWTbMMn5O0Hie3Qh0Q5kZ9wpDRm.VOOFNoYiOFdm",
                "status": "1",
                "email": "",
                "mobile": "18696119916",
                "sex": "",
                "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
                "userType": "1",
                "createBy": "",
                "createTime": "2025-04-09 11:19:50",
                "updateBy": "",
                "roleNms": null,
                "updateTime": "2025-04-09 11:19:50",
                "deleted": "1",
                "sourceType": "1"
            }
        ]
    }
}

```

### 5.2 添加新用户

- **URL**:`/sys/acl/user/add`
- **请求方式**:`POST`
- **请求参数**：
  - `loginId`(String):用户名
  - `nickName`(String):用户昵称
  - `password`(String):密码
  - `roleList`(String[]):暂时不知道是啥 可选参数
- **返回数据**：

```json
{
    "success": true,
    "code": 200,
    "message": "添加用户成功！",
    "data": {}
}

```

### 5.3 修改用户信息

- **URL**:`/sys/acl/user/upd`
- **请求方式**:`PUT`
- **请求参数**：
  - `id`(number):用户id
  - `loginId`(String):用户名  可选参数
  - `nickName`(String):用户昵称 可选参数
  - `password`(String):密码     可选参数
  - `roleList`(String[]):暂时不知道是啥 可选参数
  - 四项至少有其一(大概)
- **返回数据**：

```json
{
    "success": true,
    "code": 200,
    "message": "修改用户成功！",
    "data": {}
}

```

### 5.4 修改/分配角色

- **URL**:`/sys/acl/user/allocationRoles`
- **请求方式**:`PUT`
- **请求参数**：
  - `id`(number):用户id
  - `roleList`(String[]):暂时不知道是啥 可选参数
- **返回数据**：

```json
{
    "success": true,
    "code": 200,
    "message": "用户角色分配成功！",
    "data": {}
}

```

### 5.5 删除角色

- **URL**:`/sys/acl/user/del/{id}`
- **请求方式**:`DELETE`
- **请求参数**：
  - `id`(number):用户id
- **返回数据**：

无法删除某些特定角色的用户(如系统账户)，会报出错误的message

```json
{
    "success": true,
    "code": 200,
    "message": "删除用户成功！",
    "data": {}
}

```

### 5.6 批量删除角色

- **URL**:`/sys/acl/user/batchDelete`
- **请求方式**:`DELETE`
- **请求参数**：
  - `userIdList`(String[]):用户id
- **返回数据**：

和删除方法有同样的限制

```json
{
    "success": false,
    "code": 5019,
    "message": "以下用户id为系统角色不能删除：【2,3,4】",
    "data": {}
}
```

### 5.7 获取用户角色列表

- **URL**:`/sys/acl/user/getUserRoles/{userId}`
- **请求方式**:`DELETE`
- **请求参数**：
  - `userId`(number):用户id     --Param--
- **返回数据**：

```json
{
    "success": true,
    "code": 200,
    "message": "成功",
    "data": {
        "roles": []
    }
}
```
