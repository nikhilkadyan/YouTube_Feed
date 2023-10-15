import React, { useEffect, useState } from "react";
import { FilterOptions, Video } from "./constants/interfaces";
import { fetchVideos } from "./api/youtube";

import Card from "./components/card";
import Filters from "./components/filters";
import VideoList from "./components/videoList";

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    sorting: 'relevance',
    videoType: 'standard',
    limit: 6
  });

  useEffect(() => {
    const fetchLiveVideos = async (pageToken?: string) => {
      const response = await fetchVideos(filters, pageToken);
      setVideos(response);
    };

    fetchLiveVideos();
  }, [filters]);

  return (
    <div className="md:px-20 md:py-10">
    <Card>
      Channel info
    </Card>
    <Card>
      <Filters filters={filters} setFilters={setFilters} />
      <hr className="my-4 "/>
      <VideoList videos={videos} />
    </Card>
    </div>
  );
}

export default App;
