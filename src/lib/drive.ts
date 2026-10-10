import "server-only";
import type { Album } from "@/content/gallery";

type DriveFile = { id: string; name: string };

/**
 * Lists the images in a public Google Drive folder.
 * Requires GOOGLE_DRIVE_API_KEY and the folder shared as "Anyone with the link: Viewer".
 * Returns null on any failure so callers can fall back to local photos.
 */
async function listFolderImages(folderId: string, key: string): Promise<string[] | null> {
  const files: DriveFile[] = [];
  let pageToken: string | undefined;

  try {
    do {
      const params = new URLSearchParams({
        q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: "nextPageToken, files(id, name)",
        orderBy: "name",
        pageSize: "1000",
        key,
      });
      if (pageToken) params.set("pageToken", pageToken);

      const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) {
        console.error(`[drive] folder ${folderId}: ${res.status} ${await res.text()}`);
        return null;
      }
      const data = (await res.json()) as { files: DriveFile[]; nextPageToken?: string };
      files.push(...data.files);
      pageToken = data.nextPageToken;
    } while (pageToken);
  } catch (err) {
    console.error(`[drive] folder ${folderId}:`, err);
    return null;
  }

  // Public Drive images are served from Google's image CDN; w1600 keeps them web-sized
  return files.map((f) => `https://lh3.googleusercontent.com/d/${f.id}=w1600`);
}

/** Swaps in live Drive photos for every album that has a folder and at least one image in it. */
export async function withDrivePhotos(albums: Album[]): Promise<Album[]> {
  const key = process.env.GOOGLE_DRIVE_API_KEY;
  if (!key) return albums;

  return Promise.all(
    albums.map(async (album) => {
      if (!album.driveFolderId) return album;
      const photos = await listFolderImages(album.driveFolderId, key);
      return photos?.length ? { ...album, photos } : album;
    }),
  );
}
