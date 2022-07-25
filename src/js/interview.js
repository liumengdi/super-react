const { set } = require("core-js/core/dict")
const { resolve } = require("core-js/fn/promise")
const { arguments } = require("file-loader")

// 判断对象是否有环
const isCyclic = (obj) => {
  // 使用Set数据类型来存储已经检测过的对象
  let stackSet = new Set()
  let detected = false

  const detect = (obj) => {
    // 不是对象类型的话，可以直接跳过
    if (obj && typeof obj != 'object') {
      return
    }
    // 当要检查的对象已经存在于stackSet中时，表示存在循环引用
    if (stackSet.has(obj)) {
      return detected = true
    }
    // 将当前obj存如stackSet
    stackSet.add(obj)

    for (let key in obj) {
      // 对obj下的属性进行挨个检测
      if (obj.hasOwnProperty(key)) {
        detect(obj[key])
      }
    }
    // 平级检测完成之后，将当前对象删除，防止误判
    /*
      例如：对象的属性指向同一引用，如果不删除的话，会被认为是循环引用
      let tempObj = {
        name: '前端胖头鱼'
      }
      let obj4 = {
        obj1: tempObj,
        obj2: tempObj
      }
    */
    stackSet.delete(obj)
  }

  detect(obj)

  return detected
}

// 手写instanceof 去年百度二面
const instanceof1 = (o1, o2) => {
  while (o1) {
    if (Object.getPrototypeOf(o1) === o2.prototype) {
      return true;
    }
    o1 = Object.getPrototypeOf(o1);
  }
  return false;
};

// 是否是纯对象
function isPlainObj(obj) {
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}
// isPlainObj([1,2]); 主要目的过滤这两种
// isPlainObj(Object.create(null)); 

// 深克隆 百度二面
const deepClone = (obj) => {
  let s = new Set();
  const cd = (obj) => {
    if (obj === null) return null;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj === 'symbol') return Object(Symbol.prototype.valueOf.call(obj));
    if (typeof obj !== 'object') return obj;
    let targetObj = new obj.constructor();
    if (s.has(obj)) {
      targetObj = Array.isArray(obj) ? [...obj] : { ...obj };
    } else {
      s.add(obj);
      if (obj instanceof Set) {
        for (let v of obj) {
          targetObj.add(cd(v));
        }
      } else if (obj instanceof Map) {
        for (let [k, v] of obj) {
          targetObj.set(cd(k), cd(v));
        }
      } else {
        for (let k in obj) {
          if (obj.hasOwnProperty(k)) {
            targetObj[k] = cd(obj[k]);
          }
        }
      }
    }
    return targetObj;
  };
  return cd(obj);
};
var to1 = { x: 1 }
var o = { a: 1, b: 2, c: new Map([['k', 1]]), d: new Set([to1, 2]) };
o.e = o;
console.log(cloneDeep(o))

// typeof 基础全都正常除了null，复杂数据类型全都返回object除了function

// console.log(typeof new Date())

// let a = 1,
//   b = 2,
//   head = { next: { next: 1 } };
// [a, b] = [b, a];
// [head.next, head.next.next] = [1, { next: 1 }];
// console.log(a, b, head);

// 字节原题，印象笔记靠我了
// go("l"); //gol
// go()("l"); //gool
// go()()()("l"); //返回gooool
const go = (a, i = 0) => {
  if (a === undefined) {
    return (a) => {
      return go(a, i + 1);
    };
  }
  return `go${('o').repeat(i)}${a}`;
};

// 转换时间 小公司考过 当时没写出来，也就写了一半
const transTime = val => {
  let s = parseInt(val);
  let m = 0;
  let h = 0;
  if (s >= 60) {
    m = parseInt(s / 60);
    s = parseInt(s % 60);
    if (m >= 60) {
      h = parseInt(m / 60);
      m = parseInt(m % 60);
    }
  }
  if (h < 10) {
    h = '0' + h;
  }
  if (m < 10) {
    m = '0' + m;
  }
  if (s < 10) {
    s = '0' + s;
  }
  return `${h}时${m}分${s}秒`;
}

// 2[a]1[b] -> aabb
function generateStr(str) {
  const reg = /(\d+)\[(\w+)\]/g;
  return str.replace(reg, (...params) => {
    console.log(params)
    return params[2].repeat(Number(params[1]));
  })
}

// a_b2_345_c2345 -> aB这种驼峰 
function toHump(name) {
  return name.replace(/\_(\w)/g, function (all, letter) {
    console.log(all, letter)
    return letter.toUpperCase();
  });
}
// let a = 'a_b2_345_c2345';
// console.log(toHump(a));

// aBdaNf -> a_bda_nf变下划线
function toLine(name) {
  return name.replace(/([A-Z])/g, function (all, letter) {
    return '_' + letter.toLowerCase();
  });
}
// let b = 'aBdaNf';
// console.log(toLine(b));

// 扁平变树 字节二面考我了
function toTree(data) {
  // 删除 所有 children,以防止多次调用
  data.forEach(function (item) {
    delete item.children;
  });

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  var map = {};
  data.forEach(function (item) {
    map[item.id] = item;
  });
  // console.log(map, 'map');
  var val = [];
  data.forEach(function (item) {
    // 以当前遍历项的pid,去map对象中找到索引的id
    var parent = map[item.pid];
    // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
      val.push(item);
    }
  });
  return val;
}

// let dataArr =[
//   {id:1, name: 'i1'},
//   {id:2, name:'i2', parentId: 1},
//   {id:4, name:'i4', parentId: 3},
//   {id:3, name:'i3', parentId: 2},
//   {id:8, name:'i8', parentId: 7}
//   ]
//   toTree(dataArr)


// // var arr =[['A','B'],['a','b'],[1,2]]
// // Aa1,Aa2,Ab1,Ab2,Ba1,Ba2,Bb1,Bb2
// const track = (arr) => {
//   return arr.reduce((acc, cur) => {
//     const tmp = [];
//     acc.forEach(p => {
//       cur.forEach(q => {
//         tmp.push(p + q);
//       });
//     });
//     return tmp;
//   });
// }

