export default function Profile() {
  const fakeData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <div className="text-7xl">
      {fakeData.map((num) => (
        <p>{num}</p>
      ))}
    </div>
  );
}
