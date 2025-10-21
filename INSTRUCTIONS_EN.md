# Text RPG Maker - User Guide (English)

## Overview
Text RPG Maker is a web application that allows you to create Pokemon-style text RPGs featuring "Monmus" (Monster Girls) without any coding knowledge.

## Key Features
- 🎮 **Intuitive Web Interface**: Create games without coding
- 🌏 **Multilingual Support**: Korean (default), English, Japanese
- 📦 **JSON Import/Export**: Save and share games as a single file
- 🤖 **AI Assistant**: Content generation via Gemini API
- 🔌 **Plugin System**: Extensible functionality

## Installation

### 1. Local Development Environment

#### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
python app.py
```

Backend server runs at http://localhost:8000

#### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend runs at http://localhost:3000

### 2. Using Docker
```bash
# Build Docker image
docker build -t textrpg-maker .

# Run container
docker run -p 8000:8000 textrpg-maker
```

## Usage

### 1. Set Game Information
- Select "Game Info" in the Maker tab
- Enter game title, description, and author information
- Available in Korean, English, and Japanese

### 2. Define Attribute Types
- Add attributes (e.g., Fire, Water, Grass) in the "Attributes" tab
- Set type matchups to balance combat
  - 1.0 = Normal effectiveness
  - 2.0 = Super effective
  - 0.5 = Not very effective

### 3. Create Skills
- Create techniques for Monmus in the "Skills" tab
- Set power, accuracy, and PP (usage count)
- Assign attribute type

### 4. Add Items
- Add in-game items in the "Items" tab
- Select category (Potion, Ball, Battle, Key Item)
- Specify usage context (Battle, Field, Both)

### 5. Create Monmus
- Create characters in the "Monmus" tab
- Set base stats (HP, Attack, Defense, Sp. Attack, Sp. Defense, Speed)
- Select 1-2 attribute types
- Enter detailed info like Pokedex number, height, weight

### 6. Export & Play
- Click "Export" to save as JSON file
- Load the JSON file in the Player tab to play the game

## Using AI Assistant (Optional)

### Setting up Gemini API Key
1. Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "AI Assistant" button in Maker
3. Enter API key and write your prompt
4. Click "Generate" to have AI create content

### Supported Models
- gemini-2.0
- gemini-2.5

**Note**: gemini-1.5 has been discontinued.

## Plugin Development

### Plugin Structure
```
plugins/
  my_plugin/
    manifest.json
    plugin.py
```

### manifest.json Example
```json
{
  "name": "my_plugin",
  "version": "1.0.0",
  "description": {
    "ko": "내 플러그인",
    "en": "My Plugin",
    "ja": "マイプラグイン"
  },
  "author": "Author Name",
  "hooks": [
    "on_monmus_create",
    "on_skill_use"
  ],
  "main": "plugin.py"
}
```

### plugin.py Example
```python
def on_monmus_create(monmus_data):
    """Called when Monmus is created"""
    # Add custom logic
    return monmus_data

def on_skill_use(skill_data, user, target):
    """Called when skill is used"""
    # Add custom logic
    return skill_data
```

## Deployment

### GitHub Pages (Static Hosting)
1. Build frontend: `npm run build`
2. Deploy `dist` folder to GitHub Pages
3. GitHub Actions workflow handles automatic deployment

### Vercel/Netlify (Dynamic Hosting)
1. Push project to GitHub
2. Connect project in Vercel or Netlify
3. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`

## Troubleshooting

### Backend API Connection Failed
- Verify backend server is running
- Check CORS settings

### JSON Import Error
- Verify JSON file format is correct
- Ensure all required fields are included

### Gemini API Error
- Verify API key is valid
- Ensure using supported models (gemini-2.0, gemini-2.5)

## Contributing
Issue reports, pull requests, and feedback are welcome!

## License
MIT License

## Support
For questions, please contact via GitHub Issues.
