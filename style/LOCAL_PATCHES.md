# Local patches to HomenS.AI Style 1.6.1 in this project

This folder is a copy of HomenS.AI Style 1.6.1 (https://github.com/HomenSAI/homensai-style).
Two changes were made here at the owner's request; they should be moved into the style core:

1. **E-mail protection.** No plain `user@domain` address in the files: `author.email` removed,
   the e-mail link has `url: "#mail"` and shows `info [at] homensai [dot] com`;
   `brand-ui.js` assembles the `mailto:` link from `contact.email_parts` only on hover, focus,
   touch or click (`HomenS.brandUi.protectMail`). `brand/brand.json` (the source of `js/brand.js`)
   is not copied because it contains the plain address.
2. **No location.** `author.location` removed and `contact.facts` is empty, so the contact block
   does not show the city.
