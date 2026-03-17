# Strapi Content Types for TetraMatrix

## How to Use These Schemas

Copy each folder to your Strapi project's `src/api/` directory:

```bash
# Example structure in your Strapi project:
src/api/
├── service/
│   └── content-types/
│       └── service/
│           └── schema.json
├── team-member/
│   └── content-types/
│       └── team-member/
│           └── schema.json
├── stat/
│   └── content-types/
│       └── stat/
│           └── schema.json
├── milestone/
│   └── content-types/
│       └── milestone/
│           └── schema.json
├── homepage/
│   └── content-types/
│       └── homepage/
│           └── schema.json
└── company-info/
    └── content-types/
        └── company-info/
            └── schema.json
```

## Alternative: Create via Admin Panel

1. Go to https://strapi.tetramatrix.com.cy/admin
2. Navigate to Content-Type Builder
3. Create each type manually using the schema definitions

## Content Types Summary

### Collection Types (multiple entries):
- **Service** - IT services with title, description, icon, features
- **Team Member** - Staff profiles with photo, bio, role
- **Stat** - Statistics (e.g., "500+ Projects")
- **Milestone** - Company history timeline

### Single Types (one entry):
- **Homepage** - Hero section content
- **Company Info** - Contact details, mission, vision

## After Creating Content Types

1. Add content entries in Strapi admin
2. Set permissions: Settings → Roles → Public → Enable find/findOne for each type
3. The frontend will automatically fetch from Strapi API
