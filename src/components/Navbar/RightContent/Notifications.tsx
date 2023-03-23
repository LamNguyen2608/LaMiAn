import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Icon,
  Flex,
  MenuDivider,
  Text,
} from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { ImProfile } from 'react-icons/im';
import { BiUserPlus, BiLogIn, BiLogOut } from 'react-icons/bi';
import { auth } from '@/Firebase/clientApp';
import { authModalState } from '@/atoms/authModalAtom';
import { useSetRecoilState } from 'recoil';
import { IoNotificationsOutline } from 'react-icons/io5';
import axios from 'axios';
import NotificationModal from '@/components/Modal/NotificationModal';

type NotificationsProps = {
  user: User;
};

export type Notification = {
  noti_id: number;
  content: string;
  noti_time: string;
  status: boolean;
  client_noti_title: string;
};

const Notifications: React.FC<NotificationsProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [myNotis, setMyNotis] = useState<Notification[]>([]);
  const [visibleNotis, setVisibleNotis] = useState<Notification[]>([]);
  const [selectedNoti, setSelectedNoti] = useState<Notification>({
    noti_id: -1,
    content: 'No notification selected',
    noti_time: 'null',
    status: false,
    client_noti_title: '',
  });
  const [notiModal, setNotiModal] = useState(false);
  const getUserNotification = async () => {
    console.log(myNotis);
    if (user) {
      if (myNotis.length == 0) {
        try {
          axios
            .get(
              'https://backend-2tza.onrender.com/client/notification/' +
                user.uid
            )
            .then((res) => {
              console.log('My notis ==>', res.data);
              setMyNotis(res.data);
              setVisibleNotis(myNotis.splice(0, 7));
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        setMyNotis(myNotis);
      }
    }
  };
  useEffect(() => {
    getUserNotification();
  });
  return (
    <>
      <Menu>
        <MenuButton onClick={() => getUserNotification()}>
          {user && (
            <Flex display="flex" align="center">
              <Flex align="center">
                <>
                  <Icon
                    as={IoNotificationsOutline}
                    fontSize={25}
                    color="gray.200"
                  />
                </>
                <ChevronDownIcon
                  color="gray.200"
                  _hover={{ color: 'brand.800' }}
                />
              </Flex>
            </Flex>
          )}
        </MenuButton>
        <MenuList width={3} mt="6px">
          {myNotis.length !== 0 ? (
            <>
              {myNotis.slice(0, 7).map((noti) => (
                <li key={noti.noti_id}>
                  <MenuItem
                    fontSize="10pt"
                    fontWeight={700}
                    _hover={{ bg: 'gray.200', color: 'brand.800' }}
                    onClick={() => {
                      setNotiModal(true);
                      setSelectedNoti(noti);
                    }}
                  >
                    <Flex align="center" key={noti.noti_id}>
                      {noti.client_noti_title
                        ? noti.client_noti_title
                        : 'You have a notification!'}
                    </Flex>
                  </MenuItem>
                </li>
              ))}
            </>
          ) : (
            <MenuItem fontSize="10pt" fontWeight={700}>
              <Flex align="center">You have no notifications</Flex>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      <NotificationModal
        noti={selectedNoti}
        showModal={notiModal}
        setShowModal={setNotiModal}
      />
    </>
  );
};
export default Notifications;
