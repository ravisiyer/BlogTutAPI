const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);

      //fn(req, res, next); // fn() itself has an await. Is an await needed here?
      //Answer seems to be: yes as fn() is an async function and async functions always return a promise.
      //From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function :
      //"Async functions always return a promise. If the return value of an async function is not
      //explicitly a promise, it will be implicitly wrapped in a promise."
      //Strangely when I tested the above now commented code without an await (for getPosts case) it seemed to work!
      //But clearly that is not appropriate coding as fn() returns a promise (implicitly wrapped).
    } catch (error) {
      next(error);
    }
  };
};
module.exports = asyncWrapper;
