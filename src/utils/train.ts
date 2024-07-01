import {Train} from "@/types";

export function isLoaded(train: Train) {
  return train.trainStops && train.trainStops.length;
}
