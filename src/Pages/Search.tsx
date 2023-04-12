import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useAppDispatch, useAppSelector } from "../Store/Hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { ColorRing } from "react-loader-spinner";
import { HomePageVideos } from "../Types";
import { clearVideos } from "../Store/Index";
import { useNavigate } from "react-router-dom";
import { getSearchPageVideos } from "../Store/Reducers/getSearchPageVideos";
import SearchCard from "../Components/SearchCard";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state?.youtubeApp.videos);
  const searchTerm = useAppSelector((state) => state?.youtubeApp.searchTerm);

  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm === "") navigate("/");
    else {
      dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, navigate, searchTerm]);

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos?.length ? (
          <div className="py-8 pl-8 flex flex-col gap-5 w-full">
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getSearchPageVideos(true))}
              hasMore={videos.length < 500}
              loader={
                <ColorRing
                  height="60"
                  width="60"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#e15b64",
                    "#f47e60",
                    "#e15b64",
                  ]}
                />
              }
              height={600}
            >
              {videos?.map((item: HomePageVideos) => {
                return (
                  <div className="my-5">
                    <SearchCard data={item} key={item.videoId} />
                  </div>
                );
              })}
            </InfiniteScroll>
          </div>
        ) : (
          <ColorRing
            height="60"
            width="60"
            colors={["#e15b64", "#f47e60", "#e15b64", "#f47e60", "#e15b64"]}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