// 完善下面函数，实现图片的加载 飞书二面 白给的题哈哈哈
// createImg(url).then((value) => {
//   document.body.appendChild(value);
// });
function createImg(url) {
  new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      resolve(image);
      image = null;
    };
    image.onerror = () => {
      reject();
      image = null;
    };
  });
}

// 如果设计稿750px我想写成7.5rem对应一整宽屏，那么设置 docuel.fontSize =  docuel.clientWidth / 我想写的值

// function test() {
//   console.log("out");
// }
// (function () {
//   if (false) {
//     function test() {
//       console.log("in");
//     }
//   }
//   test();
// })();

// 柯理化 飞书二面考的 也是白给
function curry(fn) {
  const args = [].slice.call(arguments, 1);
  return function () {
    const _args = [].slice.call(arguments);
    const finalArgs = args.concat(_args);
    if (finalArgs.length < fn.length) {
      return curry.call(this, fn, ...finalArgs);
    } else {
      return fn.call(this, ...finalArgs);
    }
  }
}
// var fn = curry(function (a, b, c) {
//   console.log([a, b, c]);
// }, 'a');
// fn("b", "c");

// 正常拍平
// const flatten = (arr) => {
//   return arr.reduce((acc, cur) => {
//     return acc.concat(Array.isArray(cur) ? flatten(cur) : cur);
//   }, []);
// };
// flatten([1,2,[3,4,[5,[6]]]]);

// 判断b祖先节点是否有a
// const isContains = (a, b) => {
//   while (a) {
//     if (b === a) {
//       return true;
//     }
//     a = a.parentNode;
//   }
//   return false;
// };


// 版本排序
var versions = ["1.45.0", "1.5", "6", "3.3.3.3.3.3.3"];
// 要求从小到大排序，注意'1.45'比'1.5'大
function sortVersion(versions) {
  // TODO
  versions.sort((a, b) => {
    const tmpA = a.split('.');
    const tmpB = b.split('.');
    const len = Math.max(tmpA.length, tmpB.length);
    let i = 0;
    let diff = 0;
    while (i < len) {
      const v1 = +tmpA[i] || 0;
      const v2 = +tmpB[i] || 0;
      if (v1 < v2) {
        diff = -1;
        break;
      } else if (v1 > v2) {
        diff = 1;
        break;
      } else {
        i++;
      }
    }
    return diff;
  });
  return versions;
}

sortVersion(versions)
// => ['1.5','1.45.0','3.3.3.3.3.3','6']

// 版本比较
function versionCompare(v11, v22) {
  const v1 = v11.split('.');
  const v2 = v22.split('.');
  const len = Math.max(v1.length, v2.length);
  let i = 0;
  let diff = 0;
  while (i < len) {
    const cv1 = +v1[i] || 0;
    const cv2 = +v2[i] || 0;
    if (cv1 > cv2) {
      diff = -1;
      break;
    } else if (cv1 < cv2) {
      diff = 1;
      break;
    } else {
      i++;
    }
  }
  return diff;
}
// versionCompare('1.2.3', '1.2')


/*
  如输入1 返回a
  输入26返回z
  输入27返回aa
  输入28返回ab
  输入53返回aaa
*/
// 网易一面考我的
var titleToNumber = function (num) {
  let res = [];
  while (num) {
    let r = (num) % 26;
    if (r === 0) {
      r = 26;
      num -= 26;
      res.unshift(String.fromCharCode(96 + r));
    } else {
      if (res.length) {
        for (let i = 0; i < num; i++) {
          res.unshift('a');
        }
        num = 0;
      } else {
        res.unshift(String.fromCharCode(96 + r));
      }
      // res.unshift(String.fromCharCode(96 + r)); // 把上面else分支换成注释部分就是正常26进制只不过范围是a-z
    }
    num = parseInt(num / 26);
  }
  return res.join('');
}

// 调用这个 repeatFunc ("hellworld")，会alert4次 helloworld, 每次间隔3秒
const repeat = (func, times, wait) => async (...args) => {
  try {
    let timer;
    for (let i = 0; i < times; i++) {
      await new Promise((resolve) => {
        func(...args);
        timer = setTimeout(() => {
          resolve();
        }, wait);
      });
    }
    clearTimeout(timer);
  } catch (e) {
    console.error(e);
  }
}
const repeatFunc = repeat(alert, 4, 3000);
// repeatFunc('hello world');


// 获取区间段的年月
function getMonths(times) {
  let start = new Date(times[0] + '-1 00:00:00'), end = new Date(times[1] + '-1 00:00:00');
  const months = [];
  while (start < end) {
    if (
      start.getFullYear() === end.getFullYear()
      && end.getMonth() - start.getMonth() === 1
    ) {
      break;
    }
    const month = start.getMonth() + 1;
    start.setMonth(month);
    months.push(start.getFullYear() + '-' + (start.getMonth() + 1));
  }
  return months;
}
getMonths(['2018-9', '2018-11'])

// 爬楼梯动态规划写法
const clambs = (n) => {
  const f = [];
  f[1] = 1;
  f[2] = 2;
  for (let i = 3; i <= n; i++) {
    f[i] = f[i - 1] + f[i - 2];
  }
  return f[n];
};

// 请实现一个 cacheRequest 方法，保证发出多次同一个 ajax 请求时都能拿到数据，
// 而实际上只发出一次请求 下面的是我自己写出来的 可以上网看看网友写法 快手原题
let f = false;
const getData = () => new Promise((resolve, reject) => {
  console.log('excute');
  setTimeout(() => {
    if (!f) {
      reject();
      f = true;
      return;
    }
    resolve({ errno: 0, data: {} });
  }, Math.random() * 500);
});
const arr = [];
// {pending: false, res: Promise}
const dealQueue = async () => {
  const { pending } = arr.find(p => p.pending) || {};
  if (!pending) {
    let i = 0;
    while (i < arr.length) {
      try {
        arr[i].pending = true;
        arr[i].res = getData();
        const res = await arr[i].res;
        return res;
      } catch (e) {
        arr[i].pending = false;
        i++;
      }
    }
  } else {
    while (arr.find(p => p.pending)) {
      let nextRes;
      try {
        nextRes = await (arr.find(p => p.pending) || {}).res;
        return nextRes;
      } catch (e) {
      }
    }
    return null;
  }
};
const cacheRequest = async () => {
  if (cacheRequest.data) return cacheRequest.data;
  arr.push({ pending: false });
  const data = await dealQueue();
  cacheRequest.data = data;
  return data;
};
// for (let i = 0; i < 5; i++) {
//   cacheRequest().then(res => console.log(res, 'res'));
// }
// setTimeout(() => {
//   cacheRequest().then(res => console.log(res, 'res'));
// }, 3000)

