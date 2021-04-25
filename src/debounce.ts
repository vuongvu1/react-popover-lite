const debounce = (func: Function, wait: number) => {
  let timeout: number;
  return function (...args: any) {
    //@ts-ignore
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

export default debounce;
