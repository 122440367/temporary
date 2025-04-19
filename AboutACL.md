# 项目中ACL

## 关于角色 权限 各表的组成、作用和关联

### 1. **`sys_menu` 表**

- **作用**: 存储系统中的菜单或权限信息。
- **字段示例**:
  - `id`: 菜单的唯一标识。
  - `parent_id`: 父菜单的 ID，用于构建菜单的层级结构。
  - `menu_name`: 菜单名称。
  - `m_type`: 菜单类型（如目录、菜单、按钮）。
  - `path`: 菜单路径（前端路由）。
  - `perms`: 权限标识（如 `sys:user:add`）。
  - `icon`: 菜单图标。
  - `status`: 菜单状态（如启用或禁用）。
  - `create_time` 和 `update_time`: 创建和更新时间。

- **用途**:
  - 用于构建前端的菜单树。
  - 定义系统的权限点（如按钮权限）。

---

### 2. **`sys_role` 表**

- **作用**: 存储系统中的角色信息。
- **字段示例**:
  - `id`: 角色的唯一标识。
  - `r_name`: 角色名称（如管理员、普通用户）。
  - `role_key`: 角色标识（如 `ROLE_ADMIN`）。
  - `status`: 角色状态（如启用或禁用）。
  - `create_time` 和 `update_time`: 创建和更新时间。

- **用途**:
  - 定义用户的角色，用于权限管理。
  - 每个角色可以关联多个菜单或权限。

---

### 3. **`sys_role_menu` 表**

- **作用**: 角色与菜单的关联表，用于建立角色和菜单之间的多对多关系。
- **字段示例**:
  - `id`: 唯一标识。
  - `role_id`: 角色的 ID（关联 `sys_role` 表的 `id`）。
  - `menu_id`: 菜单的 ID（关联 `sys_menu` 表的 `id`）。

- **用途**:
  - 定义某个角色可以访问哪些菜单或权限。
  - 通过该表实现角色与菜单的绑定。

---

### 4. **三张表的联系**

- **关系**:
  - `sys_role` 和 `sys_menu` 是多对多关系，通过 `sys_role_menu` 表进行关联。
  - 一个角色可以关联多个菜单（权限）。
  - 一个菜单可以被多个角色关联。

- **示例**:
  - 如果角色 `管理员`（`role_id=1`）需要访问菜单 `用户管理`（`menu_id=101`）和 `角色管理`（`menu_id=102`），则在 `sys_role_menu` 表中会有两条记录：

    ```sql
    role_id | menu_id
    --------|--------
    1       | 101
    1       | 102
    ```

---

### 5. **实际应用场景**

- **菜单管理**:
  - `sys_menu` 表用于存储系统的菜单结构，前端通过接口获取菜单树。
- **角色管理**:
  - `sys_role` 表用于定义角色，管理员可以为用户分配角色。
- **权限控制**:
  - `sys_role_menu` 表用于定义角色与菜单的权限关系。
  - 在用户登录后，系统根据用户的角色查询其关联的菜单权限，并返回给前端，同时用于后端权限校验。

---

### 6. **查询示例**

- **查询某个角色的菜单列表**:

  ```sql
  SELECT m.*
  FROM sys_menu m
  JOIN sys_role_menu rm ON m.id = rm.menu_id
  WHERE rm.role_id = #{roleId};
  ```

- **查询某个用户的所有权限**（通过角色关联）:

  ```sql
  SELECT DISTINCT m.perms
  FROM sys_menu m
  JOIN sys_role_menu rm ON m.id = rm.menu_id
  JOIN sys_user_role ur ON rm.role_id = ur.role_id
  WHERE ur.user_id = #{userId};
  ```

---

### 总结

- **`sys_menu`**: 定义菜单和权限点。
- **`sys_role`**: 定义角色。
- **`sys_role_menu`**: 建立角色与菜单的多对多关系。
- **联系**: 通过 `sys_role_menu` 表，系统可以实现基于角色的权限控制，确保用户只能访问其角色允许的菜单或功能。
