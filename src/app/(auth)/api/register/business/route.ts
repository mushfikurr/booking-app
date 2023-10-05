import { hash } from "bcrypt-ts";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  BusinessRegistrationContactSchema,
  BusinessRegistrationLocationSchema,
  BusinessRegistrationPersonalSchema,
} from "@/lib/form/register-form-schema";
import { BusinessUser, User } from "@prisma/client";
import { z } from "zod";

async function createUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<User | null> {
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

    const user = await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function createBusinessUserData({
  userId,
  streetAddress1,
  streetAddress2,
  postcode,
  phoneNumber,
  instagram,
  businessEmail,
}: {
  userId: string;
  streetAddress1: string;
  streetAddress2?: string | undefined;
  postcode: string;
  phoneNumber: string;
  instagram?: string | undefined;
  businessEmail: string;
}): Promise<BusinessUser | null> {
  try {
    const exist = await db.businessUser.findUnique({
      where: {
        userId,
      },
    });

    if (exist) {
      throw new Error("Email address already exists for business user");
    }

    const businessUser = await db.businessUser.create({
      data: {
        userId,
        streetAddress1,
        streetAddress2,
        postcode,
        phoneNumber,
        instagram,
        businessEmail,
      },
    });

    return businessUser;
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
  console.log("VALIDATION SUCCESS\n");
  console.log(result.data);

  try {
    const userData = {
      name: result.data.name,
      email: result.data.email,
      password: result.data.password,
    };
    const user = await createUser(userData);
    if (!user) {
      return NextResponse.json(
        { error: "The personal email address used already exists." },
        { status: 500 }
      );
    }

    const userId = user.id;
    const { name, email, password, confirmPassword, ...businessUserData } =
      result.data;
    console.log("businessUserData", businessUserData);
    const businessUser = await createBusinessUserData({
      userId,
      ...businessUserData,
    });
    if (!businessUser) {
      return NextResponse.json(
        { error: "Error creating businessUser." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ...user, ...businessUser }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
