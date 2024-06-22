import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
  return Response.json(await (await fetch(`https://mobile.12306.cn/otsmobile/app/mgs/mgw.htm?${request.nextUrl.searchParams}&ts=&sign=`, {headers: request.headers})).json());
}
