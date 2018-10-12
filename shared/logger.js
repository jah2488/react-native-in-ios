const Logger = props => {
  const name = props.name || props.children.type.name;
  console.debug('Component[' + name + '] rendered');
  return props.children;
};

export default Logger;
