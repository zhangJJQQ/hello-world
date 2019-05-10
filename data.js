const { rand } = require('./function');
/**
 * Mode: true--强容量限制， false--软容量限制
 */
const Mode = false;
const F = 4;
const C = 5;
const U = 2;
const MaxLoopTimes = 3;
const MaxExchangeTimes = 0;
let H = rand(1, F, [5, 15]);
let D = rand(F, C, [5, 10]);
const dataFunction = () => {
  let H = rand(1, F, [10, 20]);
  let D = rand(F, C, [5, 20]);
  return {
    Mode,
    F,
    C,
    U,
    H,
    D,
    MaxLoopTimes,
    MaxExchangeTimes,
  };
}
// 最初的算例
// H = [10, 29, 22, 16];
// D = [
//   [3, 7, 12, 13, 14],
//   [17, 13, 14, 16, 17],
//   [14, 9, 9, 10, 6],
//   [15, 10, 8, 6, 3]
// ];
// HCFLP 迭代3次达到均衡
// H = [ 18, 11, 11, 12, 14 ];
// D = [ [ 13, 7, 15, 16, 17 ],
//   [ 16, 6, 17, 5, 7 ],
//   [ 6, 6, 9, 17, 18 ],
//   [ 11, 15, 12, 5, 17 ],
//   [ 5, 5, 6, 18, 7 ] ];
// HCFLP 迭代2次达到均衡
// H = [ 19, 18, 13, 19, 13 ];
// D = [ [ 15, 19, 13, 14, 6 ],
//   [ 16, 14, 19, 9, 9 ],
//   [ 19, 14, 14, 19, 8 ],
//   [ 5, 8, 6, 6, 12 ],
//   [ 17, 15, 14, 18, 12 ] ];
// HCFLP 迭代2次达到均衡
// H = [ 14, 13, 12, 10, 12 ] 
// D = [ [ 8, 7, 16, 17, 9 ],
//   [ 18, 7, 9, 14, 17 ],
//   [ 7, 16, 5, 6, 5 ],
//   [ 12, 17, 15, 14, 19 ],
//   [ 19, 15, 17, 18, 14 ] ];
// SCFLP 迭代2次达到均衡
// H = [ 18, 11, 13, 12, 16 ];
// D = [ [ 14, 17, 13, 18, 19 ],
//   [ 13, 8, 7, 9, 8 ],
//   [ 11, 7, 10, 7, 8 ],
//   [ 6, 11, 17, 18, 14 ],
//   [ 9, 6, 7, 15, 15 ] ];
// SCFLP 迭代2次达到均衡
// H = [ 13, 17, 10, 18, 10 ];
// D = [ [ 13, 19, 15, 19, 14 ],
//   [ 8, 5, 6, 8, 14 ],
//   [ 11, 7, 16, 5, 17 ],
//   [ 15, 7, 5, 12, 13 ],
//   [ 12, 7, 8, 13, 15 ] ];
// SCFLP 迭代4次达到均衡
// H = [ 19, 18, 10, 13, 16 ];
// D = [ [ 10, 17, 12, 19, 10 ],
//   [ 9, 11, 17, 5, 17 ],
//   [ 6, 5, 16, 9, 5 ],
//   [ 5, 16, 16, 13, 15 ],
//   [ 18, 8, 9, 18, 19 ] ];
// SCFLP 迭代2次达到均衡
H = [ 8, 9, 9, 11 ];
D = [ [ 8, 7, 9, 9, 8 ],
  [ 9, 7, 9, 9, 6 ],
  [ 7, 8, 7, 9, 8 ],
  [ 6, 8, 9, 5, 8 ] ]
module.exports = {
  Mode, 
  F,
  C,
  U,
  H,
  D,
  MaxLoopTimes,
  MaxExchangeTimes,
  dataFunction,
}