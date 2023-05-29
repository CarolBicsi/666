import fs from 'node:fs'
logger.info(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
logger.info(`call_of_seven_saints加载成功`);
logger.info(` 作 者 - 癫 癫 博 士 `);
logger.info(` 七 圣 召 唤 最 棒 ！`);
logger.info(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
const files = fs.readdirSync('./plugins/call_of_seven_saints/apps').filter(file => file.endsWith('.js'))

let ret = []

files.forEach((file) => {
  ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')

  if (ret[i].status != 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
export { apps }
