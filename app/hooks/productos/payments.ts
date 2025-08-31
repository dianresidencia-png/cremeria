import axios from "axios";
import { headers } from "next/headers";

export const makePaymentRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337",
});