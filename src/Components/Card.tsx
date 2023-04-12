import { HomePageVideos } from "../Types";
import { Link } from "react-router-dom";

const Card = ({ data }: { data: HomePageVideos }) => {
  const {
    videoDuration,
    videoId,
    videoThumbnail,
    channelInfo,
    videoTitle,
    videoViews,
    videoAge,
  } = data;
  return (
    <>
      <div className="w-64 h-60 flex gap-3 flex-col">
        <div className="relative">
          <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
            {videoDuration}
          </span>
          <Link to={`/watch/${videoId}`}>
            <img src={videoThumbnail} className="h-44 w-72" alt="thumbnail" />
          </Link>
        </div>
        <div className="flex gap-2">
          <div className="min-w-fit">
            <a href="#">
              <img
                src={channelInfo?.image}
                alt="channel"
                className="h-9 w-9 rounded-full"
              />
            </a>
          </div>
          <div>
            <h3>
              <a href="#" className="line-clamp-2">
                {videoTitle}
              </a>
            </h3>
            <div className="text-sm text-gray-400">
              <div>
                <a href="#" className="hover:text-white">
                  {channelInfo?.name}
                </a>
              </div>
              <div>
                <span className="after:content-['•'] after:mx-1">
                  {videoViews} views
                </span>
                <span>{videoAge}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
