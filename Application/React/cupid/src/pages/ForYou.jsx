
function ForYou() {
  const token = localStorage.getItem('jwt');

  return (
    <>
      <h1>For You</h1>
      {token ? (
        <p>Token: {token}</p>
      ) : (
        <p>Token not found</p>
      )}
    </>
  );
}

export default ForYou;