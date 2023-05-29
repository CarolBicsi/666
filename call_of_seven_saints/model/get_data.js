import base from './base.js'
import MysInfo from './mys/mysInfo.js'
import lodash from 'lodash'
import fs from 'node:fs'
import gsCfg from './gsCfg.js'
import moment from 'moment'
let imgFile = {}

export default class RoleIndex extends base {
  constructor (e) {
    super(e)
    this.model = 'roleIndex'
    this.other = gsCfg.getdefSet('role', 'other')
    this.wother = gsCfg.getdefSet('weapon', 'other')
    this.area = {
      蒙德: 1,
      璃月: 2,
      雪山: 3,
      稻妻: 4,
      渊下宫: 5,
      层岩巨渊: 6,
      层岩地下: 7,
      须弥: 8
    }

    this.areaName = lodash.invert(this.area)

    this.headIndexStyle = `<style> .head_box { background: url(${this.screenData.pluResPath}img/roleIndex/namecard/${lodash.random(1, 8)}.png) #f5f5f5; background-position-x: 30px; background-repeat: no-repeat; border-radius: 15px; font-family: tttgbnumber; padding: 10px 20px; position: relative; background-size: auto 101%; }</style>`
  }

  static async get (e) {
    let roleIndex = new RoleIndex(e)
    return await roleIndex.getIndex()
  }

  async getIndex () {
    let ApiData = {
      index: '',
      character: '',
      basicInfo: '',
      cardList: '',
      action_cardList: ''
    }
    let res = await MysInfo.get(this.e, ApiData)
    if (!res || res[0].retcode !== 0 || res[2].retcode !== 0) return false

    let ret = []
    res.forEach(v => ret.push(v.data))
    
    /** 截图数据 */
    let data = {
      quality: 80,
      ...this.screenData,
      ...this.dealData(ret)
    }
    // console.log(...this.dealData(ret))
    return data
  }

  dealData (data) {
    let [resIndex,resDetail, basicInfo, cardList, action_cardList] = data
    
    
    let rolecardList = cardList.card_list || []
    let actioncList = action_cardList.card_list || []
    
    let all_count = 0
    let all_proficiency = 0
    

    let used_card = []
    let used_role = []
    for (let j in actioncList){
        if (actioncList[j].use_count != 0){
            used_card.push(actioncList[j])
        }
    }
    
    for (let i in rolecardList){
        if (rolecardList[i].use_count != 0){
            used_role.push(rolecardList[i])
        }
        let proficiency = rolecardList[i].proficiency
        let use_count = rolecardList[i].use_count
        all_count = all_count + use_count
        all_proficiency = all_proficiency + proficiency
    }
    
    
    all_count = all_count/3
    all_proficiency = all_proficiency/3
    let winning_probability = all_proficiency / all_count * 100
    winning_probability = winning_probability.toFixed(2); 
    jsonSort(used_card, "use_count")
    jsonSort(used_role, "proficiency")
    
    
    let frequently_win = used_role.slice(0,4)
    let used_role_index = 1
    for (let i in used_role){
        if (used_role[i].proficiency != 0){
            used_role[i]["role_win_rate"] = (used_role[i].proficiency / used_role[i].use_count * 100).toFixed(2); 
        }
        else{
            used_role[i]["role_win_rate"] = 0; 
        }
        used_role[i]["index"] = used_role_index; 
        used_role[i]["oc_rate"] = (used_role[i].use_count / all_count * 100).toFixed(2); 
        used_role_index = used_role_index+1
    }
    
    
    let used_card_index = 1
    for (let i in used_card){
        used_card[i]["index"] = used_card_index; 
        used_card_index = used_card_index+1
    }
    

    let stats = resIndex.stats || {}

    let line = [
      [
        { lable: '总局数', num: all_count },
        { lable: '胜场数', num: all_proficiency },
        { lable: '胜率', num: `${winning_probability}%` },
      ]
    ]
    let listrolenumber = Array.from(Array(used_role['length']).keys()).map(x => x + 1);
    let listcardnumber = Array.from(Array(used_card['length']).keys()).map(x => x + 1);

    
    
   
    return {
      uid: this.e.uid,
      saveId: this.e.uid,
      activeDay: this.dayCount(stats.active_day_number),
      line,
      basicInfo,
      used_card,
      listcardnumber,
      used_role,
      listrolenumber,
      frequently_win,
      all_count,
      headIndexStyle: this.headIndexStyle
    }
  }

  dayCount (num) {
    let year = Math.floor(num / 365)
    let month = Math.floor((num % 365) / 30.41)
    let day = Math.floor((num % 365) % 30.41)
    let msg = ''
    if (year > 0) {
      msg += year + '年'
    }
    if (month > 0) {
      msg += month + '个月'
    }
    if (day > 0) {
      msg += day + '天'
    }
    return msg
  }
}

function jsonSort(array, field, order) {
    // 数组长度小于2 或 没有指定排序字段 或 不是json格式数据
    if (array.length < 2 || !field || typeof array[0] !== "object") {
        console.log("警告: 当前数组长度小于2 或 没有指定排序字段 或 不是json格式数据。返回原始数据！");
        return array;
    }
    // json中没有field对应的字段
    if (array[0][field] == undefined){
        console.log("错误: 当前Json没有字段: "+ field);
    }else{
        //field的内容是数字
        if (typeof array[0][field] === "number") {
            array.sort(function (y, x) { return x[field] - y[field] });
        }
        //field的内容是字符串
        else if (typeof array[0][field] === "string") {
            //当field的值为null时，按当成大值处理
            array.sort(function (x, y) { 
                if (x[field] == null ) return 1
                else if (y[field] == null) return -1
                else{
                    return x[field].localeCompare(y[field]) 
                }
            });
        } 
        order == false ? order = order : order = true
        if(order) return array
        else return array.reverse()
    }
}