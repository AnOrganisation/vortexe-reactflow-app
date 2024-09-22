import {
  Button,
  Image,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Divider,
  Avatar,
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import "../../../../style.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileSettings = ({ setUserID }) => {
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isProfileActive, setIsProfileActive] = useState(true);
  const [isSubscriptionsActive, setIsSubscriptionsActive] = useState(false);

  const handleClick = (buttonName) => {
    if (buttonName === "profile") {
      setIsProfileActive(true);
      setIsSubscriptionsActive(false);
    } else {
      setIsSubscriptionsActive(true);
      setIsProfileActive(false);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    //TODO: Update username in database on save
  };

  useEffect(() => {
    // Define an async function inside the useEffect
    const registerUser = async () => {
      if (isAuthenticated) {
        setUserID(user.sub.slice(user.sub.indexOf("|") + 1));
        const user_data = {
          user_id: user.sub.slice(user.sub.indexOf("|") + 1),
          first_name: user.given_name,
          last_name: user.family_name,
          email: user.email,
          phone_number: "none",
          access_type: "user",
          status: "user",
        };
        try {
          const response = await axios.post(
            "http://127.0.0.1:8002/register_user",
            user_data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("User registered successfully: ", response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    registerUser();
  }, [isAuthenticated]);

  return (
    <>
      <Dropdown className="bg-[#1f1f1f]">
        <DropdownTrigger>
          <Button
            //onPress={onOpen}
            isIconOnly
            className="w-[29px] h-[29px] focus:outline-none bg-transparent rounded-full border-0"
          >
            <Image
              src={
                isAuthenticated
                  ? user.picture
                  : "https://i.pravatar.cc/150?u=a04258a2462d826712d"
              }
              className="w-[29px] h-[29px] border-2 rounded-full border-white"
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" className="bg-[#1f1f1f]">
          <DropdownItem key="account">
            <div className="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <div className="ml-3 profile-menu" onClick={onOpen}>
                Account
              </div>
            </div>
          </DropdownItem>
          <DropdownItem key="settings">
            <div className="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <p className="ml-3 profile-menu">Settings</p>
            </div>
          </DropdownItem>
          <DropdownItem
            onClick={() =>
              logout({
                logoutParams: { returnTo: "http://localhost:5173/" },
              })
            }
            key="delete"
            className="text-danger"
            color="danger"
          >
            <div className="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>

              <p className="ml-3 profile-menu">Logout</p>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal
        size="3xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        className="bg-[#1f1f1f] border-0 rounded-lg shadow-lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-light ">
                Account
                <div className="gradient-divider"></div>
              </ModalHeader>
              <div className="flex flex-row ">
                <div className="h-[414px] w-80">
                  <button
                    radius="full"
                    onClick={() => handleClick("profile")}
                    className={`ml-3 font-light relative w-[171px] h-[42px] bg-[#1f1f1f] text-left rounded-full focus:outline-none mb-5 ${
                      isProfileActive ? "bg-[#6366F14D]" : null
                    }`}
                  >
                    Profile
                  </button>
                  <button
                    radius="full"
                    onClick={() => handleClick("subscriptions")}
                    className={`ml-3 font-light w-[171px] h-[42px] bg-[#1f1f1f] text-left rounded-full focus:outline-none mb-5 ${
                      isSubscriptionsActive ? "bg-[#6366F14D]" : null
                    }`}
                  >
                    Subscription
                  </button>
                </div>
                <div className="w-[100%]">
                  <div>
                    <Badge
                      showOutline="false"
                      content="edit"
                      color="danger"
                      size="sm"
                    >
                      <Avatar
                        isBordered
                        src={
                          isAuthenticated
                            ? user.picture
                            : "https://i.pravatar.cc/150?u=a04258114e29026708c"
                        }
                        className="w-20 h-20 ml-52 text-large"
                      />
                    </Badge>
                  </div>
                  <div className="w-[100%]">
                    <ModalBody>
                      <div className="flex flex-row justify-between mt-5 mb-5">
                        <p className="font-light">Username</p>
                        <div className="w-[200px]"></div>
                        <input
                          className="w-40 rounded-md border border-white bg-[#1f1f1f]"
                          type="text"
                          placeholder="Type Here"
                          readOnly
                          value={isAuthenticated ? user.nickname : "noload"}
                        ></input>
                      </div>
                      <Divider className="bg-white" />
                      <div className="flex flex-row justify-between mt-5 mb-5">
                        <p className="font-light">Name</p>
                        <div className="w-[200px]"></div>
                        <input
                          className="w-40 rounded-md border border-white bg-[#1f1f1f]"
                          type="text"
                          placeholder="Type Here"
                          readOnly
                          value={isAuthenticated ? user.name : "noload"}
                        ></input>
                      </div>
                      <Divider className="bg-white" />
                      <div className="flex flex-row justify-between mt-5 mb-5">
                        <p className="font-light">Business Name</p>
                        <div className="w-[200px]"></div>
                        <input
                          className="w-40 rounded-md border border-white bg-[#1f1f1f]"
                          type="text"
                          placeholder="Type Here"
                        ></input>
                      </div>
                      <Divider className="bg-white" />
                      <div className="flex flex-row justify-between mt-5 mb-5">
                        <p className="font-light">Delete Account</p>
                        <div className="w-[200px]"></div>
                        <button className="w-24 rounded-md bg-[#FF0000] text-white text-left">
                          Delete
                        </button>
                      </div>
                    </ModalBody>
                  </div>
                </div>
              </div>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="focus:outline-none"
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  className="focus:outline-none"
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileSettings;
