import express from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {
  createPlaylist,
  getAllListDetail,
  getPlayListDetails,
  addProblemToPlaylist,
  deletePlaylist,
  removeProblemFromPlaylist,
} from "../controllers/playlist.controller.js";

const playlistRouter = express.Router();

playlistRouter.post("/create-playlist", verifyJwt, createPlaylist);
playlistRouter.get("/", verifyJwt, getAllListDetail);

playlistRouter.get("/:playlistId", verifyJwt, getPlayListDetails);

playlistRouter.post(
  "/:playListId/add-problem",
  verifyJwt,
  addProblemToPlaylist
);

playlistRouter.delete("/:playListId", verifyJwt, deletePlaylist);

playlistRouter.delete(
  "/:playListId/remove-problem",
  verifyJwt,
  removeProblemFromPlaylist
);

export default playlistRouter;
