import { projectSchema } from "./project";
import { researchPostSchema } from "./researchPost";
import { timelineEventSchema } from "./timelineEvent";
import { achievementSchema } from "./achievement";
import { startupSchema } from "./startup";
import { initiativeSchema } from "./initiative";
import { collaborationSchema } from "./collaboration";
import { serviceSchema } from "./service";
import { publicationSchema } from "./publication";
import { siteSettingsSchema } from "./siteSettings";

export const schemaTypes = [
  projectSchema,
  researchPostSchema,
  timelineEventSchema,
  achievementSchema,
  startupSchema,
  initiativeSchema,
  collaborationSchema,
  serviceSchema,
  publicationSchema,
  siteSettingsSchema,
];
