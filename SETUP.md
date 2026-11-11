# Kharcha — setup (about 15 minutes, one time)

You'll do three things: create a free Firebase project (where your data lives), paste its settings into the app, and put the app online so it opens on your iPhone, iPad and Mac.

---

## Step 1 — Create the Firebase project (your database)

1. Go to **console.firebase.google.com** and sign in with your Google account.
2. Click **Create a project** → name it `kharcha` → you can turn Google Analytics **off** → **Create**.
3. **Turn on sign-in:** left menu → **Build → Authentication** → **Get started** → **Email/Password** → switch **Enable** on → **Save**.
4. **Create the database:** left menu → **Build → Firestore Database** → **Create database** → location **asia-south1 (Mumbai)** → choose **Start in production mode** → **Create**.
5. **Lock it to you:** still in Firestore, open the **Rules** tab, delete everything there, paste the contents of `firestore.rules` from this folder, and click **Publish**.
6. **Get the app settings:** click the ⚙️ gear (top left) → **Project settings** → scroll to **Your apps** → click the **</>** (Web) icon → nickname `kharcha` → **Register app**. You'll see a block like:

   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "kharcha-xxxx.firebaseapp.com",
     ...
   };
   ```
   Copy just the part from `{` to `}`.

## Step 2 — Paste the settings into the app

Already done — your Firebase settings (project kharcha-17928) are inside `index.html`.

## Step 3 — Put it online with Vercel

**Option A — Vercel CLI (5 minutes, uses Terminal on your Mac)**
1. Install Node.js if you don't have it: **nodejs.org** → download the LTS version → install.
2. Open **Terminal** and run:
   ```bash
   npm install -g vercel
   cd ~/Downloads/kharcha        # wherever you unzipped the folder
   vercel login                  # sign in with GitHub, Google or email
   vercel --prod
   ```
   Press Enter to accept the defaults when asked (set up and deploy: Y, project name: kharcha, directory: ./ , no build settings to change).
3. You'll get a link like `https://kharcha-xxxx.vercel.app`. In the Vercel dashboard → your project → **Settings → Domains** you can change it to something like `kharcha-vishrut.vercel.app`.

To update the app later: edit the files and run `vercel --prod` again from the folder.

**Option B — through GitHub (no Terminal)**
1. Create a free **github.com** account → **New repository** → name it `kharcha` → set it to **Private** → **Create**.
2. Click **uploading an existing file** → drag in everything inside the `kharcha` folder → **Commit changes**.
3. Go to **vercel.com** → sign up with GitHub → **Add New → Project** → import `kharcha` → **Deploy**.

Future updates: upload changed files to the GitHub repo and Vercel redeploys on its own.

**Then, either way:** Firebase → Authentication → **Settings → Authorized domains** → **Add domain** → paste your Vercel address (without `https://`).

## Step 4 — Install on your devices

- **iPhone / iPad:** open the link in **Safari** → Share button → **Add to Home Screen** → Add.
- **Mac:** open the link in **Safari** → menu **File → Add to Dock**.

Open it, tap **Create account (first time)** with your email and a password. On your other devices, use **Sign in** with the same details — everything syncs.

---

### Good to know
- **Offline:** entries you make without signal are saved on the device and sync when you're back online.
- **Backups:** Settings → *Download CSV* (expenses) and *Assets CSV* any time.
- **Free limits:** Firebase's free plan allows 20,000 writes and 50,000 reads a day — far more than one person will use.
- **Forgot password:** use *Forgot password?* on the sign-in screen.
