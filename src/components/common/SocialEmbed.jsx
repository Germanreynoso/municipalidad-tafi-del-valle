import InstagramEmbed from './InstagramEmbed.jsx';
import FacebookEmbed from './FacebookEmbed.jsx';
import { plataformaDe } from '../../features/reels/socialUrl.js';

// Elige el embed según la plataforma del link (Instagram o Facebook).
export default function SocialEmbed({ url }) {
  if (plataformaDe(url) === 'facebook') return <FacebookEmbed url={url} />;
  return <InstagramEmbed url={url} />;
}
