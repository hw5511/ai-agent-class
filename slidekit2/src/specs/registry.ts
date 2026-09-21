// Part registry — the ONE shared file across every lesson part. Each part owns its own spec file
// (./<partId>.tsx) and this file only imports and lists them, so SlideRoot.tsx and render.mjs can look a
// part up by id. A worker building one part never edits this file: their stub is already listed.
//
// The five step02-* files are the original ax-site decks kept as REFERENCE examples of a finished part.
import type { PartSpec } from "./types";
import { STEP02_REVIEW_PART } from "./step02-review";
import { STEP02_CLAUDEMD_PART } from "./step02-claudemd";
import { STEP02_READ_PART } from "./step02-read";
import { STEP02_WRITE_PART } from "./step02-write";
import { STEP02_BASH_PART } from "./step02-bash";
import { STEP02_SAMPLE_PART } from "./step02-sample";
import { S1_AGENT_PART } from "./s1-agent";
import { S1_ENV_PART } from "./s1-env";
import { S1_AGY_INSTALL_PART } from "./s1-agy-install";
import { S1_AGY_LOGIN_PART } from "./s1-agy-login";
import { S1_AGY_SETUP_PART } from "./s1-agy-setup";
import { S1_AGY_PRACTICE_PART } from "./s1-agy-practice";
import { S1_CLI_INSTALL_PART } from "./s1-cli-install";
import { S1_CODEX_PART } from "./s1-codex";
import { S1_CLAUDE_LOGIN_PART } from "./s1-claude-login";
import { S1_CLAUDE_PRACTICE_PART } from "./s1-claude-practice";
import { S1_WRAP_PART } from "./s1-wrap";
import { S2_REVIEW_PART } from "./s2-review";
import { S2_CLAUDEMD_PART } from "./s2-claudemd";
import { S2_READ_PART } from "./s2-read";
import { S2_WRITE_PART } from "./s2-write";
import { S2_EDIT_PART } from "./s2-edit";
import { S2_BASH_PART } from "./s2-bash";
import { S2_WRAP_PART } from "./s2-wrap";
import { S3_ACCOUNT_PART } from "./s3-account";
import { S3_SETTINGS_PART } from "./s3-settings";
import { S3_PERMISSION_PART } from "./s3-permission";
import { S3_CONFIG_PART } from "./s3-config";
import { S3_MODEL_PART } from "./s3-model";
import { S3_WEBSEARCH_PART } from "./s3-websearch";
import { S3_CHROME_PART } from "./s3-chrome";

export const STEP02_PARTS: PartSpec[] = [
  STEP02_REVIEW_PART, STEP02_CLAUDEMD_PART, STEP02_READ_PART, STEP02_WRITE_PART, STEP02_BASH_PART, STEP02_SAMPLE_PART,
  S1_AGENT_PART, S1_ENV_PART, S1_AGY_INSTALL_PART, S1_AGY_LOGIN_PART, S1_AGY_SETUP_PART, S1_AGY_PRACTICE_PART, S1_CLI_INSTALL_PART, S1_CODEX_PART, S1_CLAUDE_LOGIN_PART, S1_CLAUDE_PRACTICE_PART, S1_WRAP_PART, S2_REVIEW_PART, S2_CLAUDEMD_PART, S2_READ_PART, S2_WRITE_PART, S2_EDIT_PART, S2_BASH_PART, S2_WRAP_PART,
  S3_ACCOUNT_PART, S3_SETTINGS_PART, S3_PERMISSION_PART, S3_CONFIG_PART, S3_MODEL_PART, S3_WEBSEARCH_PART, S3_CHROME_PART,
];

export const getPart = (id: string): PartSpec => {
  const part = STEP02_PARTS.find((p) => p.id === id);
  if (!part) throw new Error(`unknown part "${id}" (known: ${STEP02_PARTS.map((p) => p.id).join(", ")})`);
  return part;
};
