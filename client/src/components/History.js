function History(props) {
  let histories = [];
  for (let i = 0; i < props.id; i++) {
    histories.push(<li key={`history-${i}`}>{JSON.stringify(props.steps[i]).replaceAll(',', ', ')}</li>);
  }
  return (
    <div>
      <ol>{histories}</ol>
    </div>
  );
}

export default History;
