import plugin from '../../../lib/plugins/plugin.js'
import fs from 'node:fs'
import puppeteer from '../../../lib/puppeteer/puppeteer.js'
import RoleIndex from '../model/get_data.js'
export class role extends plugin {
  constructor () {
    super({
      name: '七圣召唤数据查询',
      dsc: '原神角色信息查询',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#*七圣(召唤)?数据$',
          fnc: 'roleIndex'
        }
      ]
    })
  }

  /** 初始化配置文件 */
  async init () {
    let file = './data/MysCookie'
    if (!fs.existsSync(file)) {
      fs.mkdirSync(file)
    }
  }

  async roleIndex () {
    let data = await RoleIndex.get(this.e)
    if (!data) return

    let img = await puppeteer.screenshot('call_of_seven_saints', data)
    if (img) await this.reply(img)
  }
}
