import { BSPTree } from "../data-structures/BSPTree";
import { Area } from "../interfaces/Area";
import { Point } from "../interfaces/Point";
import { RoomDoors } from "../interfaces/RoomDoors";
import { MapPoint } from "./MapPoint";

export interface Dungeon {
  routes: Point[][];
  doors: RoomDoors[];
  bspTree: BSPTree;
  map: MapPoint[][];
  rooms: Area[];
  pathfindingStart: Point;
}
