export interface SearchApiParams {
    key: string;
    forUsername?: string;
    channelId?: string;
    part: string;
    maxResults: number;
    order: string;
    type: string;
    eventType?: 'completed' | 'live' | 'upcoming';
    pageToken?: string;
}

export interface FilterOptions {
    sorting: string;
    videoType: 'live' | 'standard';
    limit: number;
}

export interface Video {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            default: {
                url: string;
                width: number;
                height: number;
            };
            medium: {
                url: string;
                width: number;
                height: number;
            };
            high: {
                url: string;
                width: number;
                height: number;
            };
        };
        channelTitle: string;
        publishedAt: string;
    };
}
