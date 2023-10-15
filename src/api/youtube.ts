import axios from "axios";
import { API_KEY, CHANNEL_ID, YOUTUBE_SEARCH_API } from "../constants/common";
import { FilterOptions, SearchApiParams } from "../constants/interfaces";

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

        const response = await axios.get(YOUTUBE_SEARCH_API, {
            params
        });
        if (response?.data?.items) {
            return response.data.items
        } else {
            throw new Error("Unable to fetch videos")
        }
    } catch (err) {
        console.error(err);
        return []
    }
}