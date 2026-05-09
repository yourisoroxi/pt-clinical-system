# Phase 1B Restore Data Package

This package restores the content that was reduced during Phase 1 refactor.

Restored / expanded:
- Full region structure: Cervical, Lumbar, Shoulder, Hip, Knee, Ankle/Foot, Elbow, Wrist, TMJ
- Expanded intervention library by region
- Expanded clinical patterns and aliases
- Clinical intelligence support by region
- Clinical details: how-to, positive finding, clinical meaning, precautions, documentation tip
- HEP database from prior complete version
- HEP modal support with dosage, instructions, cueing, common errors, regression, progression

How to apply:
1. Unzip this package.
2. Copy app, components, data, lib, types, utils into C:\Users\USER\pt-clinical-system.
3. Replace files when Windows asks.
4. Run: npm run build
5. If successful: git add .
6. git commit -m "Restore expanded clinical data after refactor"
7. git push
