/*
  Since all react components are functions in the end,
  \ we can take advantage of this fact by creating functions
  \ to be used as components or extend existing components.

  Usage:
    <div>
      {userLoggedIn && <Logger><UserDashboard user={currentUser}/></Logger>}
    </div>
    //or
    <View>
      <Logger name="Help Button">
        <HelpButton/>
      </Logger>
    </View>
*/
const Logger = props => {
  const name = props.name || props.children.type.name;
  console.debug('Component[' + name + '] rendered');
  return props.children;
};

export default Logger;
