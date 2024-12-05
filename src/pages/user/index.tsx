import { userApi } from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AddUserDialog from "./components/addUserDialog";
import { Button } from "@/components/ui/button";
import {
  CircleArrowLeft,
  CircleArrowRight,
  UserMinus,
  UserPlus,
  UserRoundPen,
} from "lucide-react";
import { useAppDispatch } from "@/redux/hook";
import { loadingAction } from "@/redux/slices/loadingSlice";
import EditUserDialog from "./components/editUserDialog";

interface FilterPage {
  page: number;
  lastPage?: number;
}

const UserPage = () => {
  const dispatch = useAppDispatch();
  const [filterPage, setFilerPage] = useState<FilterPage>({
    page: 1,
  });
  const [openAddUserDialog, setOpenAddUserDialog] = useState<boolean>(false);
  const [openEditUserDialog, setOpenEditUserDialog] = useState<boolean>(false);
  const [selectedUser,setSelectedUser] = useState<any>();

  // Queries
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user", filterPage.page],
    queryFn: () => userApi.fetchUsers(`page=${filterPage.page}`),
    staleTime: 50000,
  });

  useEffect(() => {
    if (isLoading) {
      dispatch(loadingAction.setStartLoading(true));
    } else {
      dispatch(loadingAction.setEndLoading(false));
    }

    // chỉ xet lần đầu
    if (!isLoading && filterPage.lastPage === undefined) {
      console.log("data", data);
      setFilerPage((prev) => ({ ...prev, lastPage: data?.last_page }));
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      console.log("can keo data");
    }
  }, [filterPage]);

  const handleChangePage = (value: string) => {
    let currentPage = Number(filterPage.page);
    let lastPage = Number(filterPage.lastPage);
    let page = 0;
    if (value === "prev") {
      page = currentPage - 1 <= 0 ? 1 : currentPage - 1;
      setFilerPage((prev) => ({ ...prev, page: page }));
    } else if (value === "next") {
      page = currentPage + 1 > lastPage ? lastPage : currentPage + 1;
      setFilerPage((prev) => ({ ...prev, page: page }));
    }
  };

  //! Add User
  const handleClickOpenAddUserDialog = () => {
    setOpenAddUserDialog((prev) => !prev);
  };

  const handleAddUserSuccces = () => {
    refetch();
    handleClickOpenAddUserDialog();
  };
  //! Add User

  //! Edit User
  const handleClickOpenEditUserDialog = () => {
    setOpenEditUserDialog((prev) => !prev);
  };

  const handleEditUserSuccces = () => {
    refetch();
    handleClickOpenEditUserDialog();
  };
  //! Edit User

  const handleClickEdit = (index: number) => {
    console.log("data", data?.users[index]);
    setSelectedUser(data?.users[index])
    handleClickOpenEditUserDialog();
  };

  return (
    <>
      <div className="min-h-9 rounded-[5px] border-2 border-gray-200 shadow-md m-2 p-2">
        <div className="flex justify-between">
          <div className=""></div>
          <Button
            className="bg-blue-500"
            onClick={handleClickOpenAddUserDialog}
          >
            <UserPlus />
            Add User
          </Button>
        </div>
      </div>

      <div className="rounded-[5px] border-2 border-gray-200 shadow-md m-2 p-2">
        <div className="w-full relative overflow-hidden hover:overflow-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-center w-[200px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                data?.users.map((_data, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={_data["id"]}
                  >
                    <th
                      scope="row"
                      className="p-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {_data["id"]}
                    </th>
                    <td className="p-4">{_data["name"]}</td>
                    <td className="p-4">{_data["email"]}</td>
                    <td className="p-4 flex justify-center gap-1">
                      <Button
                        className="bg-yellow-400 text-black"
                        onClick={() => handleClickEdit(index)}
                      >
                        <UserRoundPen />
                      </Button>
                      <Button className="bg-red-400 text-black">
                        <UserMinus />
                      </Button>
                    </td>
                  </tr>
                ))}

              {data === undefined && (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    colSpan={4}
                    className="p-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    No Data
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="min-h-9 rounded-[5px] border-2 border-gray-200 shadow-md mt-2 p-2">
          <div className="flex">
            <div
              className="cursor-pointer flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => handleChangePage("prev")}
            >
              <CircleArrowLeft className="mr-2" />
              <p className="hidden sm:block">Previous</p>
            </div>

            <div className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              {filterPage.page}/
              <span className="text-red-400">{filterPage?.lastPage}</span>
            </div>

            <div
              className="cursor-pointer flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => handleChangePage("next")}
            >
              <p className="hidden sm:block">Previous</p>
              <CircleArrowRight className="ml-2" />
            </div>
          </div>
        </div>
      </div>

      <AddUserDialog
        open={openAddUserDialog}
        handleClickOpenAddUserDialog={handleClickOpenAddUserDialog}
        handleAddUserSuccces={handleAddUserSuccces}
      />

      <EditUserDialog
        open={openEditUserDialog}
        selectedUser = {selectedUser}
        handleClickOpenEditUserDialog={handleClickOpenEditUserDialog}
        handleEditUserSuccces={handleEditUserSuccces}
      />
    </>
  );
};

export default UserPage;
