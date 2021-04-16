import { Direction } from "../enums/Direction";
import { Point } from "./Point";

export interface Door extends Point {
  direction?: Direction;
}
