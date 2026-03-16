### **Master Build Prompt for Windsurf**

**Role:** Full-stack Engineer & DevOps Specialist
**Task:** Recreate the frontend for `https://tetramatrix.com.cy/` using **Astro** and **Tailwind CSS**, and automate the deployment to **Dokploy**.

**Phase 1: Project Initialization & UI**

1. Initialize a new **Astro** project in the current directory using the `latest` version and **Tailwind CSS**.
2. Scrape/analyze the structure of `https://tetramatrix.com.cy/` and recreate a professional, clean, IT-technology UI.
3. Focus on:
* A high-end **Hero Section** with scientific aesthetics.
* A **Platform/Services Grid** using clean cards.
* **Data Stat Blocks** (counters or numeric highlights).
* A **Team/Contact Section**.
* create all pages: https://tetramatrix.com.cy (homepage), services: https://tetramatrix.com.cy/services/, about: https://tetramatrix.com.cy/about/, contact: https://tetramatrix.com.cy/contact/
* use the company's logo located in this folder: TetramatrixMainLogo1.webp


4. Use a color palette of Deep Blues (`#003366`), Teals, and high-contrast White space.

**Phase 2: GitHub Integration**

1. Access my GitHub credentials stored in `github.md`.
2. Use the GitHub API to create a new private repository named `tetramatrix-astro-frontend`.
3. Initialize a local git repo, commit the Astro project, and push the code to the `main` branch of the newly created repository.

**Phase 3: Dokploy Deployment via MCP**

1. Use the **Dokploy MCP** connection to:
* Create a new **Project** named "TetraMatrix".
* Create a new **Application** within that project.
* Connect this application to the GitHub repository created in Phase 2.
* Set the **Build Provider** to `Nixpacks` (optimized for Astro).
* Enable **Auto-Deploy** on push to the `main` branch.


2. Configure a temporary domain or provide the Dokploy IP/URL where the site will be live.

**Phase 4: Strapi Handshake**

1. Create a `.env` file for the Astro project.
2. Add a placeholder `STRAPI_URL` and `STRAPI_TOKEN` so I can easily connect the backend later.

---

### **Why this prompt is effective for Windsurf:**

* **Sequential Logic:** It forces the AI to build, then push, then deploy in the correct order.
* **Context Awareness:** By mentioning the `github.md` file, you avoid pasting sensitive tokens directly into the chat history.
* **Nixpacks:** This is the magic behind Dokploy/Vercel-like deployments. It automatically detects Astro, installs dependencies, and builds the static site without you needing to write a complex Dockerfile.

### **Pro-Tip for Windsurf's Cascade:**

If the AI stops after building the UI, just say: **"Proceed with Phase 2 and 3 now."** It will pick up the context and handle the Git/Dokploy API calls.

**Would you like me to generate the `Astro.config.mjs` file specifically optimized for a Dokploy/Docker environment?**