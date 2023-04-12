import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../Index";
import axios from "axios";
import { YOUTUBE_API_URL } from "../../Utils/Constants";
import { parseData } from "../../Utils";
import { HomePageVideos } from "../../Types";

// const API_KEY = process.env.REACT_APP_YOUTUBE_CLONE_API_KEY;

export const getHomePageVideos = createAsyncThunk(
  "youtubeApp/homePageVideos",
  async (isNext: boolean, { getState }) => {
    try {
      const {
        youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
      } = getState() as RootState;
      const {
        data: { items, nextPageToken },
      } = await axios.get(
        `${YOUTUBE_API_URL}/search?maxResults=20&q="react js projects"&key=AIzaSyA45b2FwNsYCfaYbtutqObZA9gi5pRD1OE&part=snippet&type=video&${
          isNext ? `pageToken=${nextPageTokenFromState}` : ""
        }`
      );
      console.log("Itemss", { items });
      const parsedData: HomePageVideos[] = await parseData(items);
      return { parsedData: [...videos, ...parsedData], nextPageToken };
    } catch (error) {
      console.log("getHomePageVideo Error", error);
    }
  }
);
