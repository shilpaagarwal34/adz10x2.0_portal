# Society Portal E2E Automation

This suite uses Playwright for end-to-end testing of Society portal flows.

## What this setup gives you

- Automated Playwright test framework under `tests/e2e`
- Date-wise run folders with reports, traces, screenshots, and videos
- Public/draft and authenticated Society test coverage
- Reusable login helper for authenticated scenarios

## Install once

```bash
npm run test:e2e:install
```

## Run tests

```bash
npm run test:e2e
```

Headed mode:

```bash
npm run test:e2e:headed
```

## Temporary test credentials

Authenticated Society scenarios now use test-only temporary credentials/session seeding
inside Playwright (`tests/e2e/utils/temporarySocietySession.js`).

- No real user account is required.
- No production credentials are stored in test files.
- API responses for authenticated scenarios are mocked at test runtime.

Optional:

- `PORTAL_BASE_URL` (default: `http://127.0.0.1:4000`)

## Artifact location and video storage

Each run creates:

`test-runs/YYYY-MM-DD/run-HH-MM-SS/`

Inside each run folder:

- `artifacts/` (includes Playwright videos for each test)
- `html-report/`
- `results.json`
- `run-metadata.json`

## Test files

- `tests/e2e/society/public-access.spec.js`
- `tests/e2e/society/authenticated-flows.spec.js`
- `tests/e2e/utils/auth.js`

## Scope map

Detailed use-case list: `tests/e2e/SOCIETY_USE_CASES.md`
