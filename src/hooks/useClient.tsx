import { clientState } from '@/atoms/clientAtom';
import { auth } from '@/Firebase/clientApp';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';


const useClient = () => {
    const [user] = useAuthState(auth);
    const [clientStateValue, setClientStateValue] = useRecoilState(clientState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const resetUserInfo = () => {
        if (!clientStateValue.currentClient) {
            if (localStorage.getItem("currentClient") !== "") {
                setClientStateValue({
                    currentClient: JSON.parse(localStorage.getItem("currentClient"))
                })
            }
        }

    }

    useEffect(() => {
        resetUserInfo();
    }, [user])
    return {
        clientStateValue,
        setClientStateValue,
        resetUserInfo
    }
}
export default useClient;