// console.log("start");
// setTimeout(() => {
//   console.log("children2");
//   Promise.resolve().then(() => {
//     console.log("children3");
//   });
// }, 0);
// new Promise(function (resolve, reject) {
//   console.log("children4");
//   setTimeout(function () {
//     console.log("children5");
//     resolve("children6");
//   }, 0);
// }).then((res) => {
//   console.log("children7");
//   setTimeout(() => {
//     console.log(res);
//   }, 0);
// });
// start  children4 children2 children3  children5  children7 children6

// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject(uuuu);
//   }, 1000);
// }).then(res => console.log(res, 'res')).catch(err => console.log(err, 'errrr12345ty456'));

// const c = sum(4)(5); // c === 9
// const k = sum(n1)...(nk) // k === n1 + n2 + ... + nk
const sum = (p) => {
  if (!sum.t) {
    sum.t = 0;
  }
  sum.t += p || 0;
  return sum;
}
// console.log(sum(4)(5)()(6).t);

// function yideng(n, o) {
//   console.log(o); // ？
//   return {
//     yideng: function (m) {
//       return yideng(m, n); 1
//     }
//   }
// }
// const a = yideng(0); a.yideng(1); a.yideng(2); a.yideng(3);  // und 0 0 0 
// const b = yideng(0).yideng(1).yideng(2).yideng(3); // und 0 1 2
// const c = yideng(0).yideng(1); c.yideng(2); c.yideng(3); // und 0 1 1

// var arr1 = "ab".split(''); 
// var arr2 = arr1.reverse(); 
// var arr3 = "abc".split(''); 
// arr2.push(arr3); 
// console.log(arr1.length); // 3
// console.log(arr1.slice(-1)); // [a,b,c]
// console.log(arr2.length); // 3
// console.log(arr2.slice(-1)); // [a,b,c]

// const a = [1,2,3],
//     b = [1,2,3],
//     c = [1,2,4],
//         d = "2",
//         e = "11";
// console.log([a == b, a === b, a > c, a < c, d > e]); // f, f, f,t,t

// function formatNumber(str){
//   return Number(str).toLocaleString('en-US');
// }
// console.log(formatNumber("1234567890"));


// 1234 -> 1,234
const str = '1234567890';
function formatNumber(str) {
  const len = str.length;
  let count = len;
  const res = [];
  while (count >= 3) {
    res.unshift(str.slice(count - 3, count));
    count -= 3;
  }
  if (count > 0) {
    res.unshift(str.slice(0, count));
  }
  return res.toString();
}
// console.log(formatNumber(str)); //1,234,567,890

// 普通防抖
// const debounce = (fn, delay) => {
//   let timer;
//   return function () {
//     clearTimeout(timer);
//     setTimeout(() => {
//       fn.apply(this, arguments);
//     }, delay);
//   };
// };

// 防抖是否立即版本
const debounce1 = (fn, wait, imm = false) => {
  let timer = null;
  return function () {
    clearTimeout(timer);
    if (imm) {
      if (!timer) {
        fn.apply(this, arguments);
      }
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, wait);
    }
  }
}

// 防抖是否立即版本
var debounce = function (fn, wait, imm = false) {
  var timer = null;
  return function () {
    clearTimeout(timer);
    var self = this;
    if (imm) {
      if (!timer) {
        fn.apply(self, arguments);
      }
      timer = setTimeout(function () {
        timer = null;
      }, wait);
    } else {
      timer = setTimeout(function () {
        fn.apply(self, arguments);
      }, wait);
    }
  }
}

// 截流1
const throttle = (fn, delay) => {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.aplly(this, arguments);
        timer = null;
      }, delay);
    }
  }
};

// 截流2
const throttle1 = (fn, delay) => {
  let last = 0;
  return function () {
    const now = +new Date();
    if (now - last >= delay) {
      fn.aplly(this, arguments);
      last = now;
    }
  }
};

// var a = 0;
// if (true) {
//   a = 10;
//   console.log(a, window.a); // 10 0
//   function a() { };
//   console.log(a, window.a); // 10 10
//   a = 20;
//   console.log(a, window.a); // 20 10
// }
// console.log(a); // 10


// 二叉树层序遍历求每层和
function everyLevel(root) {
  const queue = [];
  queue.push(root);
  const res = [];
  while (queue.length) {
    const len = queue.length;
    let sum = 0;
    for (let i = 0; i < len; i++) {
      const target = queue.shift();
      sum += target.val;
      if (target.left) {
        queue.push(target.left);
      }
      if (target.right) {
        queue.push(target.right);
      }
    }
    res.push(sum);
  }
  return res;
}

const list1 = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3
    },
    right: {
      val: 4
    }
  },
  right: {
    val: 5,
    left: {
      val: 6
    }
  }
}

// everyLevel(list1)

// 同上求每层最右侧节点值
function rightView(root) {
  const queue = [];
  queue.push(root);
  const res = [];
  while (queue.length) {
    const len = queue.length;
    let lastVal = queue[len - 1].val;
    for (let i = 0; i < len; i++) {
      const target = queue.shift();

      if (target.left) {
        queue.push(target.left);
      }
      if (target.right) {
        queue.push(target.right);
      }
    }
    res.push(lastVal);
  }
  return res;
}
rightView(list1)

// 动态规划打家劫舍
var qjie = function (arr) {
  const f = [];
  f[1] = arr[0];
  f[2] = Math.max(arr[1], arr[0]);
  for (let i = 3; i <= arr.length; i++) {
    f[i] = Math.max(arr[i] + f[i - 2], f[i - 1]);
  }
  return f[i];
}
// 4 1 2 3

