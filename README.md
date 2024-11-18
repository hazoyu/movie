# 电影购票管理系统
技术栈：Vue3、Vite、VueRouter、Pinia、Element-Plus、Axios、less

本项目旨在开发一个集电影查询、在线选座、用户评价、后台管理等功能于一体的电影购票系统前端界面
## 功能介绍
* 用户登录：输入用户名密码点击登录进行校验，校验通过调取后端接口，调用成功，跳转首页
* 用户权限：根据登录获取到的用户信息，来获取到不同头部菜单，管理员会多一个管理按钮，点击可进入后台管理界面
* 个人订单：用户可以查看已购买的电影票
* 用户个人信息修改：用户可以修改头像，用户名，电话，密码等个人信息
* 电影搜索：输入电影名称，点击搜索可跳转到电影详细页
* 电影购买：选择影院后选择放映厅，然后进行座位选择，选择完毕后台跳转到支付页，支付成功生成订单
* 管理：管理员可对用户、影院、电影、影厅、场次进行增删改查操作，可对评论，订单进行删查操作
* 添加影台：根据已有影院，对影院进行影厅的增加
* 添加场次：根据已有的影院，对选择的影院对应的影厅，添加电影放映场次
## 项目结构/目录介绍
![alt text](/src/assets/image-2.png)

![alt text](/src/assets/image-1.png)

## 预览
### 登录页
![alt text](/src/assets/image-3.png)
### 首页
* 管理员
![alt text](/src/assets/image-4.png)
* 用户
![alt text](/src/assets/image-5.png)
### 电影详细页
![alt text](/src/assets/image-6.png)
### 电影购买页
* 影院选择页
![alt text](/src/assets/image-7.png)
* 影厅选择页
![alt text](/src/assets/image-8.png)
* 选择座位页
![alt text](/src/assets/image-9.png)
* 付款页
![alt text](/src/assets/image-10.png)
* 支付成功页
![alt text](/src/assets/image-11.png)
### 个人中心页
* 我的订单页 
![alt text](/src/assets/image-12.png)
* 基本信息页
![alt text](/src/assets/image-13.png)
* 修改密码页
![alt text](/src/assets/image-14.png)
### 用户管理页
![alt text](/src/assets/image-15.png)
* 新增用户
![alt text](/src/assets/image-16.png)