import React, { useEffect } from "react";
import { useAppSelector } from "../../hooks";
import {
  useGetListReceivedMutation,
  useGetListSendMutation,
} from "../../services/relationshipApi";
import Loader from "../../components/Loader";
import { URL } from "../../constant/constant";
import Avatar from "../user/Avatar";
import {
  convertStringTime,
  getTimeDifferenceFromNow,
} from "../../helper/convert";
import AddFriendButton from "../../components/AddFriendButton";
import { useNavigate } from "react-router-dom";

function ListPending() {
  // const user = useAppSelector((state) => state.user.user);
  const [
    getListReceived,
    { data: dataReceived, isLoading: isLoadingReceived },
  ] = useGetListReceivedMutation();
  const [getListSend, { data: dataSend, isLoading: isLoadingSend }] =
    useGetListSendMutation();

  useEffect(function () {
    getListReceived();
    getListSend();
  }, []);
  const navigate = useNavigate();
  const pendingReceived = useAppSelector(
    (state) => state.notification.pendingReceived
  );
  const pendingSend = useAppSelector((state) => state.notification.pendingSend);
  const pendings = [...pendingReceived, ...pendingSend];
  if (isLoadingSend || isLoadingReceived) return <Loader></Loader>;

  console.log(pendings);
  if (!pendings || pendings.length === 0)
    return (
      <>
        <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
          Notifications
        </div>
        <p className="px-4 py-2  text-center">There's nothing to see</p>
      </>
    );
  else
    return (
      <div
        id="dropdownNotification"
        className="z-40  w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
        aria-labelledby="dropdownNotificationButton"
      >
        <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
          Notifications
        </div>
        {pendings?.map((item: any) => {
          return (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="flex-shrink-0">
                  <Avatar src={item.avatar} size={"w-11 h-11"} />
                </div>
                <div className="w-full pl-3">
                  <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                    <span
                      onClick={() => navigate(`./profile?id=${item?.user_id}`)}
                      className="font-semibold cursor-pointer hover:underline text-gray-900 dark:text-white"
                    >
                      {item.user_full_name}
                    </span>
                  </div>
                  <AddFriendButton
                    textSize="text-xs"
                    targetUserId={item.user_id}
                  />
                  <div className="text-xs mt-1 text-blue-600 dark:text-blue-500">
                    {getTimeDifferenceFromNow(item.create_at) + " ago"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* <a
        href="#"
        className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
      >
        <div className="inline-flex items-center ">
          <svg
            className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 14"
          >
            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
          </svg>
          View all
        </div>
      </a> */}
      </div>
    );
}

export default ListPending;
