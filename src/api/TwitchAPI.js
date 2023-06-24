import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const clientID = "vb3u74oyy43bu5ef1q8kmqna1n1xxi";
const clientSecrect = "ti98h0bxt0p8c5e1bylzs3n250l7t1";

export const twitchApi = createApi({
  reducerPath: "twitchTokenApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://id.twitch.tv/oauth2/",
  }),
  //取得token
  endpoints: (builder) => ({
    getToken: builder.mutation({
      query: (payload) => ({
        url: `token?client_id=${clientID}&client_secret=${clientSecrect}&grant_type=client_credentials`,
        method: "POST",
        body: payload,
      }),
    }),
    //取得100個正在實況的頻道
    getData: builder.query({
      query: ({ accessToken, lang }) => ({
        url: `https://api.twitch.tv/helix/streams`,
        headers: {
          "Client-ID": "vb3u74oyy43bu5ef1q8kmqna1n1xxi",
          Authorization: `Bearer ${accessToken}`,
        },
        params: { first: 100, sort: "viewers", language: lang },
      }),
    }),
    //取得特定頻道的資訊
    getUser: builder.query({
      query: ({ accessToken, user }) => ({
        url: `https://api.twitch.tv/helix/users?id=${user}`,
        headers: {
          "Client-ID": "vb3u74oyy43bu5ef1q8kmqna1n1xxi",
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const { useGetTokenMutation, useGetDataQuery, useGetUserQuery } =
  twitchApi;
