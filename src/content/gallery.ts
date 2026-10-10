// Albums mirror expressionconcert.com/gallery.
// With GOOGLE_DRIVE_API_KEY set, each album with a driveFolderId shows every photo in that Drive folder
// (see src/lib/drive.ts). Without it, or if Drive fails, the local selection in `photos` is shown.

export type Album = {
  id: string;
  title: string;
  /** Google Drive folder ID: the part after /folders/ in the folder's share link */
  driveFolderId?: string;
  photos: string[];
};

const range = (folder: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/images/gallery/${folder}/${String(i + 1).padStart(2, "0")}.jpg`);

export const albums: Album[] = [
  { id: "healing-through-harmony-2-0", title: "Healing Through Harmony 2.0", driveFolderId: "1xQtfWN3-XljX5fv5ZFRLTYHiW92RdM_7", photos: range("healing-through-harmony-2-0", 12) },
  { id: "healing-through-harmony", title: "Healing Through Harmony", driveFolderId: "11tp8yqkhJgunwA-Xixwy2kuOCjZ_E8NE", photos: range("healing-through-harmony", 12) },
  { id: "drum-festival", title: "Drum Festival", driveFolderId: "10X_QDsAns6hGJUoQ68j1WjFIzr4stxh5", photos: range("drum-festival", 12) },
  { id: "christmas-concert", title: "Christmas Concert", driveFolderId: "1KJtmY0wE6k__rJlSlWStGwOrUosKzGSS", photos: range("christmas-concert", 12) },
  { id: "music-therapy-sessions-1", title: "Music Therapy Sessions 1", driveFolderId: "1WQA8sAzMPMwzb4sBvE_iv59kWDkzESQn", photos: range("music-therapy-sessions-1", 9) },
  { id: "music-therapy-sessions-2", title: "Music Therapy Sessions 2", driveFolderId: "1pByFvIuZZLS7ZN1vCeFS8iT91QWEuHFb", photos: range("music-therapy-sessions-2", 6) },
  { id: "expression-2-0", title: "Expression 2.0", driveFolderId: "1UA0Sc1P5PIc_HiHAJoiT0P47iIq9nSMp", photos: range("expression-2-0", 12) },
  {
    // The old site pointed this album at the Expression 2.0 folder by mistake, so it uses local photos.
    // Add the real Pilot folder ID here once it exists in Drive.
    id: "pilot",
    title: "Pilot",
    photos: [
      "/images/site/musician.jpg",
      "/images/site/singers.jpg",
      "/images/site/pianist.jpg",
      "/images/site/saxophonist.jpg",
      "/images/site/music-rendition.jpg",
      "/images/site/mp-clapping.jpg",
      "/images/site/mp-at-concert.jpg",
      "/images/site/crowd.jpg",
      "/images/site/audience-at-concert.jpg",
      "/images/site/audience-foundation.jpg",
    ],
  },
];

export const galleryPage = {
  hero: {
    eyebrow: "Gallery",
    title: "Moments that",
    titleAccent: "moved us.",
    description: "Concerts, festivals, therapy sessions and community gatherings, captured.",
    image: "/images/gallery/christmas-concert/12.jpg",
  },
};
