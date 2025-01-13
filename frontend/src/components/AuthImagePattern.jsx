const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="items-center justify-center hidden p-12 lg:flex bg-base-200">
      <div className="flex flex-col items-center justify-center">
        <img
          src="/bg.png"
          className="w-2/3 p-8 opacity-90 bg-base-100/80 rounded-xl"
        />
        <h2 className="my-4 text-2xl font-bold">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
