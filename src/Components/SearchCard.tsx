import { HomePageVideos } from "../Types";
import { Link } from "react-router-dom";

const SearchCard = ({ data }: { data: HomePageVideos }) => {
  const {
    videoDuration,
    videoId,
    videoThumbnail,
    channelInfo,
    videoTitle,
    videoViews,
    videoAge,
    videoDescription,
  } = data;
  return (
    <>
      <div className="flex gap-3">
        <div className="relative">
          <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
            {videoDuration}
          </span>
          <Link to={`/watch/${videoId}`}>
            <img src={videoThumbnail} className="h-52 w-96" alt="thumbnail" />
          </Link>
        </div>
        <div className="flex gap-1 flex-col">
          <h3 className="max-w-2xl">
            <a href="#" className="line-clamp-2">
              {videoTitle}
            </a>
          </h3>
          <div className="text-xs text-grap-400">
            <div>
              <div>
                <span className="after:content-['•'] after:mx-1">
                  {videoViews} views
                </span>
                <span>{videoAge}</span>
              </div>
            </div>
          </div>
          <div className="min-w-fit my-2">
            <a
              href="#"
              className="flex items-center gap-2 text-xs text-gray-400"
            >
              <img
                src={channelInfo?.image}
                alt="channel"
                className="h-9 w-9 rounded-full"
              />
              <span>{channelInfo?.name}</span>
            </a>
          </div>
          <div className="max-w-2xl line-clamp-2 text-sm text-gray-400">
            <p>{videoDescription}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCard;
