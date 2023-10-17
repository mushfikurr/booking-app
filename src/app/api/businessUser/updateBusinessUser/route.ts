import { db } from "@/lib/db";
import { hash } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  if (req.method === "PUT") {
    // Get business user from user id, see if it exists
    const body = await req.json();
    const {
      userId,
      values,
    }: { userId: string; values: { type: string; formValues: any } } = body;

    try {
      const soughtUserWithBusinessUser = await db.user.findFirst({
        where: { id: userId },
        include: { businessUser: true },
      });

      // If individual user does not exist..
      if (!soughtUserWithBusinessUser) {
        return NextResponse.json(
          { error: "This user does not exist" },
          { status: 400 }
        );
      }
      // If individual user does not have a business user attached..
      if (!soughtUserWithBusinessUser.businessUser) {
        return NextResponse.json(
          { error: "This user is not a business user" },
          { status: 400 }
        );
      }

      // If it exists, check if unique fields exist already
      if (values.type === "personal") {
        const isUnique = await db.user.findFirst({
          where: { email: values.formValues.email },
        });
        if (
          isUnique &&
          soughtUserWithBusinessUser.email !== values.formValues.email
        ) {
          return NextResponse.json(
            {
              error: "An account with this email already exists",
              field: "email",
            },
            { status: 400 }
          );
        }
        // Hash password - if an empty string avoid hashing it..
        const hashedPassword = values.formValues.hashedPassword
          ? await hash(values.formValues.hashedPassword, 10)
          : undefined;
        if (!hashedPassword) delete values.formValues["hashedPassword"];
        const data = hashedPassword
          ? { ...values.formValues, hashedPassword }
          : { ...values.formValues };
        console.log(data);
        // Update personal details
        const updatedUser = await db.user.update({
          where: { id: userId },
          data,
        });
        if (updatedUser) {
          return NextResponse.json(updatedUser, { status: 200 });
        } else {
          return NextResponse.json(
            { error: "Error updating user." },
            { status: 400 }
          );
        }
      } else {
        const isUnique = await db.businessUser.findFirst({
          where: { businessEmail: values.formValues.businessEmail },
        });
        if (!isUnique) {
          return NextResponse.json(
            {
              error: "An account with this business email already exists",
              field: "businessEmail",
            },
            { status: 400 }
          );
        }
        // Update business details
        const updatedBusinessUser = await db.businessUser.update({
          where: { id: userId },
          data: { ...values.formValues },
        });
        if (updatedBusinessUser) {
          return NextResponse.json(updatedBusinessUser, { status: 200 });
        } else {
          return NextResponse.json(
            { error: "Error updating business user" },
            { status: 400 }
          );
        }
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: err }, { status: 405 });
    }
  } else {
    return NextResponse.error();
  }
}
