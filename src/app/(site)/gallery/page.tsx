import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { AlbumGallery } from "@/components/sections/AlbumGallery";
import { PageHero } from "@/components/sections/PageHero";
import { albums, galleryPage } from "@/content/gallery";
import { withDrivePhotos } from "@/lib/drive";

export const metadata: Metadata = {
  title: "Gallery",
  description: galleryPage.hero.description,
};

// New photos added to the Drive folders appear within an hour
export const revalidate = 3600;

export default async function GalleryPage() {
  const resolved = await withDrivePhotos(albums);
  return (
    <>
      <PageHero {...galleryPage.hero} />
      <section className="bg-white py-20">
        <Container>
          <AlbumGallery albums={resolved} />
        </Container>
      </section>
    </>
  );
}
