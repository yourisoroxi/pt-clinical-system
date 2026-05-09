# PT Clinical Operating System - Phase 1C Full Restore

This package restores the original one-file version into a modular architecture while preserving:

- Full region data
- orthoData logic
- patternAliases
- clinicalSupport for all regions
- clinicalDetails how-to panels
- HEP exercise details
- hepByName
- Copy HEP
- Email HEP
- Smart recommendation
- Preset system
- Custom library
- Audit-safe comment builder

Copy the folders into your project root and overwrite existing files:

app/
components/
data/
lib/
types/
utils/

Then run:

npm run build
git add .
git commit -m "Phase 1C full restore"
git push
