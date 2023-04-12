import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../Index";
import axios from "axios";
import { YOUTUBE_API_URL } from "../../Utils/Constants";
import { parseData } from "../../Utils";
import { HomePageVideos } from "../../Types";

// const API_KEY = process.env.REACT_APP_YOUTUBE_CLONE_API_KEY;

export const getSearchPageVideos = createAsyncThunk(
  "youtubeApp/searchPageVideos",
  async (isNext: boolean, { getState }) => {
    try {
      const {
        youtubeApp: {
          nextPageToken: nextPageTokenFromState,
          videos,
          searchTerm,
        },
      } = getState() as RootState;
      const {
        data: { items, nextPageToken },
      } = await axios.get(
        `${YOUTUBE_API_URL}/search?q=${searchTerm}&key=AIzaSyA45b2FwNsYCfaYbtutqObZA9gi5pRD1OE&part=snippet&type=video&${
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
