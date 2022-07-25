
export const promiseBasic1 = async () => {
  const promise = new Promise((resolve, reject) => {
    /**
     * promise 状态只会改变一次, 这里reject先执行, resolve就不能执行了
     * promise的三个状态, pendding, fulfilled, rejected
     */
    setTimeout(() => {
      resolve('promiseBasic1');
    }, 1000);

    setTimeout(() => {
      reject(Error('promiseBasic1'));
    }, 500);
  });

  /**
   * 如果promsie被reject, 如果有err1函数就走err1, 如果没有就走err2
   */
  promise.then((val) => {
    console.log('promise1--succcess', val);
  }, (err1) => {
    console.log('promise1--error');
  }).catch((err2) => {
    console.log('catch-err');
  });
};


export const promiseBasic2 = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('promiseBasic2');
    }, 1000);
  });

  promise.then((v1) => {
    console.log('promise1--succcess', v1);
    promise.then((v2) => {
      console.log('promise2--succcess', v2);
    });
  });
};