// async function async1() {
//   console.log('async1 start'); //2
//   await async2();
//   console.log('async1 end'); // 6
// }
// async function async2() {
//   console.log('async2'); // 3
// }
// console.log('script start'); // 1
// setTimeout(function () {
//   console.log('setTimeout'); // 8
// }, 0)
// async1();
// new Promise(function (resolve) {
//   console.log('promise1'); // 4
//   resolve();
// }).then(function () {
//   console.log('promise2');// 7
// });
// console.log('script end'); //5

// const value  = 'Value is' + !!Number(['0']) ? 'yideng' : 'undefined';
// console.log(value);

// 和上面重复了
function toTree(arr) {
  var idMap = {}
  arr.forEach((n) => {
    idMap[n.id] = n
  })
  var res = [];
  for (let i = 0; i < arr.length; i++) {
    // const node = arr[i]
    const parentNode = idMap[arr[i].parentId]
    if (parentNode) {
      if (Array.isArray(parentNode.children)) {
        parentNode.children.push(arr[i])
      } else {
        parentNode.children = [arr[i]]
      }
    } else {
      res.push(arr[i]);
    }
  }
  console.log(res, 'res')
  return res;
}
var list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
];

// toTree(list);

// 手写all
Promise.all = function (arr) {
  if (!Array.isArray(promises)) {
    throw new TypeError(`argument must be a array`);
  }
  return new Promise((resolve, reject) => {
    let count = 0;
    const len = arr.length;
    const resArr = [];
    arr.forEach((p, idx) => {
      Promise.resolve(p).then(res => {
        resArr[idx] = res;
        count++;
        if (count === len) {
          resolve(resArr);
        }
      }).catch(e => {
        reject(e);
      });
    });
  });
}

// 组合函数
function compose(fns) {
  if (fns.length === 0) return args => args;
  if (fns.length === 1) return fns[0];
  return fns.reduce((a, b) => (...args) => a(b(...args)));
}

// ['fl', 'flq', 'fle'] -> 'fl'
var lengthOfLongestSubstring = function (str) {
  const len = str.length;
  let arr = [];
  let count = 0;
  for (let i = 0; i < len; i++) {
    if (!!~arr.indexOf(str[i])) {
      const idx = arr.indexOf(str[i]);
      arr = arr.slice(idx + 1);
      arr.push(str[i]);
    } else {
      arr.push(str[i]);
      count = Math.max(arr.length, count);
    }
  }
  return count;
}

// console.log(lengthOfLongestSubstring("loddktdji"))
// console.log(lengthOfLongestSubstring("dvdf"))
// console.log(lengthOfLongestSubstring("adfafwefffdasdcx"))

// 最大滑动窗口和 [1,2,3,4,5], 3 -> [3,4,5]最终值为12
var maxSLideSum = function (arr, k) {
  let i = 0;
  let j = i + k - 1;
  const len = arr.length;
  let res = 0;
  while (j < len) {
    let tmp = 0;
    let idx = k;
    while (idx--) {
      tmp += arr[j - idx];
    }
    res = Math.max(tmp, res);
    i++;
    j++;
  }
  return res;
};

// 爬楼梯递归写法 复杂度高
var fib = (n) => {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
};

// 爬楼动态规划写法 复杂度好
var fib = (n) => {
  const f = [];
  f[1] = 1;
  f[2] = 1;
  for (let i = 3; i <= n; i++) {
    f[i] = f[i - 1] + f[i - 2];
  }
  return f[n];
};

const mySetInterval1 = function (fn, time) {
  let timer = null;
  const interval = () => {
    timer = setTimeout(() => {
      fn();  // time 时间之后会执行真正的函数fn
      interval();  // 同时再次调用interval本身
    }, time)
  }
  interval();  // 开始执行
  // 返回用于关闭定时器的函数
  return () => clearTimeout(timer);
}


const mySetInterVal = (fn, a, b) => {
  mySetInterVal.timer = setTimeout(() => {
    fn();
    a += b;
    mySetInterVal(fn, a, b);
  }, a);
  return () => {
    clearTimeout(mySetInterVal.timer);
  };
};

const mySetTimeout = (fn, time) => {
  let timer = null;
  timer = setInterval(() => {
    // 关闭定时器，保证只执行一次fn，也就达到了setTimeout的效果了
    clearInterval(timer);
    fn();
  }, time);
  // 返回用于关闭定时器的方法
  return () => clearInterval(timer);
}

// 测试
const cancel = mySetTimeout(() => {
  console.log(1);
}, 1000);
// 一秒后打印 1


// 最low版本
class Promise1 {
  constructor(construct) {
    this.scb = null;
    this.fcb = null;
    this.status = 'pending';
    this.value = undefined;
    this.reason = null;
    const resolve = (value) => {
      this.value = value;
      this.status = 'resolved';
      this.scb && typeof this.scb === 'function' && this.scb(value);
    };
    const reject = (e) => {
      this.reason = e;
      this.status = 'reject';
      this.fcb && typeof this.fcb === 'function' && this.fcb(e);
    };
    try {
      construct(resolve, reject);
    } catch (e) {
      this.reason = e;
      this.status = 'reject';
    }
  }
  then(onResolve, onReject) {
    let res;
    if (this.status === 'pending') {
      this.scb = onResolve;
      this.fcb = onReject;
    }
    if (this.status === 'resolved') {
      res = onResolve(this.value);
    }
    if (this.status === 'reject') {
      res = onReject(this.reason);
    }
  }
}

// new Promise1((resolve, reject) => {
//   setTimeout(() => {
//     resolve(8);
//   }, 2000)
// }).then((val) => { console.log(val); return 9 });


// 数组全排列
var enumAll = function (arr) {
  const res = [];
  const fn = (path = []) => {
    if (path.length === arr.length) {
      res.push(path);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (path.includes(arr[i])) {
        continue;
      }
      fn(path.concat(arr[i]));
    }
  };
  fn();
  return res;
};

