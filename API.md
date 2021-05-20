## 接口文档

###### version: 2.0



#### 签名

```shell
/api/auth/getJsConfig
method: GET
```

#### 免登

```shell
/api/auth/login
method: GET
params: { code }
```

#### 资料录入

```shell
/api/member/save
method: POST
body: {
	mobile, name, gender, store, remark, imgUrl
}
```

#### 汇总各个门店人数 根据用户权限 

```shell
/api/member/totalByRole
method: GET
```

#### 会员列表查询 根据用户权限 条件筛选 

```shell
/api/member/memberList
method: POST
body: {
	id, #主键
    mobile, #手机号
    name, #会员名
    gender, # 性别
    store, # 门店名称
    remark, #备注
    userId, #当前用户id
    deptId, #部门id
    keyword, #关键字查询
    page, #页数
    size, #条数
}
```

#### 根据条件查询单条数据

```shell
/api/member/memberInfo
method: POST
body: {
	id, #主键
    mobile, #手机号
    name, #会员名
    gender, # 性别
    store, # 门店名称
    remark, #备注
    userId, #当前用户id
    deptId, #部门id
    keyword, #关键字查询
}
```

#### 根据权限 获取门店列表

```shell
/api/member/getStoreByRole
method: GET
```

#### 获取门店详情

```shell
/api/member/getStoreById
method: POST
body: {
	deptId #门店id
}
```

#### 根据id删除

```shell
/api/member/delete
method: POST
body: {
	id #主键
}
```

#### 获取我的店铺列表

```shell
/api/member/myStores
method: GET
```

