# Production baseline signal

The changed-path gate resolves `refs/tags/production` to the last successfully promoted production commit SHA. It deliberately does not use `main~1`, a branch head, a workflow-run number, or an assumed previous commit.

A later production-promotion workflow must move the annotated `production` tag only after it has deployed the selected immutable SHA successfully through the protected `production` environment. The tag update is part of the production-promotion transaction and is the only writer for this reference.

Until that workflow has performed the initial production promotion and created the tag, the changed-path gate fails closed with `PROMOTED_SHA_UNRESOLVED`. That is intentional: there is no truthful "last successfully promoted production SHA" before an initial promotion.

The gate also requires two repository variables to be configured to the actual dedicated GitHub App identity before it can pass on a `main` push:

- `HERMES_GITHUB_LOGIN`: the exact GitHub App bot login.
- `HERMES_GIT_AUTHOR_EMAIL`: the exact verified bot noreply email used in the candidate commit's author and committer fields.

The repository's current fine-grained PAT authenticates as `an-kit`, so it cannot provide an unambiguous dedicated bot actor signal. It must not be configured as the expected Hermes actor. Leaving either variable absent is fail-closed behavior.
