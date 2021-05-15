import { BSPTree } from "../data-structures/BSPTree";
import { Area } from "./Area";
import { Point } from "./Point";
import { RoomDoors } from "./RoomDoors";
import { MapPoint } from "../enums/MapPoint";

export interface Dungeon {
  routes: Point[][];
  doors: RoomDoors[];
  bspTree: BSPTree;
  map: MapPoint[][];
  rooms: Area[];
  pathfindingStart: Point;
}
