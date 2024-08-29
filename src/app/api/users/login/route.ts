import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { lazy } from "react";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email });
        
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        }, { status: 200 });

        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/"
        });

        return response;

    } catch (err: any) {
        return NextResponse.json({ error: err.message },
            { status: 500 });
    }
}