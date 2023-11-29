-- CreateTable
CREATE TABLE "Setting" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "bannerImage" TEXT,
    "backgroundColor" TEXT,
    "autofillFields" JSONB,
    "content" TEXT,
    "createdById" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);
