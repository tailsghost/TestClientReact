const HomePage = () => {
  return (
    <div className='pageTemplate1'>
      <div className='w-full flex justify-center items-center gap-4 bg-purple-600 border-4 border-white rounded-[300px] ring-4 ring-purple-600 p-10'>
        <div className='flex-1 flex flex-col justify-center items-start gap-8 ml-16 -mt-8'>
          <h1 className='text-7xl font-bold text-transparent bg-gradient-to-b from-amber-400 to-amber-600 bg-clip-text'>
            Chiptuning App
          </h1>
          <h1 className='text-[38px] leading-6 font-bold text-white'>Домашняя страница</h1>
          <div className='space-y-1 text-[35px] leading-6 font-bold text-white'>
            <h1>Приложение для работы с</h1>
            <h1 className='text-7xl leading-[78px] font-normal text-transparent bg-gradient-to-tr from-[#DAC6FB] to-[#AAC1F6] bg-clip-text'>
              базой клиентов
            </h1>
            <h4 className='text-2xl font-semibold text-white'>V 1.0.0</h4>
          </div>
        </div>
        <div className='flex-1 flex flex-col justify-center items-end'>
          <img src='images/home.jpg' className='w-[1360px] h-[360px] object-cover rounded-full' />
        </div>
      </div>
    </div>
  );
};

export default HomePage;