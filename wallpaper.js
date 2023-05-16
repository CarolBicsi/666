import { segment } from "oicq";
import fetch from "node-fetch";


const _path = process.cwd();


export class wallpaper extends plugin {
  constructor () {
    super({
      name: 'wallpaper',
      dsc: '壁纸',
      event: 'message',
      priority: 500,
      rule: [
        {
          reg: "^#?(手机壁纸|pe壁纸)$",
          fnc: 'pe'
        },
        {
          reg: "^#?(电脑壁纸|pc壁纸)$",
          fnc: 'pc'
        },
        {
          reg: "^#?(风景|二次元风景)$",
          fnc: 'scenery'
        },      
      ]
    })

  }


	async pe(e) {
        //e.msg 用户的命令消息
        console.log("用户命令：", e.msg);
        //执行的逻辑功能
        let url = `https://api.ghser.com/random/pe.php`;
        let res = await fetch(url).catch((err) => logger.error(err));
        
        let msg = [segment.at(e.user_id), segment.image(res.url)];

        //发送消息
        e.reply(msg);

        return true; //返回true 阻挡消息不再往下
    }

	async pc(e) {
        //e.msg 用户的命令消息
        console.log("用户命令：", e.msg);
        //执行的逻辑功能
        let url = `https://api.ghser.com/random/pc.php`;
        let res = await fetch(url).catch((err) => logger.error(err));
        
        let msg = [segment.at(e.user_id), segment.image(res.url)];

        //发送消息
        e.reply(msg);

        return true; //返回true 阻挡消息不再往下
    }

	async scenery(e) {
        //e.msg 用户的命令消息
        console.log("用户命令：", e.msg);
        //执行的逻辑功能
        let url = `https://api.ghser.com/random/bg.php`;
        let res = await fetch(url).catch((err) => logger.error(err));
        
        let msg = [segment.at(e.user_id), segment.image(res.url)];

        //发送消息
        e.reply(msg);

        return true; //返回true 阻挡消息不再往下
    }

}