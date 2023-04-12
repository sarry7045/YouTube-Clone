import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useAppDispatch, useAppSelector } from "../Store/Hooks";
import { getHomePageVideos } from "../Store/Reducers/getHomePageVideos";
import InfiniteScroll from "react-infinite-scroll-component";
import { ColorRing } from "react-loader-spinner";
import { HomePageVideos } from "../Types";
import Card from "../Components/Card";
import { clearVideos } from "../Store/Index";

const Home = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state?.youtubeApp.videos);

  useEffect(() => {
    return () => {
      dispatch(clearVideos());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
    console.log("Videos", videos);
  }, [dispatch]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (videos?.length === 0) {
  //       alert("API Quota is Exceeded, Please Revisit After Some Time.");
  //     }
  //   }, 3000);
  // }, []);

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos?.length ? (
          <div className="container mx-auto h-screen h-full">
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getHomePageVideos(true))}
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
              height={650}
            >
              <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
                {videos?.map((item: HomePageVideos) => {
                  return <Card data={item} key={item.videoId} />;
                })}
              </div>
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

export default Home;
