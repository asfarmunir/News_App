import { adminAuth, adminDb } from "@/lib/admin/adminConfig";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { userId, requestAccepted } = await req.json();

  if (!userId || typeof requestAccepted !== "boolean") {
      throw new Error("Invalid request body");
  }

  try {
    const userDocRef = adminDb.collection("users").doc(userId);

    if (requestAccepted) {
      // Delete user from Firestore and Firebase Auth
      await userDocRef.delete();
      await adminAuth.deleteUser(userId);
    } else {
      // Update Firestore document
      await userDocRef.update({ deleteRequest: false });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error handling delete request:", error);
    return NextResponse.json({ success: false });
  }
}
