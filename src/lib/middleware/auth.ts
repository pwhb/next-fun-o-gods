import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "../helpers/auth";
import Collections, { DB_NAME } from "../consts/db";
import clientPromise from "../mongodb";
import { ObjectId } from "mongodb";

