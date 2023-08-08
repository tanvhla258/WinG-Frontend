import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userApi } from "../services/userApi";
import Loader from "../components/Loader";
import { setCredentials } from "../features/auth/authSlice";
import { useAppDispatch } from "../hooks";
const RequireUser = () => {
  const accessToken = localStorage.getItem("refreshToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const dispatch = useAppDispatch();
  // const { isLoading, isFetching } = userApi.endpoints.getUser.useQuery(null, {
  //   skip: false,
  //   refetchOnMountOrArgChange: true,
  // });

  // const loading = isLoading || isFetching;

  // const user = userApi.endpoints.getUser.useQueryState(null, {
  //   selectFromResult: ({ data }) => data!,
  // });

  // if (loading) {
  //   return <Loader />;
  // }
  if (accessToken) {
    dispatch(setCredentials({ accessToken, refreshToken }));
  }
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireUser;
