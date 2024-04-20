import os
import json

# Define the directory containing the files
directory = 'minimap'

# Load existing tiles from tiles.json
try:
    with open('minimap/tiles.json', 'r') as file:
        known_tiles = json.load(file)
except FileNotFoundError:
    known_tiles = []
except json.JSONDecodeError:
    known_tiles = []

# Convert list to a set for efficient checking
known_tiles_set = set(known_tiles)

# List to store new tiles that need to be added
new_tiles = []

# Loop through all files in the directory
for filename in os.listdir(directory):
    if filename.endswith(".png") and 'Color' in filename:
        # Extract tile information from filename
        # Filename format: Minimap_Color_32000_32512_06.png
        parts = filename.replace('Minimap_Color_', '').split('_')
        if len(parts) == 3:
            x = parts[0]
            y = parts[1]
            z = parts[2].split('.')[0]  # Remove the '.png' part
            z = str(int(z))  # Normalize floor number to match JSON format

            # Construct the tile identifier
            tile_id = f"{x}_{y}_{z}"

            # Check if this tile is already known
            if tile_id not in known_tiles_set:
                new_tiles.append(tile_id)
                known_tiles_set.add(tile_id)  # Add to set to avoid duplicates in future checks

# Update the known_tiles list with new tiles if any
if new_tiles:
    known_tiles.extend(new_tiles)
    # Save the updated list back to tiles.json
    with open('minimap/tiles.json', 'w') as file:
        json.dump(known_tiles, file, indent=4)

    print(f"Added {len(new_tiles)} new tiles to tiles.json")
else:
    print("No new tiles to add.")
