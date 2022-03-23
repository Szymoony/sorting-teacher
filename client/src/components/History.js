function History(props) {
  let histories = [];
  for (let i = 0; i < props.id; i++) {
    histories.push(<li>{JSON.stringify(props.steps[i]).replaceAll(',', ', ')}</li>);
  }
  return (
    <div style={{ overflowY: 'auto' }}>
      <ol>{histories}</ol>
    </div>
  );
}

export default History;
