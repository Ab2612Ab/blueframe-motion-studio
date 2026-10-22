<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Homepage architecture
- Keep homepage sections in the site modules and draft-building/validation in pure contact helpers, so frontend submission can be tested independently without a service connection.
- Use the shared Button for interactive commands and native dialog/details semantics for accessible modals and FAQ behavior.
- Keep the reference media registry a nonempty typed tuple so indexed homepage assets are safe under strict TypeScript.

- Keep concept styleframes separate from playable stock references and label their provenance, so still-only imagery never gets a false play affordance or commission claim.