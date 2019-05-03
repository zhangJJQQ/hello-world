// 随机矩阵
const rand = (x, y, scope) => {
  if (!scope || !scope.length || scope[0] > scope[1]) {
    console.log('Error: 未输入取值范围或取值范围错误');
    return null;
  }
  // 随机数组
  const randArray = (x, scope) => {
    // 随机数
    const randNumber = (scope) => {
      return Math.floor(Math.random() * (scope[1] - scope[0]) + scope[0]);
    }
    // 1 x 1数组
    if (x === 1) {
      return randNumber(scope);
    }
    // 1 x n数组
    let randArray = [];
    for (let i = 0; i < x; i++) {
      randArray.push(randNumber(scope));
    }
    return randArray;
  }
  // 1 x n矩阵
  if (x === 1) {
    return randArray(y, scope);
  }
  if (y === 1) {
    return randArray(x, scope);
  }
  // n x n矩阵
  let randMatrix = [];
  for (let i = 0; i < x; i++) {
    randMatrix.push(randArray(y, scope));
  }
  return randMatrix;
}
// 复制矩阵
const copyMatrix = (x) => {
  const copyArray = (x) => {
    let yArray = [];
    for (let j = 0; j < x.length; j++) {
      yArray.push(x[j]);
    }
    return yArray;
  }
  // 1 x n矩阵
  if (typeof x[0] === 'number') {
    return copyArray(x);
  }
  // n x n矩阵
  let y = [];
  for (let i = 0; i < x.length; i++) {
    y.push(copyArray(x[i]));
  }
  return y;
}
const bigger = (x, y) => {
  if (x.length !== y.length) {
    console.log('Error: 数组长度不相同');
    return null;
  }
  for (let i = 0; i < x.length; i++) {
    if (x[i] < y[i]) {
      return false;
      break;
    }
  }
  return true;
}
const smaller = (x, y) => {
  if (x.length !== y.length) {
    console.log('Error: 数组长度不相同');
    return null;
  }
  for (let i = 0; i < x.length; i++) {
    if (x[i] > y[i]) {
      return false;
      break;
    }
  }
  return true;
}
// 获取矩阵的一列
const column = (matrix, index) => {
  if (matrix.length === 0 || matrix[0].length === 0) {
    console.log('Error: 矩阵长度为0');
    return null;
  }
  if (matrix[0].length < index + 1) {
    console.log('Error: 索引超出矩阵长度');
    return null;
  }
  let column = [];
  for (let i = 0; i < matrix.length; i++) {
    column.push(matrix[i][index]);
  }
  return column;
}
// 数组求和
const sumArr = (arr) => {
  if (!arr || !arr.length) {
    console.log('Error:参数应为数组');
    return null;
  }
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
// 竞争力函数
const compete = (i, j, x, y, H, D) => {
  if (sumArr(x[i]) > 0) {
    return 1 / D[i][j];
  }
  return 1 / (H[i] + D[i][j]);
}
// 目标函数
const costFunction = (x, H, D, U) => {
  let sum, min = 0;
  for (let i = 0; i < x.length; i++) {
    xi = x[i];
    sum = 0;
    for (let j = 0; j < xi.length; j++) {
      sum += xi[j];
      if (xi[j]) {
        min += D[i][j];
      }
    }
    min = min + H[i] * Math.ceil(sum / U);
  }
  return min;
}
/** 参数 
 * F设施数
 * C顾客数
 * U容量限制
 * H建造费用向量
 * D服务费用矩阵
*/

const F = 4;
const C = 5;
const U = 2;
// const H = rand(1, F, [5, 20]);
// const D = rand(F, C, [5, 20]);

const H = [10, 29, 22, 16];
const D = [
  [3, 7, 12, 13, 14],
  [17, 13, 14, 16, 17],
  [14, 9, 9, 10, 6],
  [15, 10, 8, 6, 3]
];
console.log('H, D', H, D)
/**
 * cda算法
*/
// 初始化
let mustX = rand(F, C, [0, 1]);
let mustY = rand(1, F, [0, 1]);
let x = rand(F, C, [0, 1]);
let y = rand(1, F, [0, 1]);
// console.log('x, y', x, y);

/** 
 * 第一步：根据性质降阶
*/
// 性质2
let minIndex = H.indexOf(Math.min(...H));
for (let j = 0; j < C; j++) {
  let isFMustServerC = true;
  for (let i = 0; i < F; i++) {
    if (i !== minIndex && D[i][j] < H[minIndex] + D[minIndex][j]) {
      isFMustServerC = false;
      break;
    }
  }
  if (isFMustServerC) {
    mustX[minIndex][j] = 1;
    mustY[minIndex] = 1;
  }
}
// console.log('mustX, mustY', mustX, mustY);

// 性质3
for (let i = 0; i < F; i++) {
  for (let j = i + 1; j < F; j++) {
    if (H[i] <= H[j] && smaller(D[i], D[j])) {
      mustY[j] = -1;
    } else if (H[i] >= H[j] && bigger(D[i], D[j])) {
      mustY[i] = -1;
    }
  }
}
// console.log('mustX, mustY', mustX, mustY);

/** 
 * 第二步：计算竞争力函数矩阵
*/
x = copyMatrix(mustX);
y = copyMatrix(mustY);
let K = rand(F, C, [0, 1]);
let newCompete = () => {
  for (let i = 0; i < F; i++) {
    for (let j = 0; j < C; j++) {
      K[i][j] = compete(i, j, x, y, H, D);
    }
  }
  for (let i = 0; i < F; i++) {
    for (let j = 0; j < C; j++) {
      if (mustX[i][j]) {
        for (let newI = 0; newI < F; newI++) {
          K[newI][j] = 0;
        }
      }
    }
    if (sumArr(mustX[i]) === U) {
      for (let newJ = 0; newJ < C; newJ++) {
        K[i][newJ] = 0;
      }
    }
  }
}
newCompete();
// console.log('K', K);
/** 
 * 第三步：分配顾客
*/
for (let j = 0; j < C; j++) {
  const ConstKCol = column(K, j);
  let KCol = column(K, j);
  KCol.sort();
  for (let index = 0; index < F; index++) {
    let maxNum = KCol[KCol.length - 1 - index];
    let maxIndex = ConstKCol.indexOf(maxNum);
    if (sumArr(x[maxIndex]) < U) {
      x[maxIndex][j] = 1;
      y[maxIndex] = 1;
      break;
    }
  }
}
console.log('x', x);
/** 
 * 第四步：争夺顾客
*/
const FacilityCompeteCustom = () => {
  const MaxLoopTimes = 1000;
  let loopTimes = 0;

  while (loopTimes <= MaxLoopTimes) {
    let j = 0;
    for (j = 0; j < C; j++) {
      let mustXCol = column(mustX, j);
      if (sumArr(mustXCol) > 0) {
        continue;
      }
      let xCol = column(x, j);
      let serverF = xCol.indexOf(1);
      // 更新竞争力函数
      x[serverF][j] = 0;
      if (sumArr(x[serverF]) === 0) {
        y[serverF] = 0;
      }
      newCompete();
      // 争夺顾客
      // 竞争力最大的设施
      let KCol = column(K, j);
      let maxIndex = KCol.indexOf(Math.max(...KCol));
      // 如果竞争力最大的设施没有服务顾客
      if (serverF !== maxIndex) {
        // 如果竞争力最大的设施容量已满
        if (sumArr(x[maxIndex]) == U) {
          const ConstKRow = copyMatrix(K[maxIndex]);
          let KRow = copyMatrix(K[maxIndex]);
          KRow.sort();
          for (let index = 0; index < C; index++) {
            let KRowMinNum = KRow[index];
            let KRowMinIndex = ConstKRow.indexOf(KRowMinNum);
            if (x[maxIndex][KRowMinIndex] === 1) {
              x[maxIndex][KRowMinIndex] = 0;
              x[serverF][KRowMinIndex] = 1;
              break;
            }
          }
          x[maxIndex][j] = 1;
          y[serverF] = 1;
        } else {
          x[maxIndex][j] = 1;
          y[maxIndex] = 1;
        }
        break;
      } else {
        // 如果竞争力最大的设施已经服务顾客
        x[maxIndex][j] = 1;
        y[maxIndex] = 1;
      }
      // console.log('x', x);
    }
    if (j === C) {
      break;
    }
    loopTimes++;
  }
}
FacilityCompeteCustom();
// console.log('x', x);
/** 
 * 第五步：资源交换
*/
const MaxExchangeTimes = 100;
let exchangeTimes = 0;
while (exchangeTimes < MaxExchangeTimes) {
  let first = rand(1, 1, [0, C]);
  let second = rand(1, 1, [0, C]);
  if (first !== second) {
    let firstCol = column(x, first);
    let secondCol = column(x, first);
    let firstIndex = firstCol.indexOf(1);
    let secondIndex = secondCol.indexOf(1);
    if (firstIndex !== secondIndex) {
      x[firstIndex][second] = 1;
      x[secondIndex][first] = 1;
      x[firstIndex][first] = 0;
      x[secondIndex][second] = 0
    }
    FacilityCompeteCustom();
  }
  exchangeTimes++;
}
/** 
 * 第六步：输出结果
*/
let cost = costFunction(x, H, D, U);
console.log('x', x, 'y', y, 'cost', cost);