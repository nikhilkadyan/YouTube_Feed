import React, { useEffect, useState } from "react";
import { FilterOptions, Video } from "./constants/interfaces";
import { fetchVideos } from "./api/youtube";

import Card from "./components/card";
import Filters from "./components/filters";
import VideoList from "./components/videoList";
import ChannelDetails from "./components/channelDetails";
import { ToastContainer } from "react-toastify";
import Spinner from "./components/spinner";

const App: React.FC = () => {
  const [isLoading, setLoading] = useState<Boolean>(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    sorting: 'relevance',
    videoType: 'live',
    limit: 6
  });

  useEffect(() => {
    const fetchLiveVideos = async (pageToken?: string) => {
      setLoading(true)
      const response = await fetchVideos(filters, pageToken);
      setVideos(response);
      setLoading(false)
    };

    fetchLiveVideos();
  }, [filters]);

  return (
    <div className="md:px-20 md:py-10">
      <ToastContainer />
    <Card>
      <ChannelDetails />
    </Card>
    <Card>
      <Filters filters={filters} setFilters={setFilters} />
      <hr className="my-4 "/>
      {isLoading ? (
        <Spinner />
      ) : (
        <VideoList videos={videos} />
      )}
    </Card>
    </div>
  );
}

export default App;
