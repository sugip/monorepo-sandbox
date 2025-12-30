export const lambdaHandler = async (): Promise<boolean> => {
  try {
    console.log('Hello, World! from sample-function1');
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