// 数组子排列 [1,2,3] -> [1] [2] [3] [1,2] [1,3] [1,2,3]
var enumSub = function (arr) {
  const res = [];
  const fn = (path, l, start) => {
    if (path.length === l) {
      res.push(path);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      fn(path.concat(arr[i]), l, i + 1);
    }
  };

  for (let i = 0; i <= arr.length; i++) {
    fn([], i, 0);
  }

  return res;
};

// 二叉树先序
function preOrder(root) {
  const res = [];
  const s = [];
  s.push(root);
  while (s.length) {
    const top = s.pop();
    if (top.right) {
      s.push(top.right);
    }
    if (top.left) {
      s.push(top.left);
    }
    res.push(top.val);
  }
  return res;
};

// 中序
function inOrder(root) {
  const res = [];
  const s = [];
  let cur = root;
  while (cur || s.length) {
    while (cur) {
      s.push(cur);
      cur = cur.left;
    }
    cur = s.pop();
    res.push(cur.val);
    cur = cur.right;
  }
  return res;
}

// 后序
function postOrder(root) {
  const res = [];
  const s = [];
  s.push(root);
  while (s.length) {
    const top = s.pop();
    if (top.left) {
      s.push(top.left);
    }
    if (top.right) {
      s.push(top.right);
    }
    res.unshift(top.val);
  }
  return res;
}

// 二叉树层序遍历每一层收集
function scanBinary(root) {
  const q = [];
  q.push(root);
  const res = [];
  while (q.length) {
    const top = q.shift();
    res.push(top.val);
    if (top.left) {
      q.push(top.left);
    }
    if (top.right) {
      q.push(top.right);
    }
  }
  return res;
}

// 二叉树最小深度
function minDeep(root) {
  if (!root) return 0;
  const q = [];
  q.push(root);
  let count = 0;
  while (q.length) {
    const len = q.length;
    count++;
    for (let i = 0; i < len; i++) {
      const top = q.shift();
      if (!top.left && !top.right) {
        return count;
      }
      if (top.left) {
        q.push(top.left);
      }
      if (top.right) {
        q.push(top.right);
      }
    }
  }
  return count;
}

// 反转二叉树
function tranverseTree(root) {
  if (!root) { return }
  return {
    val: root.val,
    left: tranverseTree(root.right),
    right: tranverseTree(root.left)
  }
}

function nodeList(val) {
  return {
    val,
    next: null
  }
}

// 合并两个有序链表
const mergeTwoLists = function (l1, l2) {
  let head = new nodeList();
  let cur = head;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    cur = cur.next;
  }
  cur.next = l1 ? l1 : l2;
  return head.next;
}

// 整体反转链表
function reverseLinkList(head) {
  let pre = null;
  let cur = head;
  while (cur) {
    tmp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = tmp;
  }
  return pre;
}

// 删除链表倒数第n个
function deleteLastN(head, k) {
  let d = new nodeList();
  d.next = head;
  let pre = d;
  let cur = d;
  let n = k;
  while (n) {
    pre = pre.next;
    n--;
  }
  while (pre) {
    if (!pre.next) {
      cur.next = cur.next.next;
      return d.next;
    }
    pre = pre.next;
    cur = cur.next;
  }
}

// 删除链表重复节点// 包括自己的
function deleteRepeat1(head) {
  let d = new nodeList();
  d.next = head;
  let cur = d;
  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      const val = cur.next.val;
      while (val === cur.next.val) {
        cur.next = cur.next.next;
      }
    } else {
      cur = cur.next;
    }
  }
  return d.next;
}


// 删除链表重复节点//  不包括自己的
function deleteRepeat1(head) { // 不包括自己的
  let cur = head;
  while (cur && cur.next) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return head;
}

// 是否环形链表
function isCircleLinkList(head) {
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (fast === slow) {
      return true;
    }
  }
  return false;
}

// 硬币 相交 天气（leetcode上一搜就有）


// 删除字符串中的所有相邻重复项
// 'assayyn' -> n
// function deleteRepeat (str) {
//   let s = [];
//   for (let i = 0; i < str.length; i++) {
//     if (s[s.length - 1] !== str[i]) {
//       s.push(str[i]);
//     } else {
//       s.pop();
//     }
//   }
//   return s.split('');
// }

// {[()]} 有效括号
function jungleStr(str) {
  const map = {
    '{': '}',
    '[': ']',
    '(': ')'
  };
  const s = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '{' || str[i] === '[' || str[i] === '(') {
      s.push(str[i]);
    } else {
      const top = s.pop();
      if (map[top] !== str[i]) {
        return false;
      }
    }
  }
  return s.length === 0;
}

// 手写实现bind
Function.prototype.bind1 = function (context) {
  context = context || window;
  const self = this;
  function fn0() { };
  fn0.prototype = self.prototype;
  function fn() {
    const args = [].slice.call(arguments);
    const res = self.apply(this instanceof fn0 ? this : context, args);
    return res;
  }
  fn.prototype = new f0();
  return fn;
}

Function.prototype.bind1 = function (context) {
  context = context || window;
  const args = [].slice.call(arguments, 1);
  let self = this;
  const fn = function () { };
  fn.prototype = this.prototype;
  const func = function () {
    const _args = [].slice.call(arguments);
    const finalArgs = args.concat(_args);
    return self.apply(this instanceof fn ? this : context, finalArgs);
  };
  func.prototype = new fn();
  return func;
}

// 实现new
function createObj(construct) {
  const args = [].slice.call(arguments, 1);
  let obj = {};
  obj.__proto__ = construct.prototype;
  let ret = construct.call(obj, ...args);
  return typeof ret === 'object' ? ret : obj;
}

// 实现indexof
function indexOf1(str, t) {
  const len = str.length;
  const tLen = t.length;
  if (!t) {
    return 0;
  } if (tLen > len) {
    return -1;
  } else if (tLen === len) {
    return str === t ? 0 : -1;
  } else {
    for (let i = 0; i < len; i++) {
      if (str[i] === t[0]) {
        let flag = true;
        for (let j = 1; j < tLen; j++) {
          if (str[i + j] !== t[j]) {
            flag = false;
          }
        }
        if (flag) {
          return i;
        }
      }
    }
  }
  return -1;
}

