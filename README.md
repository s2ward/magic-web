# Magic Web Explorer

This is to explore what the Warlocks call the Magic Web, and Thaians call [Ley Lines](https://tibia.fandom.com/wiki/Ley_Line) 

> Player: ley  
Milos: Most Tibian cultures have some knowledge about those straight lines that run across the landscape, connecting both, natural and sacred sites. Some also call them 'fairy paths' or 'spirit lines'. ...  
Milos: As far as I know, in Zao they are called 'dragon lines'. Markers connecting the ley lines can be mounds, cairns, standing stones, stone circles, ponds, wells, shrines, temples or cross-roads.

Essentialy, we can find connections between sites - and that can be fun and interesting.  

see e.g. Alawar, warlock on Senja article on reddit: [weird mystery](https://www.reddit.com/r/SolvingTibia/comments/146rj1t/the_weirdest_mystery_of_the_magic_web/)  

## About

This is an online Tibia map viewer (in [slippy map](https://wiki.openstreetmap.org/wiki/Slippy_Map) style) that uses the data from the [tibia-map-data](https://github.com/tibiamaps/tibia-map-data) project.  

Fork of Mathias Bynens tibia-map (tibiamaps.io) project, which in turn is based on the old TibiaMaps map viewer which was written by @Cavitt aka Syntax.  

Cyclopedia map has been gathered using @elkolorado's [Tibia Satellite-Cyclopedia-Map-Export](https://github.com/elkolorado/Tibia-Satellite-Cyclopedia-Map-Export) project, which extracts the map from the Tibia client.  

I've then converted the map into a format that can be used by tibia-map, a.k.a. tibiamaps.io.

See the process here: [./cyclopedia/README.md](./cyclopedia/README.md). 

### Some stuff

There are many bits to clean up that are not relevant to this tailored fork.  
I've left them in for now, as I might need them later.  

I tried adding more buttons [here](https://github.com/tibiamaps/tibia-map/blob/5c04720091325716c06a5d7b2868e8b3573423c4/src/_js/map.js#L388) along with a crosshair toggle - but it's not working as expected, so instead a universal toggle was made with the `C` button on web gui.  

Click `P` to change to the regular minimap.  

## Usage

Used to explore the Magic Web, with crosshair as a cross(4), compass(8), clock(12) and for completion, 16 diagonal lines from center of anchor.

- `C` Changes have been made to the cross-hair, you can cycle between the original horizontal and vertical + crosshair (4 lines) into compass (8), clock (12), and (16) lines from center of anchor.
- `P` Changes the 7th floor to the regular minimap.  

## Local setup

1. Clone this repository and `cd` to its root directory.
1. Install and use the [expected](https://github.com/tibiamaps/tibia-map/blob/main/.nvmrc) Node.js version: `nvm use`
1. Run `npm install` to install the dependencies.
1. After making changes, run `gulp` to build a new version of the `src` files into the `dist` directory.

(you might need to move the mapper file into dist/)
