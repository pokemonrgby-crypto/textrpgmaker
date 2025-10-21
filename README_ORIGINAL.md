Task: Create a Web-Based RPG Maker and Player Tool for Non-Coders, Pokemon-Inspired with Monster Girls (Monmus), Deployable on GitHub, with Korean as Default Language

Objective:
Develop a modern web application for a text-based RPG maker that allows non-coders to build Pokemon-like games featuring "Monmus" (monster girls). Replace capture with "contracts." The maker outputs/imports a single JSON file. Separately, integrate a player tool that loads and runs the JSON for gameplay. Focus on high autonomy, clean UI, strong plugin extensibility, and robust logic simulation for implementation. Default language is Korean (UI texts, code comments in Korean). Support other languages via multilingual fields. Design for easy GitHub deployment (e.g., GitHub Pages for static, Vercel/Netlify for dynamic).

Key Requirements:
1. **Modern Web Design and UI (Korean Default)**:
   - Full web app: React frontend, FastAPI backend (Python for simplicity).
   - UI: Minimalist, responsive with Tailwind CSS. Step-by-step Korean forms, drag-and-drop node editors (React Flow). All labels/buttons default to Korean; user-switchable to English/Japanese/others.
   - Deployment: Static on GitHub Pages; dynamic on Vercel. Include GitHub Actions for auto-deploy.
   - User Flow: No login required initially; inputs via forms, preview in-browser, import/export JSON.

2. **Core Mechanics (Pokemon-Inspired, Restricted but Autonomous)**:
   - Base on Pokemon: Party of Monmus, turn-based battles, exploration, items.
   - Contract mechanics: After battle, option to contract Monmus.
   - All assets get unique IDs (auto-increment from 0 or 1).
   - High autonomy: Free-form inputs; minimal validation but with Korean error messages.

3. **Customizable Elements (User-Defined via Web Forms)**:
   - **Attributes and Type Chart**: Korean grid editor for attributes and matchups.
   - **Effects**: Editors for effects (triggers, modifiers) in skills/status/items.
   - **Skills/Abilities**: Fields for attribute, power, accuracy, effects, timing.
   - **Items**: Usage context, category, effects, name/description (multilingual).
   - **Monmus**: Forms for Pokedex entry, stats, height/weight, exp yield (multilingual).
   - **Map**: Node-based graph editor; field areas with encounters/drops.
   - **Events**: Dialogues, battles; branching nodes.
   - **Multilingual Support**: Fields for Korean (default), English, Japanese, and expandable to others (e.g., add Chinese via plugins).

4. **JSON Import/Export**:
   - Export: Compile inputs to single JSON (download button).
   - Import: Upload JSON file to load/edit existing games (e.g., from others).
   - JSON Schema: Validated with ID references for efficiency. Support YAML import as alternative.
   - Sharing: Generate shareable links for JSON (e.g., via blob URL or backend storage).

5. **Player Tool (Integrated Web Page)**:
   - Load JSON via upload/import, run game in-browser (text simulation with JS/WebSockets).
   - Handles party (up to 6), battles, exploration, events. UI in Korean default.

6. **Gemini API Assist Feature**:
   - Optional: Form for user API key to enable AI assists (e.g., generate Korean descriptions).
   - Implementation: Backend uses google.generativeai.
   - Explicit Instructions: 
     - API Call: genai.configure(api_key=user_key); model = genai.GenerativeModel('gemini-2.5' or 'gemini-2.0').
     - Model Selection: Only 2.5 and 2.0; state 1.5 discontinued.
     - Usage: Buttons for prompts like "Monmus 설명 생성" in Korean.

7. **Plugin Support with High Extensibility**:
   - Modular: JS frontend plugins (ES modules); Python backend plugins (importlib).
   - Extensibility: Plugins add features (e.g., new editors). Manifest.json for hooks.
   - Loader: Scan /plugins dir, register dynamically. Korean comments in plugin examples.
   - Examples: Plugin for extra languages, custom Monmus generator.

