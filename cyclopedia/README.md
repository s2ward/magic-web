# Cyclopedia map into a tibiamaps.io compatible format

From [Tibia Satellite-Cyclopedia-Map-Export](https://github.com/elkolorado/Tibia-Satellite-Cyclopedia-Map-Export)

We'll continue from the already established process ^ by @elkolorado to create a map_merged.png.  

- We then use `leaflet-gen-merged-tibiamaps.py` and `gen-tiles-json.py` to convert the Cyclopedia map into a format that can be used by @mathiasbynens [tibia-map](https://github.com/tibiamaps/tibia-map) project, a.k.a. tibiamaps.io

256x256px tiles are used by tibia-map, so we'll need to split the map_merged.png into 256x256px tiles. leaflet-gen-mmerged-tibiamaps.py creates these. 

Then add the new tiles into tiles.json, which i've used gen-tiles-json.py to generate.

(if you run this locally, you might want to fix the gulpfile.js to copy the mapper folder into dist/, i just did it manually)    
`gulp && cp -r ../mapper ../dist/`  

maxBounds needs to be recalculated to allow panning https://github.com/tibiamaps/tibia-map/blob/5c04720091325716c06a5d7b2868e8b3573423c4/src/_js/map.js#L295, i've just commented it out.  

This process can be automated, but i've done it manually for now.  
I've specified to only do floor 7, as I only need that floor, and can cycle to the normal map with the 'P' key.  
