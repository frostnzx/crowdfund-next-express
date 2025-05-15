import axios from "axios";

interface UserProfile {
    _id: string;
    email: string;
    role: string;
}

interface GetMyProfileResponse {
    user: UserProfile;
}

export default async function getMyProfile(
    token: string | null
): Promise<UserProfile> {
    const response = await axios.get<GetMyProfileResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/profile`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data.user; 
}
