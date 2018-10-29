export default function timeago (time) {
  const createdTime = Date.parse(time)
  const now = Date.now()
  const past = now - createdTime

  const sec = 1000
  const min = sec * 60
  const hour = min * 60
  const day = hour * 24
  const week = day * 30
  const month = week * 4
  // const year = month * 12

  let result

  if (past < 0) {
    return
  }

  let minC = past / min
  let hourC = past / hour
  let dayC = past / day
  let weekC = past / week
  let monthC = past / month

  if (monthC >= 1 && monthC <= 3) {
    result = '' + parseInt(monthC) + '月前'
  } else if (weekC >= 1 && weekC <= 3) {
    result = '' + parseInt(weekC) + '周前'
  } else if (dayC >= 1 && dayC <= 6) {
    result = '' + parseInt(dayC) + '天前'
  } else if (hourC >= 1 && hourC <= 23) {
    result = '' + parseInt(hourC) + '小时前'
  } else if (minC >= 1 && minC <= 59) {
    result = '' + parseInt(minC) + '分钟前'
  } else if (past >= 0 && past <= min) {
    result = '刚刚'
  } else {
    let datetime = new Date()
    datetime.setTime(createdTime)
    let Nyear = datetime.getFullYear()
    let Nmonth = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
    let Ndate = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
    result = Nyear + '-' + Nmonth + '-' + Ndate
  }

  return result
}