// 输入: ["flower","flow","flight"]
// 输出: "fl"
function commonStr(arr) {
  let t = arr[0];
  const tLen = t.length;
  const len = arr.length;
  let k = 0;
  let str = '';
  while (k < tLen) {
    const cur = t[k];
    for (let i = 1; i < len; i++) {
      if (arr[i][k] !== cur) {
        return str;
      }
    }
    str += cur;
    k++;
  }
  return str;
}

// 输入: "abcabcbb"
// 输出: 3
function noRepeatStr(str) {
  const len = str.length;
  const arr = [];
  let res = 0;
  for (let i = 0; i < len; i++) {
    const idx = arr.indexOf(str[i]);
    if (idx !== -1) {
      arr = arr.slice(idx + 1);
      arr.push(str[i]);
    } else {
      arr.push(str[i]);
      res = Math.max(arr.length, res);
    }
  }
  return res;
}

// aybcxxcb
// 输入: [-2,1,-3,4,-1,2,1,-5,4],
// 输出: 6
// 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
function maxNum(arr) {
  let pre = arr[0];
  let sum = arr[0];
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    if (pre > 0) {
      pre += arr[i];
    } else {
      pre = arr[i];
    }
    sum = Math.max(pre, sum);
  }
  return sum;
}
// maxNum([-2,1,-3,4,-1,2,1,-5,4])
// 这两种思想都一样下面的好理解些
function maxSum(arr) {
  const len = arr.length;
  let max = arr[0];
  for (let i = 1; i < len; i++) {
    if (arr[i - 1] > 0) {
      arr[i] += arr[i - 1];
    }
    max = Math.max(max, arr[i]);
  }
  return max;
}

// 转36进制
function getNums36() {
  const arr = [];
  for (let i = 0; i < 36; i++) {
    if (i >= 0 && i <= 9) {
      arr.push(i);
    } else {
      arr.push(String.fromCharCode(i + 87));
    }
  }
  return arr;
}
function toNum36(n) {
  const map = getNums36();
  let res = [];
  while (n) {
    let last = n % 36;
    res.unshift(map[last]);
    n = parseInt(n / 36);
  }
  return +res.join('');
}

// 二分查找
function findEle(arr, t) {
  const len = arr.length;
  let i = 0;
  let j = len;
  while (i < j) {
    const mid = Math.floor((i + j) / 2);
    if (arr[mid] > t) {
      j = arr[mid];
    } else if (arr[mid] < t) {
      i = arr[mid];
    } else {
      return mid;
    }
  }
  return -1;
}
// console.log(findEle([1,2,3,4,5, 6], 3))