8. **Additional Features (40+ Ideas for Enhanced Functionality)**:
   - 각 기능 구현 시, 사용자 시나리오(예: 정상 입력, 빈 값, 에러 케이스)를 텍스트적으로 시뮬레이션하여 모든 가능한 가짓수를 고려 후, 예외가 없도록 구현. 코드에 한국어 주석으로 시뮬레이션 로직 설명.
   - 1. Leveling System: EXP gain, level ups, stat growth curves (e.g., formulas editable).
   - 2. Evolution System: Conditions for Monmus evolution (level, item, etc.).
   - 3. Storyline Builder: Branching narrative editor with Korean dialogues.
   - 4. NPC Characters: Define NPCs with behaviors, quests.
   - 5. Quest System: Main/side quests with rewards, trackers.
   - 6. Inventory Management: Limits, sorting, categories.
   - 7. Shop System: Buy/sell items with currency.
   - 8. Random Events: Probability-based triggers (e.g., encounters).
   - 9. Sound Effects: Web audio integration for effects (upload MP3).
   - 10. Theme/Skin Customization: UI themes for maker/player.
   - 11. Multiplayer Elements: Simple online battles (WebSockets).
   - 12. Save/Load Game State: In-player persistent saves (localStorage).
   - 13. Tutorial Mode: Guided tours in Korean.
   - 14. Debug Tools: Console for testing battles/events.
   - 15. Sharing Features: Export links, gallery for user games.
   - 16. Template Library: Pre-built Monmus/maps for starters.
   - 17. AI-Generated Content: Beyond Gemini, auto-balance suggestions.
   - 18. Battle Animations: Text/emoji sequences or simple CSS.
   - 19. Weather System: Affects attributes in battles.
   - 20. Terrain Effects: Map-based modifiers.
   - 21. Team Building Optimizer: Suggest optimal parties.
   - 22. Balance Checker: Simulate stats for fairness.
   - 23. Custom Scripting: Simple JS-like language for events.
   - 24. Mod Support: Via plugins for community mods.
   - 25. Game Analytics: Track playtime, win rates.
   - 26. Version Control: JSON diffs/versions.
   - 27. Collaboration Editing: Real-time multi-user (Firebase-like).
   - 28. Asset Import: Images for Monmus portraits.
   - 29. Mobile Responsiveness: PWA for offline/mobile.
   - 30. Accessibility Features: ARIA, screen reader support.
   - 31. Localization Tools: Auto-translate via Gemini.
   - 32. Performance Optimization: Lazy loading for large maps.
   - 33. Backup and Restore: Auto-backups of JSON.
   - 34. Community Gallery: Upload/share games publicly.
   - 35. In-App Tutorials/Videos: Embedded Korean guides.
   - 36. Custom Fonts: Upload fonts for UI.
   - 37. Dark/Light Mode: Toggleable themes.
   - 38. Notification System: In-app alerts (e.g., save complete).
   - 39. Achievement System: In-game unlocks.
   - 40. Gym Battles: Structured challenges.
   - 41. Breeding System: Combine Monmus for offspring (stats inheritance).
   - 42. Mega Forms: Temporary power-ups.
   - 43. Hidden Abilities: Rare variants.
   - 44. Move Tutors: Learn new skills via NPCs.
   - 45. Berry Farming: Grow items with time-based mechanics.
   - 46. Pokedex Rewards: Completion bonuses.
   - 47. Secret Bases: Customizable player hubs.
   - 48. Mini-Games: Contests, puzzles.
   - 49. Regional Variants: Location-based Monmus changes.
   - 50. User Authentication: Optional login for saving to cloud (e.g., GitHub auth).  // 빠뜨린 기능 추가: 보안 강화.
   - 51. Error Logging: Track bugs with Korean reports.
   - 52. Undo/Redo in Editor: For form changes.
   - 53. Preview Mode: Test partial game without full export.
   - 54. Export to Other Formats: YAML/CSV for compatibility.
   - 55. Integration with Tools: Export to RPG Maker formats if plugin added.

9. **Technical Implementation**:
   - Stack: Python FastAPI backend, React frontend; libraries as before.
   - Structure: Backend/app.py (한국어 주석), Frontend/src/App.js.
   - ID Assignment: Auto with counters.
   - Logic Simulation: For each feature, code must include comments simulating user flows (e.g., // 시뮬레이션: 사용자 빈 입력 시 에러抛出, 정상 케이스 처리).
   - Exception Handling: Zero exceptions goal; validate all inputs.
   - Deployment: Dockerfile, .github/workflows.

Steps to Implement:
1. Set up monorepo with Korean comments.
2. Build backend APIs, including import/export.
3. Frontend forms with additional features.
4. Integrate simulations in code.
5. Test all 40+ features with scenarios.
6. Deploy sample.

Edge Cases:
- Handle large imports, multilingual mismatches.
- Simulate all: e.g., battle with 0 HP.

Deliverables:
- Full code with Korean defaults.
- Sample JSON (Korean Monmus game).
- Instructions in Korean/English.
