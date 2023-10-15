import React from "react";
import YouTubeEmbed from "./youtubeEmbed";
import { Video } from "../constants/interfaces";

interface VideoListProps {
    videos: Video[]
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {

    const videoList = videos.map((video) => (
        <div key={video.id.videoId} className="aspect-video rounded-xl shadow-md">
            <YouTubeEmbed videoId={video.id.videoId} />
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                className="text-center block p-2"
            >
                Watch on Youtube
            </a>
        </div>
    ));


    return (
        <div>
            {videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {videoList}
                </div>
            ) : (
                <div className="flex justify-center items-center">No videos available.</div>
            )}
        </div>
    );
}

export default VideoList;