// 并发maxNum个请求，就是说只能这几个完事在请求下一组
function fetch(url) {
  return new Promise((resolve) => {
    // let start = new Date()
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 10))
    }, 10000 * Math.random());
  })
}
multiRequest([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)
function multiRequest(urls, maxNum) {
  let i = 0;
  let res = [];
  function addTask(resolve) {
    res[i] = fetch(urls[i]);
    res[i].finally(() => {
      if (i >= urls.length) {
        resolve();
      } else {
        addTask(resolve);
        i++;
      }
    });
  }
  return new Promise((resolve) => {
    for (; i < maxNum; i++) {
      addTask(resolve);
    }
  }).then(() => Promise.all(res))
    .then(result => console.log(result, 'final result'));
}

// 经典组合寄生继承
function Parent(name, age) {
  this.name = name;
  this.age = age;
}
Parent.prototype.say = function () {
  console.log(this.name);
};

function fn() { }
fn.prototype = Parent.prototype;

function Child(name, age) {
  Parent.call(this, name, age);
}
Child.prototype = new fn();
Child.prototype.constructor = Child;

// function extendqq(Parent, Child) {
//   function fn() { }
//   fn.prototype = Parent.prototype;
//   Child.prototype = new fn();
//   Child.prototype.constructor = Child;
// }

// 二叉树路径和
function pathSum(root) {
  const res = [];
  const dfs = (root, sum) => {
    console.log(root.sum);
    if (!root.left && !root.right) {
      res.push(sum);
    }
    if (root.left) {
      dfs(root.left, root.left.val + sum);
    }
    if (root.right) {
      dfs(root.right, root.right.val + sum);
    }
  };
  dfs(root, root.val);
  return res;
}

// pathSum(list1);

// 和上面一样只是判断是否有等于sum的
function pathSumEqual(root, t) {
  let flag = false;
  const dfs = (root, sum) => {
    console.log(root.sum);
    if (!root.left && !root.right && sum === t) {
      flag = true;
    }
    if (root.left) {
      dfs(root.left, root.left.val + sum);
    }
    if (root.right) {
      dfs(root.right, root.right.val + sum);
    }
  };
  dfs(root, root.val);
  return flag;
}

// pathSumEqual(list1, 7);

// 冒泡
function bubble(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// 系统补偿实现校验interval不准问题
const interval = 1000;
// 从服务器和活动开始时间计算出的时间差，这里测试用 50000 ms
let ms = 50000;
let count = 0;
const startTime = new Date().getTime();
let timeCounter;
if (ms >= 0) {
  timerCounter = setTimeout(countDownStart, interval);
}
function countDownStart() {
  count++;
  const offset = new Date().getTime() - (startTime + count * interval);
  let nextTime = interval - offset;
  if (nextTime < 0) {
    nextTime = 0;
  }
  ms -= interval;
  console.log(
    `误差：${offset} ms，下一次执行：${nextTime} ms 后，离活动开始还有：${ms} ms`
  );
  if (ms < 0) {
    clearTimeout(timeCounter);
  } else {
    timeCounter = setTimeout(countDownStart, nextTime);
  }
}

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
// 和上面子排列一样 只不过是筛选出指定长度为k的结果
var combine = function (n, k) {
  if (n < k) return [];
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr[i] = i + 1;
  }
  const res = [];
  const len = arr.length;
  const findPath = (path, l, start) => {
    if (path.length === l) {
      res.push(path);
      return;
    }
    for (let i = start; i < len; i++) {
      findPath(path.concat(arr[i]), l, i + 1);
    }
  };
  findPath([], k, 0);

  return res;
};

// 是否回文串
function isReverse(str) {
  let i = 0;
  let len = str.length;
  let j = len - 1;
  while (i < j) {
    if (str[i] !== str[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
}
isReverse('abcba');


// k为负数时 实现arr[k] = arr[arr.length + k]
let arr = [1, 2, 3, 4, 5];
let proxy = new Proxy(arr, {
  get(target, k) {
    k = +k;
    if (k < 0) {
      return target[arr.length + k];
    }
    return target[k];
  }
});
proxy[-1];

// 数组交集
var a1 = [1, 2, 3, 1]
var a2 = [1, 1]
function intersection(a, b) {
  const aLen = a.length;
  const bLen = b.length;
  const res = [];
  const map = {};
  for (let i = 0; i < aLen; i++) {
    if (!map[a[i]]) {
      map[a[i]] = 1;
    } else {
      map[a[i]] = map[a[i]] + 1;
    }
  }
  for (let i = 0; i < bLen; i++) {
    if (map[b[i]]) {
      map[a[i]] -= 1;
      res.push(b[i]);
    }
  }
  return res;
}
intersection(a1, a2);

// https://juejin.cn/post/7004638318843412493#heading-27 虚拟dom

// 如下
// const obj = {
//   a: {
//     b: 1,
//     c: 2,
//     d: { e: 5 }
//   },
//   b: [1, 3, { a: 2, b: 3 }],
//   c: 3
// }
//  结果返回如下
// {
//  'a.b': 1,
//  'a.c': 2,
//  'a.d.e': 5,
//  'b[0]': 1,
//  'b[1]': 3,
//  'b[2].a': 2,
//  'b[2].b': 3
//   c: 3
// }
function flatten(obj) {
  if (!isObject(obj)) {
    return;
  }
  let res = {};
  const dfs = (cur, prefix) => {
    if (isObject(cur)) {
      if (Array.isArray(cur)) {
        cur.forEach((item, index) => {
          dfs(item, `${prefix}[${index}]`);
        });
      } else {
        for (let k in cur) {
          dfs(cur[k], `${prefix}${prefix ? "." : ""}${k}`);
        }
      }
    } else {
      res[prefix] = cur;
    }
  };
  dfs(obj, "");
  return res;
}
// flatten();

// 实现一个函数a，使其奇数次调用时返回1，偶数次调用时返回2（不能使用全局变量） 
const a = () => {
  a.num = !a.num;
  if (a.num) {
    return 1;
  }
  return 2;
}

// 普通获取路径参数 美团
function getUrlParam(sUrl, sKey) {
  const url = sUrl.split('?')[1];
  const arr = url.split('&');
  const len = arr.length;
  const map = {};
  for (let i = 0; i < len; i++) {
    const k = arr[i].split('=')[0];
    const v = arr[i].split('=')[1];
    if (map[k]) {
      map[k].push(v);
    } else {
      map[k] = [v];
    }
  }
  let res;
  if (sKey === undefined) {
    res = map;
  } else if (map[sKey] === undefined) {
    res = '';
  } else if (map[sKey].length === 1) {
    res = map[sKey][0];
  } else {
    res = map[sKey];
  }
  return res;
}
// getUrlParam('http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe', 'key')

// 123 -> 一百二十三 字节
function numToString(num) {
  if (num > 999999999) throw '超过金额上限，最大单位为亿'
  const unitMap = ['', '十', '百', '千', '万', '十', '百', '千', '亿']
  const stringMap = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const n = num + ''
  const len = n.length
  let lastIndex = len - 1
  let result = ''
  // debugger
  for (let i = 0; i < len; i++) {
    if (i > 0 && n[i] == '0') {
      if (n[i - 1] != '0') result += '零'
    } else {
      result += stringMap[n[i]] + unitMap[lastIndex]
    }

    lastIndex--
  }

  lastIndex = result.length - 1
  if (result[lastIndex] == '零') return result.slice(0, lastIndex)
  return result
}
// console.log(numToString(12345)) // 一万二千三百四十五
// console.log(numToString(10086)) // 一万零八十六
// console.log(numToString(100010001)) // 一亿零一万零一
// console.log(numToString(100000000)) // 一亿

// 劫持console
// _console = {};
// _console.log = console.log;
// console.log = (m) => alert(m);

// 前端系统架构设计


// class u 这个字节飞书三面
// p.console('a').console('b').console('c');
// https://www.nowcoder.com/discuss/702216?page=2
class U {
  constructor() {
    this.promise = Promise.resolve();
  }

  console(val) {
    this.promise = this.promise.then(() => {
      console.log(val);
    });
    return this;
  }

  setTimeout(wait) {
    this.promise = this.promise.then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, wait);
      });
    })
    return this;
  }
}
const u = new U()
//  u.console('breakfast').setTimeout(3000).console('lunch').setTimeout(3000).console('dinner')



// 给数组中的字符串编号，f(['ab', 'c', 'd', 'ab', 'c']) => ['ab1', 'c1', 'd', 'ab2', 'c2']，写完后问了一下时间和空间复杂度。
function f(arr) {
  const map = {};
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    if (map[arr[i]]) {
      map[arr[i]] = {
        size: (map[arr[i]].size || 0) + 1,
        cur: 0
      };
    } else {
      map[arr[i]] = {
        size: 1,
        cur: 0
      };
    }
  }
  for (let i = 0; i < len; i++) {
    if (map[arr[i]].size > 1) {
      map[arr[i]].cur = map[arr[i]].cur + 1;
      arr[i] = arr[i] + map[arr[i]].cur;
    }
  }
  return arr;
}
f(['ab', 'c', 'd', 'ab', 'c'])

// 示例 1:
// 输入: [[1,3],[2,6],[8,10],[15,18]]
// 输出: [[1,6],[8,10],[15,18]]
// 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
// 示例 2:
// 输入: [[1,4],[4,5]]
// 输出: [[1,5]]
// 解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
function mergeRange(arr) {
  const res = [];
  arr.sort((a, b) => {
    return a[0] - b[0];
  });
  res[0] = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][0] > arr[i - 1][1]) {
      res.push(arr[i]);
    } else {
      if (arr[i][1] > arr[i - 1][1]) {
        res[res.length - 1][1] = arr[i][1];
      }
    }
  }
  return res;
}
mergeRange([[15, 18], [1, 3], [2, 6], [8, 10]]);

