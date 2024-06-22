export type RequestConfigTrainsToday = {
  url: string,
  headers: {
    AppId: string,
    WorkspaceId: string,
  }
}

export const requestConfigTrainsToday : RequestConfigTrainsToday = {
  headers: {
    AppId: "9101430221728",
    WorkspaceId: "product",
  }
} as RequestConfigTrainsToday;
