# Privacy policy for Basic Auth Gateway

Last updated: November 22, 2026

Basic Auth Gateway is a browser extension with a small helper program that runs on your computer. It signs you in to the websites you choose that ask for a shared username and password (HTTP Basic Auth), so the browser's sign-in box doesn't appear.

In short, your data stays on your computer. Neither the extension nor the helper program collects anything, sends anything to the developer or shares anything with anyone. Your login leaves your computer only when one of the sites you chose asks for it, and then it goes only to that site.

## What is stored, and where

Your profiles are kept in the extension's local storage in your browser. A profile holds a name, an ID, a username and the sites it covers. Profiles aren't synced to your browser account or to other devices.

Your passwords are kept by the helper program in your operating system's password store: the Keychain on macOS, or Credential Manager on Windows. Each one is filed under its profile's ID. The extension never saves a password. When a covered site asks you to sign in, the extension asks the helper program for that profile's password, gives it to the browser to answer that site, and keeps no copy.

If a site turns a password down, the extension remembers which site it was and when, so the options page and the toolbar icon can tell you. This record sits in the same local storage as your profiles.

While a page is loading, the extension notes which sites it has already answered for that page, so it never answers the same site twice in one load. These notes are kept in the browser's session storage, which the browser clears when it closes.

## When anything leaves your computer

When a site in one of your profiles asks you to sign in, the browser sends that profile's username and password to that site over a secure (https) connection. The extension answers only sites you've added, and only when you open the page yourself or follow a link to it, not when another site tries to load it in the background. Once a site has accepted the login, the browser may remember it and send it to that site again until you quit the browser. That is how browsers handle this kind of sign-in.

When you choose Export or Export all, the extension saves a preset file to your computer with the profiles' names, IDs, usernames and sites. The file never includes a password. What happens to it afterwards is up to you.

Nothing else leaves your computer. The extension and the helper program use no analytics, tracking or crash reporting, load no code from the internet, and don't contact any server run by the developer.

## Permissions the extension asks for

- Web request access, to notice when a site asks you to sign in and to answer it.
- Native messaging, to talk to the helper program on your computer.
- Storage, to keep your profiles and the records described above.
- Access to each site in your profiles. The browser asks you to approve these, and the extension can't see or answer requests to sites you haven't approved.

## Who can see your data

The developer never receives any of your data. It isn't sold, shared or used for anything except signing you in to the sites you chose.

Basic Auth Gateway's use of this information follows the Chrome Web Store User Data Policy, including its Limited Use requirements.

## Removing your data

Removing the extension from your browser deletes its profiles and records.

To delete the stored passwords, run `basic-auth-gateway uninstall --purge`, which also removes the helper program. You can also delete them yourself: in Keychain Access on macOS they're the items named `basic-auth-gateway`, and in Credential Manager on Windows they're the generic credentials whose names start with `basic-auth-gateway:`.

## Changes to this policy

If this policy changes, this page will be updated and the date at the top will change.

## Contact

Basic Auth Gateway is made by Luna Parker. For questions about this policy, email luna@lunaparker.dev.