// var testArray = [0];
// function test(data, key, val) {
//   Object.defineProperty(data, key, {
//     get() {
//       console.log(val);
//     },
//     set(newV) {
//       if (newV !== val) {
//         val = newV;
//         console.log('检测到变更');
//       }
//     },
//   });
// }
// test(testArray, 0, aa[0]);

// testArray[0] = 1

// 发布订阅
class eventEmitter {
  constructor() {
    this.events = {};
  }
  on(type, fn) {
    if (this.events[type]) {
      this.events[type].push(fn);
    } else {
      this.events[type] = [fn];
    }
  }
  emit(type, data) {
    const cbs = this.events[type];
    if (cbs && Array.isArray(cbs) && !!cbs.length) {
      cbs.forEach(cb => {
        cb.call(this, data);
      });
    }
  }
  off(type, fn) {
    if (!this.events[type]) return;
    this.events[type] = this.events[type].filter(p => p !== fn);
  }
  once(type, fn) {
    const cb = (data) => {
      fn.call(this, data);
      this.off(type, cb);
    }
    this.on(type, cb);
  }
}

// var emitter = new eventEmitter();
// var fn = (data) => console.log(data);
// emitter.on('clk', fn);
// emitter.emit('clk', 1) 


// 把.编程一级一级的对象
var data1 = {
  'a.b.c': 1,
  'a.b.d': 2
};
var data2 = {
  'a.b.e': 3,
  'a.b.f': 4
};
var mergeJson = (data1, data2) => {
  const obj = Object.assign({}, data1, data2);
  const res = {};
  Object.keys(obj).forEach(p => {
    const t = p.split('.');
    t.reduce((acc, cur) => {
      if (t.indexOf(cur) === t.length - 1) {
        acc[cur] = obj[p];
      } else if (!acc[cur]) {
        acc[cur] = {};
      }
      return acc[cur];
    }, res);
  });
  return res;
};
mergeJson(data1, data2);

// 网易一面 答案不是最佳 可用二分 但写出来就没在研究了
// 存在一个按升序排列的链表，给你这个链表的头节点 head ，
// 请你删除链表中所有存在数字重复情况的节点，只保留原始链表中 没有重复出现 的数字。
// 返回同样按升序排列的结果链表。 
// 示例 1：
// 输入：head = [1,2,3,3,4,4,5]
// 输出：[1,2,5]
// 示例 2：
// 输入：head = [1,1,1,2,3]
// 输出：[2,3]
var delRepeat = function (head) {
  const len = head.length;
  const res = [];
  let idx = 0;
  for (let i = 0; i < len; i++) {
    if (head[i] !== head[i + 1] && head[i] !== head[i - 1]) {
      res[idx] = head[i];
      idx++;
    }
  }
  return res;
};
const head = [1, 1, 1, 2, 3];
// console.log(delRepeat(head));

// 根号5就返回2 9就返回3 经典二分
var sqrt = function (n) {
  let i = 0;
  let j = n;
  while (i <= j) {
    const mid = Math.floor((i + j) / 2);
    const tmp = mid * mid;
    if (tmp > n) {
      j = mid - 1;
    } else if (tmp < n) {
      i = mid + 1;
    } else {
      return mid;
    }
  }
  return j;
};
// sqrt(10);

// 一到打印题
window.onerror = () => { console.log('win err') }
function test() {
  try {
    return console.log('try')
  } catch {

  } finally {
    throw new Error('err')
  }
}
test();
console.log("-------wf");




// 网易二面让实现redux react-redux功能
// context.js
import { createContext } from 'react';
const Context = createContext();
export default Context;

// reducer.js
const reducer1 = (state, action) => {
  return 'xxxx';
};
const reducer = combineReducer({ reducer1 });
export default reducer;

// app.js
import React, { useReducer } from 'react';
import Child from './child';
import Context from './context';
import reducer from './reducer';
const App = () => {
  const [store, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ store, dispatch }}>
      <div>
        <Child />
      </div>
    </Context.Provider>

  );
};
export default App;

// child.js
import React from 'react';
import ChildChild from './child';

const Child = () => {
  return (
    <div><ChildChild /></div>
  );
};
export default Child;

// childchild.js
import React from 'react';
import { useContext } from 'react';
import Context from './context';
const Childchild = () => {
  const {
    store,
    dispatch
  } = useContext(Context);
  return (
    <div onClick={() => dispatch({ type: 'ACTION', payload: {} })}>{ }</div>
  );
};
export default Childchild;

// 小米还考了红绿灯问题 setstate打印顺序问题


// lru缓存机制 网易二面 我写的很片面 网上一搜就有
class Cache {
  constructor(s) {
    this.maxSize = s;
    this.data = [];
  }
  isOver() {

  }
  put(key, value) {
    const idx = this.data.findIndex(p => p.key === key);
    if (idx > -1) {
      const item = this.data[idx];
      this.data.splice(idx, 1);
      this.data.push({ [key]: value });
    } else {
      this.data.push({ [key]: value });
    }
  }
  get(key) {
    const idx = this.data.findIndex(p => p.key === key);
    if (idx > -1) {
      const item = this.data[idx];
      this.data.splice(idx, 1);
      this.data.push(item);
      return this.data[idx][key];
    }
    return undefined;

  }
};

// 删除某些为空或undefined之类的键值对
// const obj = {
//   a: 1,
//   b: '2',
//   c: [], // x
//   d: {
//       aa: 1,
//       bb: '2',
//       cc: '', // x
//       dd: {}  // x
//   },
//   e: {} // x
// }
function deleteRepeatObj(obj) {
  const dfs = (obj) => {
    if (typeof obj !== 'object') return;
    Object.keys(obj).forEach(p => {
      if (!obj[p] || (Array.isArray(obj[p]) && !obj[p].length) || JSON.stringify(obj[p]) === '{}' || obj[p] === null) {
        delete obj[p];
      } else {
        dfs(obj[p]);
      }
    });
  };
  dfs(obj);
  return obj;
}
// console.log(deleteRepeatObj(obj));