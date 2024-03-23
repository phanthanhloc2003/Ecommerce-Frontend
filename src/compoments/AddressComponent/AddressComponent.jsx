import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, getDetailsUser } from "../../services/UserService";
import { updateUser } from "../../redux/features/user/userSlice";

function Address() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const hanldeDeleteAddress = async (id) => {
         await deleteAddress(id , user.access_Token)
         handleGetDetailsUser(user.id, user.access_Token)
  }

  const handleGetDetailsUser = async (id, token) => {
   
    const res = await getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, token }));
  };

  return (
    <div className="flex-1">
      <div className="">
        <div className="text-[19px] leading-[21px] font-light mt-[20px] mb-[15px] ">
          Sổ địa chỉ
        </div>
        <div className="">
          <div className="">
            <a
              href="/profile/account/edit/address/create"
              className="bg-[#fff] text-[15px] h-[60px] border-[1px] border-dashed border-[#D8D8D8] mb-[10px] flex items-center justify-center no-underline"
            >
              <svg
                className="text-[28px] mx-[20px] text-[#787878]"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
              </svg>
              <span>Thêm địa chỉ mới</span>
            </a>
          </div>
         {user.address.map(item => (
             <div  key={item._id} className="bg-[#fff] p-[17px] rounded-[4px] mb-[10px] flex justify-between text-[13px] leading-[19px]">
             <div className="">
               <div className="uppercase mb-[10px] flex">
               {item.name}
              {item.ischeck &&  <span className="text-[12px] ml-[15px]  text-[rgb(38,188,78)] flex items-center normal-case ">
                   <svg
                     stroke="currentColor"
                     fill="currentColor"
                     strokeWidth="0"
                     viewBox="0 0 512 512"
                     height="1em"
                     width="1em"
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path>
                   </svg>
                  
                   <span className="ml-[5px]">Địa chỉ mặt định</span>
                 </span> }
                
               </div>
               <div className="mb-[5px] text-[rgb(120,120,120)] ">
                 <span className="text-[13px] leading-[19px]">Địa chỉ:{item.street}, {item.selectedWard}, {item.selectedDistrict}, {item.selectedProvince}</span>
                </div>
               <div className="mb-[5px]  text-[rgb(120,120,120)] ">
                 <span className="text-[13px] leading-[19px]">Điện thoại:0{item.telephone}</span>
               </div>
             </div>
             <div className="">
               <a href={`/profile/account/edit/address/update/${item._id}`} className="text-[14px] text-[rgb(27,168,225)] inline-block py-[6px] px-[12px] no-underline ">
                 chỉnh sửa
               </a>
               {!item.ischeck &&  <button onClick={() => hanldeDeleteAddress(item._id)} className="text-[14px] text-[rgb(225,66,78)] border-0 inline-block p-[6px,12px] cursor-pointer ">xoá</button>}  
             </div>
           </div>
          ))}
         
        </div>
      </div>
    </div>
  );
}

export default Address;
