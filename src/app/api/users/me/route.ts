import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();


export async function GET(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        const user = await User.findById(userID).select("-password");

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(
            {
                message: "User found",
                data: user
            },
            {
                status: 200
            }
        );

    } catch (err: any) {
        return NextResponse.json({ error: err.message },
            { status: 500 });
    }
}