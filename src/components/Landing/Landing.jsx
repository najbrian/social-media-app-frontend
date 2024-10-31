import SigninForm from "../SigninForm/SigninForm";

const Landing = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
  };
  return (
    <main>
      <div className="logo">

      </div>
      <div className=''>
        <SigninForm />
      </div>
    </main>
  );
};

export default Landing;
