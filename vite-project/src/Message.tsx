function Message() {
  const name = "";
  if (name) {
    return <div>Hello, {name}!</div>;
  }

  return <div>Hello, Wrold!</div>;
}

export default Message;
