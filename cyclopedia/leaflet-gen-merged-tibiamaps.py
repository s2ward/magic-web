from PIL import Image
import os
import json

# Load bounds data
with open('tibiamaps-bounds.json') as bounds_file:
    bounds = json.load(bounds_file)

x_min = bounds['xMin']
y_min = bounds['yMin']

# Open the image
image = Image.open('map_merged.png')

# Define the tile size
tile_size = 256

# Get the width and height of the image
width, height = image.size

# Calculate the number of tiles in x and y directions
num_tiles_x = width // tile_size
num_tiles_y = height // tile_size

# Create the "Minimap" directory if it doesn't exist
output_directory = "tibia-map-data/minimap"
if not os.path.exists(output_directory):
    os.makedirs(output_directory)

for x in range(num_tiles_x):
    for y in range(num_tiles_y):
        # Calculate the coordinates of the current tile
        left = x * tile_size
        upper = y * tile_size
        right = left + tile_size
        lower = upper + tile_size

        # Crop the image to the current tile
        tile = image.crop((left, upper, right, lower))

        # Calculate tile's base coordinates
        base_x = x_min + x * 256
        base_y = y_min + y * 256

        # Generate filename fixing the floor as '7'
        floor_id = '7'  # Set the floor ID to '7'
        tile_filename = f'{output_directory}/Minimap_Color_{base_x}_{base_y}_{floor_id}.png'
        tile.save(tile_filename)

print("Tiles generated and saved successfully for floor 7.")
