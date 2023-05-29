# Call_of_Seven_Saints

## 简介

顾名思义，这个插件的功能就一个，就是查自己七圣召唤的战绩，适合喜欢七圣召唤的玩家以及群使用。

此项目由yunzaibot/plugins/genshin目录下魔改而来，所以大家能看到很多熟悉的代码。

做这个项目的原由我在打七圣召唤的时候一波连胜，想看自己的光辉战绩却发现没有相关功能，恰好朋友给我分享了个能查七圣战绩的机器人（应该不是云崽），我就问来了接口，花了一小时魔改了一下云崽接口，就成了现在这样的插件。



## 安装Call_of_Seven_Saints

```
//在yunzaibot根目录下运行该命令
git clone https://gitee.com/huangshx2001/call_of_seven_saints.git ./plugins/call_of_seven_saints/
```



## 说明书

简单易懂的有且只有一个命令：**七圣数据**

（当然了，需要先绑定cookie，这个大家都很熟悉了，直接#扫码绑定就好了）

![image](https://img.gejiba.com/images/5d565251927ac90ccccd5b8d672b372d.png)



## 效果展示

![img](https://img.gejiba.com/images/b91f2b12bba0748d9112abc3c30d1d1b.jpg)



## 最后

如果你喜欢本项目的话，请你点亮star吧，谢谢大家！



还有就是最近实在是没什么时间，gitee私信积压了非常多都没细看，请各位轻喷！

这个项目也是1小时赶出来过过代码瘾的，肯定存在不少bug，UI也很丑（用table写的），可能日后我没很多精力更新项目，欢迎各位大佬们能提提issue，提提pr！自己fork去研究也随意！



没有爱发电

没有收款码

实在想支持点个star吧XD！



## 附：写给开发者

一些关于接口的信息，方便大家研究



```
接口地址：https://api-takumi-record.mihoyo.com/game_record/app/genshin/api/gcg/cardList
```

按yunzai的访问方法进行即可（yunzai应该是带着cookie进行get？）



|  请求参数   | 值类型 |         作用         |                   备注                    |
| :---------: | :----: | :------------------: | :---------------------------------------: |
|    limit    |  int   |  控制返回卡片的数量  |         我一般填999，获得所有卡片         |
| need_action |  bool  |    是否需要行动牌    |                                           |
| need_avatar |  bool  |    是否需要角色牌    |                                           |
| need_stats  |  bool  | 是否需要卡牌统计信息 | 这个很重要，可以获得角色出场数,角色胜场等 |
|   role_id   |  int   |       玩家uid        |                ${this.uid}                |
|   offset    |  int   | 从第几个结果获得数据 |                  一般是0                  |
|   server    |  str   |      选择服务器      |              ${this.server}               |



一些数据的获得方式：

总场数 = ∑（角色出场数）/ 3

总胜场 = ∑（角色胜场）/ 3

角色出场率 = 角色出场数 / 总场数

角色胜率 = 角色胜场 / 角色出场数