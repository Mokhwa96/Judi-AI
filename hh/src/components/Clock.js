const Clock = ({ today }) => {
  const month = today.toLocaleString("en-US", { month: "long" });
  const day = today.getDate();
  return (
    <div>
      <p>
        {month}, {day}
      </p>
    </div>
  );
};

export default Clock;
