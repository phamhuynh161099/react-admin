import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/redux/hook";
import { loadingAction } from "@/redux/slices/loadingSlice";
import { CreateUserPayload, userApi } from "@/services/UserService";
import { User } from "@/types/User";
import { useEffect, useState } from "react";

interface AddUserProps {
  open: boolean;
  handleClickOpenAddUserDialog: () => void;
  handleAddUserSuccces: () => void;
}

const AddUserDialog = ({
  open,
  handleClickOpenAddUserDialog,
  handleAddUserSuccces
}: AddUserProps) => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("data change", userData);
  }, [userData]);

  const handleSubmitForm = async () => {
    try {
      dispatch(loadingAction.setEndLoading(true));
      const response = await userApi.createUser(userData as CreateUserPayload);
      console.log("response", response);
      
      alert('Add User Success');
      handleAddUserSuccces();
    } catch (error) {
      dispatch(loadingAction.setEndLoading(false));
      alert("error");
    } finally {
      dispatch(loadingAction.setEndLoading(false));
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={() => {
          console.log("run on Open Change");
          handleClickOpenAddUserDialog();
        }}
        modal={true}
      >
        <DialogContent
          className="max-w-[500px] h-fit"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-3xl">Add New User</DialogTitle>
            <DialogDescription>
              Pls Enter Data, if those field has
              <span className="text-red-700 text-xl inline-block">(*)</span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
                <span className="text-red-700 text-xl inline-block">(*)</span>
              </Label>
              <Input
                id="name"
                defaultValue=""
                className="col-span-3"
                onBlur={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
              <Label htmlFor="email" className="text-right">
                Email
                <span className="text-red-700 text-xl inline-block">(*)</span>
              </Label>
              <Input
                id="email"
                defaultValue=""
                className="col-span-3"
                onBlur={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                password
                <span className="text-red-700 text-xl inline-block">(*)</span>
              </Label>
              <Input
                type="password"
                id="password"
                defaultValue=""
                className="col-span-3"
                onBlur={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmitForm}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddUserDialog;
