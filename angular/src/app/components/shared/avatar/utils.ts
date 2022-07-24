export const AVATAR_LIST = [
	// If more avatar are added to the ./src/assets folder, than add it here
	"bear",
	"cat",
	"chicken",
	"cow",
	"crab",
	"dog",
	"jellyfish",
	"lamb",
	"owl",
	"pig",
	"pigeon",
	"spider",
	"squid",
	"starfish",
] as const;

export type Avatar = typeof AVATAR_LIST[number];
