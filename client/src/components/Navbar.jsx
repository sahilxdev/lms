import { LogOutIcon, MenuIcon, School } from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "./DarkMode";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Description } from "@radix-ui/react-dialog";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {user} = useSelector(store=> store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  };


  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <Link to={"/"}>
          <div className="flex items-center gap-2">
            <School size="30" />
            <h1 className="hidden md:block font-extrabold text-2xl">E-Learning</h1>
          </div>
        </Link>
        {/* User icons and dark mode icon */}
        <div className="flex items-center gap-8">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to={"/my-learning"}>
                    <DropdownMenuItem>My learning</DropdownMenuItem>
                  </Link>
                  <Link to={"/profile"}>
                    <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                  </Link>
                  {user?.role !== "instructor" && ( 
                  <DropdownMenuSeparator/>
                  )}
                  <DropdownMenuItem onClick={logoutHandler} >Log out</DropdownMenuItem>
                  {user?.role === "instructor" && ( <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Dashboard</DropdownMenuItem></>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button onClick={()=> navigate("/login")} variant="outline">Login</Button>
              <Button  onClick={()=> navigate("/login")} >Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* Mobile Devices */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-learning</h1>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const {user} = useSelector(store=> store.auth);

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  };


  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess]);



  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>E-learning</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Description className="sr-only">
          Use the navigation below to access different sections of the app.
        </Description>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
        <Link to={"/my-learning"}><span>My Learning</span></Link>
        <Link to={"/profile"}><span>Edit Profile</span></Link>
          <span  onClick={logoutHandler}  className="flex justify-between">
            <p>Log out</p> <LogOutIcon />{" "}
          </span>
        </nav>
        {user?.role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
