const actionCreator = (type: string, ...argNames: any) =>
  function (...args: any) {
    const action: {type: string; [key: string]: any} = {type};
    argNames.forEach((arg: any, i: number) => {
      action[argNames[i]] = args[i];
    });
    return action;
  };
export default actionCreator;
