import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
  return Response.json(await (await fetch(`https://kyfw.12306.cn/otn/czxx/queryByTrainNo?${request.nextUrl.searchParams}`)).json());
}
