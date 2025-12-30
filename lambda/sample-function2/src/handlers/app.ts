import { getNow } from 'shared-libs/date-utils';

export const lambdaHandler = async (): Promise<boolean> => {
  try {
    console.log('Hello, World! from sample-function2');
    console.log(`Current date and time in Asia/Tokyo: ${getNow()}`);

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
