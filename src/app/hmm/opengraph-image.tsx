import { extractJpegProminentColors } from '@/ogImgProminentColors';
import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export const alt = 'About Acme';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const bananaArrayBuffer = await fetch(
    'https://upload.wikimedia.org/wikipedia/en/e/e4/Velvet_underground_album_cover_2.png',
  ).then((resp) => resp.arrayBuffer());
  const bananaProminentColors = await extractJpegProminentColors(
    new Uint8Array(bananaArrayBuffer),
  );

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(45deg, ${bananaProminentColors[0].rgb}, ${bananaProminentColors[1].rgb})`,
        }}
      >
        hmm
      </div>
    ),
    {
      ...size,
    },
  );
}
