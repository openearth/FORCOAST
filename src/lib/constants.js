export const MAP_BASELAYERS = [
	"mapbox://styles/forcoast/ckv2hfj623qkb14l9akxfvyzu",
	"mapbox://styles/forcoast/cl61vdkzr000i14qzccif2k04",
].map(layer => ({
	style: `${ layer }`,
	title: layer,
	thumbnail: `/thumbnails/${ layer }.png`
}))

export const MAP_BASELAYER_DEFAULT = MAP_BASELAYERS[0]
