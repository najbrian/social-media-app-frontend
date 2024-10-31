

const Landing = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
  };
  return (
    <main>
      <div className=''>
        This is the landing page
      </div>
    </main>
  );
};

export default Landing;
