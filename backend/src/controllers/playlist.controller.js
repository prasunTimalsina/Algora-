import { db } from "../libs/db.js";
import { ApiError } from "../utils/api.error.js";
import { asyncHandler } from "../utils/async.handler.js";
import { ApiResponse } from "../utils/api.response.js";

export const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  //TODO:Add validation for existing name of playlist
  const playlist = await db.playlist.create({
    data: {
      name,
      description,
      userId: req.user.id,
    },
  });

  if (!playlist) {
    throw new ApiError(400, "Playlist not created");
  }

  res
    .status(201)
    .json(new ApiResponse(201, playlist, "Playlist created successfully"));
});

export const getAllListDetail = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const playlists = await db.playlist.findMany({
    where: {
      userId,
    },
    include: {
      problems: {
        include: {
          problem: true,
        },
      },
    },
  });

  if (!playlists) {
    throw new ApiError(404, "Playlists not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, playlists, "Playlists fetched successfully"));
});

export const getPlayListDetails = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const playlist = await db.playlist.findUnique({
    where: {
      id: playlistId,
    },
    include: {
      problems: {
        include: {
          problem: true,
        },
      },
    },
  });

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist fetched successfully"));
});

export const addProblemToPlaylist = asyncHandler(async (req, res) => {
  const { playListId } = req.params;
  const { problemIds } = req.body;

  if (!Array.isArray(problemIds) || problemIds.length === 0) {
    return res.status(400).json({ error: "Invalid or missing problemsId" });
  }

  // Create records fro each problems in the playlist
  const problemsInPlaylist = await db.problemInPlaylist.createMany({
    data: problemIds.map((problemId) => ({
      playListId,
      problemId,
    })),
  });

  if (!problemsInPlaylist) {
    throw new ApiError(400, "Error Adding Problem  to playlist");
  }

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        problemsInPlaylist,
        "Problem added to playlist successfully"
      )
    );
});

export const deletePlaylist = asyncHandler(async (req, res) => {
  const { playListId } = req.params;
  console.log(playListId);
  const playlist = await db.playlist.delete({
    where: {
      id: playListId,
    },
  });

  if (!playlist) {
    throw new ApiError(400, "Error deleting playlist");
  }

  res
    .status(204)
    .json(new ApiResponse(204, null, "Playlist deleted successfully"));
});

export const removeProblemFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  if (!Array.isArray(problemIds) || problemIds.length === 0) {
    return res.status(400).json({ error: "Invalid or missing problemsId" });
  }

  const deletedProblem = await db.problemInPlaylist.deleteMany({
    where: {
      playlistId,
      problemId: {
        in: problemIds,
      },
    },
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        deletedProblem,
        "Problem removed from playlist successfully"
      )
    );
});
