
import HeaderAccomodation from '../../components/Header.accommodation';
import RoomsComponent from '../../components/RoomsComponent';
import SidebarNew from '../../components/Sidebar/SidebarNew';

function Accommodation() {
 
  return (
    <div className="flex h-screen justify-center">
      <SidebarNew />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAccomodation />
        <div className="flex-1 overflow-y-auto p-4 justify-center items-center ">

       
        {/* <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 ">
          <div className="p-10 bg-blue-600 text-3xl font-bold text-white rounded-xl shadow-2xl flex justify-center  ">
            Total Room : 10
          </div>
          <div className="p-10 bg-blue-600 text-3xl font-bold text-white rounded-xl shadow-2xl flex justify-center ">
            Available Room : 07
          </div>
        </div> */}
        <RoomsComponent />
        
       
       

        </div>
      </div>
    </div>
  );
}

export default Accommodation;
