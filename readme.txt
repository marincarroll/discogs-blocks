=== Discogs Blocks ===
Contributors:      Marin Carroll
Tags:              block
Tested up to:      6.8.3
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

WordPress plugin to display a user's collection from Discogs.com

== Description ==
Uses the Discogs.com API to display a user's collection in a block, inspired by core/query and core/post-template.

This is a WIP and is not yet tested or released, but please feel free to download and open an issue if you have a bug report or feature request.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/discogs-blocks` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Enter your Discogs.com personal access token through the 'Settings > Discogs Blocks' screen in WordPress
4. Insert a "Collection" block via the block editor

== Todo ==
[] Track down elusive options page bug
[] Test when invalid page params are provided to endpoints
[] Test endpoints when authentication is removed
[] Test when endpoint has no results
[] Figure out why block editor experience is using a lot of memory
[] Loading message vs no auth provided message vs error block has no data (ideally also display endpoint error message
 in console)
[] Figure out why useEntityRecords loads slowly so there's 'flash'
[] Ensure placeholder image aspect ratio matches selected attribute
[] Imitate core/query to prevent 'flash' when selecting inner blocks in template
[] Block examples
[] Block naming/descriptions
[] Block icons (maybe pick out a color?)
[] PHP linting/sniffing
[] Block custom category
[] Ensure custom entities are registered at correct point
[] Docs

== Changelog ==


