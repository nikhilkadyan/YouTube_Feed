import axios from "axios";
import { API_KEY, CHANNEL_ID, YOUTUBE_API } from "../constants/common";
import { FilterOptions, SearchApiParams } from "../constants/interfaces";
import { toast } from 'react-toastify';

export const fetchVideos = async (filters: FilterOptions, pageToken?: string) => {
    try {
        if (!API_KEY || !CHANNEL_ID) {
            throw new Error("API creds not configured")
        }

        const params: SearchApiParams = {
            key: API_KEY,
            channelId: CHANNEL_ID,
            part: "id",
            maxResults: filters.limit,
            order: filters.sorting,
            type: 'video',
            eventType: 'live',
            pageToken
        }

        if (filters.videoType === 'standard') {
            delete params.eventType
        }

        const response = await axios.get(`${YOUTUBE_API}/search`, {
            params
        });
        if (response?.data?.items) {
            return response.data.items
        } else {
            throw new Error("Unable to fetch videos")
        }
    } catch (error: any) {
        toast.error(error?.response?.data?.error?.message || "Error fetching videos")
        console.error(error);
        return []
    }
}

const fetchChannelDetails = async () => {
    try {
        if (!API_KEY || !CHANNEL_ID) {
            throw new Error("API creds not configured")
        }

        const response = await axios.get(`${YOUTUBE_API}/channels`, {
            params: {
                key: API_KEY,
                part: "snippet, statistics",
                id: CHANNEL_ID,
            },
        });

        if (response.data.items.length > 0) {
            const channel = response.data.items[0];
            return channel;
        } else {
            return null;
        }
    } catch (error: any) {
        toast.error(error?.response?.data?.error?.message || "Error fetching channel details")
        console.error("Error fetching channel details:", error);
        return null;
    }
};

export default fetchChannelDetails;
