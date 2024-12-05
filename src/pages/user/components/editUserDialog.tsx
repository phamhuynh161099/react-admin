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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import useUploadImage from "@/hooks/use-upload-images";

interface AddUserProps {
  open: boolean;
  selectedUser: any;
  handleClickOpenEditUserDialog: () => void;
  handleEditUserSuccces: () => void;
}

const EditUserDialog = ({
  open,
  selectedUser,
  handleClickOpenEditUserDialog,
  handleEditUserSuccces,
}: AddUserProps) => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState({});
  const { images, handleImageChange, removeAllImage } = useUploadImage();
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!!selectedUser) {
      setUserData(selectedUser);
    }
  }, [selectedUser]);

  const handleSubmitForm = async () => {
    try {
      dispatch(loadingAction.setStartLoading(true));
      const response = await userApi.editUserForm(
        selectedUser['id'],
        userData as CreateUserPayload,
        images
      );
      console.log("response", response);

      alert("Update User Success!");
      handleEditUserSuccces();
    } catch (error) {
      dispatch(loadingAction.setEndLoading(false));
      alert("error");
    } finally {
      dispatch(loadingAction.setEndLoading(false));
    }
  };

  const handleLinkImage = (url: string) => {
    console.log('url',url)
    const _url ='http://127.0.0.1:8000/' + url.replace("public", "storage");
    return _url;
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={() => {
          removeAllImage();
          handleClickOpenEditUserDialog();
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
            <DialogTitle className="text-3xl">Edit User</DialogTitle>
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
                defaultValue={selectedUser && selectedUser["name"]}
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
                defaultValue={selectedUser && selectedUser["email"]}
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

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Avatar
              </Label>

              <input
                type="file"
                accept="image/"
                id="upload-image"
                className="hidden"
                onChange={handleImageChange}
              />
              <div className="text-center">
                <label htmlFor="upload-image">
                  <Avatar className="size-[100px] inline-block cursor-pointer shadow-md border">
                    {/* {(selectedUser && selectedUser['image']) ? (
                      <AvatarImage src="http://127.0.0.1:8000/storage/phamhuynh161099/image/avatar/737e5d98-0710-484e-918e-2fe243258502.png" />
                    ) : (
                      ""
                    )} */}

                    {images.length > 0 ? (
                      <AvatarImage src={images[0].preview} />
                    ) : selectedUser && selectedUser["image"] ? (
                      <AvatarImage src={handleLinkImage(selectedUser["image"])} />
                    ) : (
                      ""
                    )}
                  </Avatar>
                </label>
              </div>
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

export default EditUserDialog;
