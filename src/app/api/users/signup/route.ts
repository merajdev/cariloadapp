import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { firstname, lastname, email, password } = reqBody;

        console.log(reqBody);

        // Check if the user already exists
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();

        console.log(savedUser);

        return NextResponse.json({
            message: "User created successfully",
            status: true,
            savedUser
        });

        

    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ error: err.message },
            { status: 500 });
    }
}