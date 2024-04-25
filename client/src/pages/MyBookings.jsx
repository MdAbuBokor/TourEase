
import Header from '../components/Header';
import MyBookingsTab from '../components/MyBookingsTab';
function MyBookings() {
  return (
    
    <div className="mx-auto">
        
       <Header />
       {/* <div className="">
       <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        <Tab  className={({ selected }) =>
                (
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )}>Tab 1</Tab>
        <Tab className={({ selected }) =>
                (
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )}>Tab 2</Tab>
        <Tab className={({ selected }) =>
                (
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )}>Tab 3</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel className={(
                'rounded-xl bg-white p-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}>Content 1</Tab.Panel>
        <Tab.Panel  className={(
                'rounded-xl bg-white p-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}>Content 2</Tab.Panel>
        <Tab.Panel  className={(
                'rounded-xl bg-white p-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}>Content 3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
       </div>
       */}
      <MyBookingsTab />
    </div>
  );
}

export default MyBookings