export const lambdaHandler = async (): Promise<boolean> => {
  try {
    console.log("Hello, World!");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
