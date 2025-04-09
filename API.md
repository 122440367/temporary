
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
  ```

---

## 2. 角色管理接口

### 2.1 获取角色列表

- **URL**: `/sys/acl/role/getRoleList`
- **请求方式**: `GET`
- **返回数据**:

  ```json
  {
    "code": 200,
    "message": "操作成功",
    "data": [ /* 角色列表 */ ]
  }
  ```

### 2.2 分页获取角色

- **URL**: `/sys/acl/role/getpage/{page}/{size}`
- **请求方式**: `GET`
- **请求参数**:
  - `page` (String): 页码
  - `size` (String): 每页大小
  - `roleNm` (String, 可选): 角色名称
- **返回数据**:

  ```json
  {
    "code": 200,
    "message": "操作成功",
    "data": {
      "records": [ /* 角色数据 */ ],
      "total": 100,
      "pages": 10,
      "size": 10
    }
  }
  ```

### 2.3 添加角色

- **URL**: `/sys/acl/role/add`
- **请求方式**: `POST`
- **请求参数**:
  - `SysRoleDto` (JSON): 角色信息
- **返回数据**:

  ```json
  {
    "code": 200,
    "message": "添加成功"
  }
  ```

---

## 3. 分类管理接口

### 3.1 获取一级分类

- **URL**: `/product/category/getOne`
- **请求方式**: `GET`
- **返回数据**:

  ```json
  {
    "code": 200,
    "message": "操作成功",
    "data": {
      "categorys": [ /* 一级分类列表 */ ]
    }
  }
  ```

### 3.2 添加一级分类

- **URL**: `/product/category/addCategory1`
- **请求方式**: `POST`
- **请求参数**:
  - `ProductCategoryInf` (JSON): 分类信息
- **返回数据**:

  ```json
  {
    "code": 200,
    "message": "添加成功"
  }
  ```

---

## 4. 文件上传接口

### 4.1 文件上传

- **URL**: `/comm/file/upload`
- **请求方式**: `POST`
- **请求参数**:
  - `file` (MultipartFile): 文件
- **返回数据**:

  ```json
  {
    "code": 200,
    "message": "上传成功",
    "data": {
      "filePath": "/static/images/..."
    }
  }
  ```

---

## 5. 产品管理接口

### 5.1 获取SPU分页

- **URL**: `/product/spu/getpage/{page}/{size}`
- **请求方式**: `GET`
- **请求参数**:
  - `page` (String): 页码
  - `size` (String): 每页大小
  - `categoryId` (String, 可选): 分类ID
- **返回数据**:

  ```json
  {
    "code": 200,
    "message": "操作成功",
    "data": {
      "records": [ /* SPU数据 */ ],
      "total": 100,
      "pages": 10,
      "size": 10
    }
  }
  ```

### 5.2 添加SPU

- **URL**: `/product/spu/add`
- **请求方式**: `POST`
- **请求参数**:
  - `ProductSpuDto` (JSON): SPU信息
- **返回数据**:

  ```json
  {
    "code": 200,
    "message": "添加成功"
  }
  ```

---

如果需要更详细的接口文档，请提供更多代码或具体需求信息。
