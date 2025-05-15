"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import getMyProfile from "@/helpers/getMyProfile";
import { useEffect } from "react";

interface ProfileData {
    _id: string;
    email: string;
    role: string;
}
const initialState : ProfileData = {
    _id: "",
    email: "",
    role: "",
}

export default function page() {
    const [profileData, setProfileData] = React.useState<ProfileData>(initialState);

    const token = useSelector((state: RootState) => state.auth.token);
    useEffect(() => {
        const fetchProfileData = async () => {
            const data = (await getMyProfile(token)) as ProfileData;
            console.log('data fetched : ', data);
            setProfileData(data);
        };
        fetchProfileData();
        console.log('profileData : ', profileData);
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Profile</h1>
            <div className="mt-4">
                <p>Email: {profileData?.email}</p>
                <p>Role: {profileData?.role}</p>
                {/* Add more profile fields as needed */}
            </div>
        </div>
    );
}
