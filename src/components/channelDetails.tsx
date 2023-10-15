import React, { useState, useEffect } from "react";
import fetchChannelDetails from "../api/youtube";
import { Channel } from "../constants/interfaces";
import Spinner from "./spinner";

const ChannelDetails = () => {
    const [isLoading, setLoading] = useState<Boolean>(true);
    const [channel, setChannel] = useState<Channel | null>(null);

    useEffect(() => {
        const getChannelDetails = async () => {
            setLoading(true);
            const channelDetails = await fetchChannelDetails();
            setChannel(channelDetails);
            setLoading(false);
        };

        getChannelDetails();
    }, []);

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="py-4">
                    {channel ? (
                        <div className="">
                            <div className="flex gap-x-6">
                                <div>
                                    <img
                                        src={channel.snippet.thumbnails.default.url}
                                        alt="Channel Thumbnail"
                                        className="rounded-lg h-auto w-40"
                                    />
                                </div>
                                <p className="flex flex-col gap-1">
                                    <h2 className="text-2xl font-semibold mb-3">{channel.snippet.title}</h2>
                                    <p>
                                        Subscribers: {!channel.statistics.hiddenSubscriberCount ? channel.statistics.subscriberCount : 'Hidden'}
                                    </p>
                                    <p>
                                        Views: {channel.statistics.viewCount}
                                    </p>
                                    <p>
                                        Videos: {channel.statistics.videoCount}
                                    </p>
                                </p>
                            </div>


                            <hr className="my-4" />

                            <p className="text-gray-700">{channel.snippet.description}</p>


                            {channel.snippet.socialLinks && (
                                <div className="my-4">
                                    <h3 className="text-xl font-semibold mb-2">Social Media Links:</h3>
                                    <ul>
                                        {channel.snippet.socialLinks.map((link, index) => (
                                            <li key={index}>
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    {link.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-600">Unable to fetch channel details.</p>
                    )}
                </div>
            )}
        </>
    );
};

export default ChannelDetails;
