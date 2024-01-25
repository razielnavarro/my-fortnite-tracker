const InputText = ({ placeholder, value, onChange }) => {
    return (
      <div className='relative'>
        <div className='absolute top-0 flex w-full justify-center'>
          <div className='h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000' />
        </div>
        <input
          className='block h-12 w-full rounded-md border border-slate-800 bg-black px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50'
          placeholder='Enter your EPIC name'
          value={value}
          onChange={onChange}
        />
      </div>
    );
  };
  
  export default InputText;
  