const ViewStats = ({ onClick }) => {
    
  return (
    <>
      <button onClick={onClick}className='inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-gradient-to-t from-[#35495e] from-0% to-[#2c3e50] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 '>
        View Stats
      </button>
    </>
  );
};

  export default ViewStats;
  