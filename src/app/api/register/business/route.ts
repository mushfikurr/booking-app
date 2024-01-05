import { db } from "@/lib/db";
import {
  BusinessRegistrationContactSchema,
  BusinessRegistrationLocationSchema,
  BusinessRegistrationPersonalSchema,
} from "@/lib/schema/register-form-schema";
import { hash } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

async function validateUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const exist = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (exist) {
      throw new Error("Email address already exists.");
    }

    const hashedPassword = await hash(password, 10);

    return {
      name,
      email,
      hashedPassword,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function validateBusinessUser({
  streetAddress1,
  streetAddress2,
  postcode,
  phoneNumber,
  instagram,
  businessEmail,
  profileId,
}: {
  streetAddress1: string;
  streetAddress2?: string;
  postcode: string;
  phoneNumber: string;
  instagram?: string;
  businessEmail: string;
  profileId: string;
}) {
  try {
    const exist = await db.businessUser.findUnique({
      where: {
        profileId,
      },
    });

    if (exist) {
      throw new Error("Profile ID already exists.");
    }

    return {
      streetAddress1,
      streetAddress2,
      postcode,
      phoneNumber,
      instagram,
      businessEmail,
      profileId,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const combinedSchema = z.object({
    ...BusinessRegistrationContactSchema._def.shape(),
    ...BusinessRegistrationLocationSchema._def.shape(),
    ...BusinessRegistrationPersonalSchema._def.schema.shape,
  });
  const result = combinedSchema.safeParse(body);

  if (!result.success) {
    if (result.error.formErrors.fieldErrors) {
      console.log("ERROR - FieldError\n");
      console.log(result.error.formErrors);
      return NextResponse.json(
        { ...result.error.formErrors.fieldErrors },
        { status: 400 }
      );
    } else {
      console.log("ERROR - FormError\n");
      console.log(result.error.formErrors);

      return NextResponse.json(
        { ...result.error.formErrors.formErrors },
        { status: 500 }
      );
    }
  }

  type ResultType = typeof result.data;
  const resultData: ResultType = result.data;

  try {
    const { name, email, password, ...businessUserData } = resultData;
    const validatedUser = await validateUser({
      name,
      email,
      password,
    });
    const validatedBusinessUser = await validateBusinessUser({
      ...businessUserData,
    });

    return await db.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: validatedUser?.email,
          hashedPassword: validatedUser?.hashedPassword,
          name: validatedUser?.name,
        },
      });

      if (!user) {
        return NextResponse.json(
          { error: "There was an error creating the user." },
          { status: 500 }
        );
      }

      const businessUser = await tx.businessUser.create({
        // @ts-ignore - Ignore mismatching datatypes from schema to prisma
        data: {
          userId: user.id,
          ...validatedBusinessUser,
        },
      });

      if (!businessUser) {
        return NextResponse.json(
          { error: "There was an error creating the business user." },
          { status: 500 }
        );
      }

      return NextResponse.json({ ...user, ...businessUser }, { status: 200 });
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
