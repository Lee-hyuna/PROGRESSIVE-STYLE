function solution(n) {
  var number = n.toString(2)
  var maxCount = 0
  var result = 0

  for(var i = 0, len = number.length; i < len; i++) {
    if(number[i] === '0') {
      maxCount++
      if(number[i+1] === '1') {
        result = result < maxCount ? maxCount : result
        maxCount = 0
      }
    }
  }
}

solution(647)