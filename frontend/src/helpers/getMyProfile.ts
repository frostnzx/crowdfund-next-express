import axios from "@/config/axios";

interface UserProfile {
    email: string;
    username: string;
    role: string;
}

interface GetMyProfileResponse {
    user: UserProfile;
}

export default async function getMyProfile(
    token: string | null
): Promise<UserProfile> {
    const response = await axios.get<GetMyProfileResponse>(
        `/api/v1/auth/profile`,
    );
    return response.data.user; 
}
